#!/usr/bin/env python3
"""Build the Bild-des-Tages archive and immutable daily detail pages."""

from __future__ import annotations

import json
import re
from html import escape
from pathlib import Path
from urllib.parse import quote


ROOT = Path(__file__).resolve().parent
SITE = "https://realfunk.de"
DATA_PATH = ROOT / "bild-des-tages.json"
DETAIL_DIR = ROOT / "bild-des-tages"


def load_entries() -> list[dict[str, str]]:
    entries = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    entries.sort(key=lambda item: item["date"], reverse=True)
    seen: set[str] = set()
    for item in entries:
        required = {"date", "slug", "title", "teaser", "image", "alt", "comment", "punchline", "credit"}
        missing = required.difference(item)
        if missing:
            raise ValueError(f"Bild-des-Tages-Eintrag unvollständig: {sorted(missing)}")
        key = f'{item["date"]}-{item["slug"]}'
        if key in seen:
            raise ValueError(f"Doppelter Bild-des-Tages-Eintrag: {key}")
        seen.add(key)
        if not (ROOT / "images" / item["image"]).is_file():
            raise FileNotFoundError(f'Bild fehlt: images/{item["image"]}')
    if not entries:
        raise ValueError("Mindestens ein Bild des Tages ist erforderlich.")
    return entries


def filename(item: dict[str, str]) -> str:
    return f'{item["date"]}-{item["slug"]}.html'


def date_de(value: str) -> str:
    year, month, day = value.split("-")
    return f"{day}.{month}.{year}"


def header(prefix: str = "") -> str:
    return f'''<header class="rf-header"><a class="rf-logo" href="{prefix}index.html" aria-label="RealFunk Startseite">Real<span aria-hidden="true">◉</span>Funk</a><nav class="rf-nav" aria-label="Hauptnavigation"><a href="{prefix}index.html#top">TOP THEMEN</a><a href="{prefix}index.html#mehr">MEHR</a><a href="{prefix}index.html#meldungen">MELDUNGEN</a><a href="{prefix}archiv.html">ARCHIV</a><a class="rf-support" href="{prefix}unterstuetzen.html">UNTERSTÜTZEN</a></nav></header>'''


def footer(prefix: str = "") -> str:
    return f'''<footer class="rf-footer"><div><a class="rf-logo" href="{prefix}index.html">Real<span>◉</span>Funk</a><p>Politische Satire, fast so witzig wie Politiker. Aber gratis.</p></div><nav aria-label="Weitere Informationen"><a href="{prefix}ueber-realfunk.html">Über RealFunk</a><a href="{prefix}impressum.html">Impressum</a><a href="{prefix}datenschutz.html">Datenschutz</a><a href="{prefix}feed.xml">RSS</a></nav></footer>'''


def share_block(title: str, url: str) -> str:
    message = quote(f"{title} — Bild des Tages {url}", safe="")
    encoded_title = quote(f"{title} — Bild des Tages", safe="")
    encoded_url = quote(url, safe="")
    return f'''<div class="rf-share" aria-label="Seite teilen"><strong>Teilen</strong><button type="button" data-native-share hidden>Teilen …</button><a href="https://api.whatsapp.com/send?text={message}" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="https://twitter.com/intent/tweet?text={encoded_title}&amp;url={encoded_url}" target="_blank" rel="noopener noreferrer">X</a><a href="https://www.facebook.com/sharer/sharer.php?u={encoded_url}" target="_blank" rel="noopener noreferrer">Facebook</a><a href="mailto:?subject={encoded_title}&amp;body={encoded_url}">E-Mail</a><button type="button" data-copy-share>Link kopieren</button><span role="status" data-share-status></span></div>'''


def nav_item(item: dict[str, str] | None, direction: str, prefix: str = "") -> str:
    if item is None:
        label = "Jünger" if direction == "newer" else "Älter"
        return f'<span class="daily-nav-card is-disabled" aria-disabled="true"><small>{escape(label)}</small><strong>Ende der Reihe</strong></span>'
    if direction == "older":
        label = "← Älter"
    else:
        label = "Jünger →"
    return f'''<a class="daily-nav-card daily-nav-{direction}" href="{prefix}{escape(filename(item), quote=True)}"><small>{label} · {date_de(item["date"])}</small><strong>{escape(item["title"])}</strong></a>'''


def detail_page(item: dict[str, str], older: dict[str, str] | None, newer: dict[str, str] | None) -> str:
    page_url = f'{SITE}/bild-des-tages/{filename(item)}'
    share_url = page_url
    if item.get("share_version"):
        share_url = f'{page_url}?v={quote(item["share_version"], safe="")}'
    og_image = f'{SITE}/images/{item["image"]}'
    rel_links = ""
    if older:
        rel_links += f'<link rel="prev" href="{SITE}/bild-des-tages/{filename(older)}">'
    if newer:
        rel_links += f'<link rel="next" href="{SITE}/bild-des-tages/{filename(newer)}">'
    return f'''<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(item["title"])} — Bild des Tages — RealFunk</title><link rel="stylesheet" href="../magazin.css"><link rel="stylesheet" href="../bild-des-tages.css?v=20260909"><link rel="stylesheet" href="../realfunk-shell.css?v=20260908"><link rel="canonical" href="{page_url}">{rel_links}<meta name="description" content="{escape(item["teaser"], quote=True)}"><meta property="og:type" content="article"><meta property="og:title" content="{escape(item["title"], quote=True)} — Bild des Tages"><meta property="og:description" content="{escape(item["teaser"], quote=True)}"><meta property="og:url" content="{share_url}"><meta property="og:image" content="{og_image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{escape(item["title"], quote=True)} — Bild des Tages"><meta name="twitter:description" content="{escape(item["teaser"], quote=True)}"><meta name="twitter:image" content="{og_image}"><link rel="stylesheet" href="../realfunk-share.css?v=1"></head><body class="subpage">{header("../")}<main class="daily-picture daily-detail"><div class="daily-heading"><a href="../bild-des-tages.html">← Alle Bilder des Tages</a><span class="eyebrow">BILD DES TAGES · {date_de(item["date"])}</span><h1>{escape(item["title"])}</h1>{share_block(item["title"], share_url)}</div><figure><div class="daily-image-frame"><img src="../images/{escape(item["image"], quote=True)}" alt="{escape(item["alt"], quote=True)}"></div><figcaption><span class="eyebrow">DER REALFUNK-KOMMENTAR</span><p>{escape(item["comment"])}</p><p class="daily-punchline">{escape(item["punchline"])}</p><small>{escape(item["credit"])}</small></figcaption></figure><nav class="daily-sequence" aria-label="Zwischen den Bildern des Tages wechseln">{nav_item(older, "older") }<a class="daily-nav-all" href="../bild-des-tages.html">Alle Bilder</a>{nav_item(newer, "newer")}</nav></main>{footer("../")}<script defer src="../realfunk-share.js?v=2"></script></body></html>'''


def archive_page(entries: list[dict[str, str]]) -> str:
    latest = entries[0]
    cards = "".join(
        f'''<article class="daily-gallery-card"><a href="bild-des-tages/{escape(filename(item), quote=True)}"><div class="daily-gallery-image"><img src="images/{escape(item["image"], quote=True)}" alt="{escape(item["alt"], quote=True)}" loading="lazy"></div><div class="daily-gallery-copy"><time datetime="{item["date"]}">{date_de(item["date"])}</time><h2>{escape(item["title"])}</h2><p>{escape(item["teaser"])}</p><span>Ansehen →</span></div></a></article>'''
        for item in entries
    )
    latest_url = f'bild-des-tages/{filename(latest)}'
    return f'''<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Bild des Tages — RealFunk</title><link rel="stylesheet" href="magazin.css"><link rel="stylesheet" href="bild-des-tages.css?v=20260909"><link rel="stylesheet" href="realfunk-shell.css?v=20260908"><link rel="canonical" href="{SITE}/bild-des-tages.html"><meta name="description" content="Politische Cartoons, Fundstücke und Satirebilder aus dem RealFunk-Archiv."><meta property="og:type" content="website"><meta property="og:title" content="Bild des Tages — RealFunk"><meta property="og:description" content="Politische Cartoons, Fundstücke und Satirebilder aus dem RealFunk-Archiv."><meta property="og:url" content="{SITE}/bild-des-tages.html"><meta property="og:image" content="{SITE}/images/{escape(latest["image"], quote=True)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Bild des Tages — RealFunk"><meta name="twitter:description" content="Politische Cartoons, Fundstücke und Satirebilder aus dem RealFunk-Archiv."><meta name="twitter:image" content="{SITE}/images/{escape(latest["image"], quote=True)}"></head><body class="subpage">{header()}<main class="daily-archive"><div class="daily-archive-heading"><a href="index.html#mehr">← Mehr RealFunk</a><span class="eyebrow">REALFUNK-BILDERARCHIV</span><h1>Bild des Tages</h1><p>Durchklicken oder gezielt wiederfinden. Jedes Motiv behält seinen eigenen Link.</p><a class="daily-latest-link" href="{latest_url}">Zum neuesten Bild →</a></div><section class="daily-gallery" aria-label="Alle Bilder des Tages">{cards}</section></main>{footer()}</body></html>'''


def update_homepage(latest: dict[str, str]) -> None:
    path = ROOT / "index.html"
    source = path.read_text(encoding="utf-8")
    title = latest["title"]
    homepage_title = title[:-1] if title.endswith(".") and not title.endswith("...") else title
    replacement = f'''<a class="format-tile daily-picture-tile" href="bild-des-tages/{escape(filename(latest), quote=True)}" target="_blank" rel="noopener"><img src="images/{escape(latest["image"], quote=True)}" alt="{escape(latest["alt"], quote=True)}" loading="lazy"><div class="tile-copy"><span class="eyebrow">Bild des Tages</span><h3>{escape(homepage_title)}</h3><p>{escape(latest["teaser"])}</p><span class="tile-cta">Bild ansehen →</span></div></a>'''
    updated, count = re.subn(
        r'<a class="format-tile daily-picture-tile".*?</a>',
        replacement,
        source,
        count=1,
        flags=re.S,
    )
    if count != 1:
        raise ValueError("Bild-des-Tages-Kachel auf der Startseite nicht eindeutig gefunden.")
    path.write_text(updated, encoding="utf-8")


def build_daily_pictures() -> int:
    entries = load_entries()
    DETAIL_DIR.mkdir(exist_ok=True)
    for index, item in enumerate(entries):
        newer = entries[index - 1] if index > 0 else None
        older = entries[index + 1] if index + 1 < len(entries) else None
        (DETAIL_DIR / filename(item)).write_text(detail_page(item, older, newer), encoding="utf-8")
    (ROOT / "bild-des-tages.html").write_text(archive_page(entries), encoding="utf-8")
    update_homepage(entries[0])
    return len(entries)


if __name__ == "__main__":
    print(f"OK: {build_daily_pictures()} Bilder des Tages gebaut")
