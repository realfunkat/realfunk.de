#!/usr/bin/env python3
"""ORealFunk build tool.
Regeneriert feed.xml, sitemap.xml und search-index.json aus artikel/*.html.
Quelle je Artikel = dessen JSON-LD (headline, description, url, datePublished) + kicker (Ressort).
Aufruf:  python3 build.py   (im Projekt-Root)
"""
import re, glob, json
from xml.sax.saxutils import escape
from datetime import datetime, timezone

SITE = "https://realfunk.de"
MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


def rfc822(d):
    try:
        dt = datetime.strptime(d, "%Y-%m-%d")
        return f"{DAYS[dt.weekday()]}, {dt.day:02d} {MONTHS[dt.month]} {dt.year} 06:00:00 +0000"
    except Exception:
        return ""


def collect():
    arts = []
    for f in sorted(glob.glob("artikel/*.html")):
        s = open(f, encoding="utf-8").read()
        m = re.search(r'application/ld\+json">(.*?)</script>', s, re.S)
        if not m:
            continue
        try:
            d = json.loads(m.group(1))
        except Exception as e:
            print("WARN JSON-LD kaputt:", f, e)
            continue
        km = re.search(r'<div class="kicker">([^<]+)</div>', s)
        arts.append({
            "file": f.split("/")[-1],
            "url": d.get("url", f"{SITE}/artikel/{f.split('/')[-1]}"),
            "title": d.get("headline", ""),
            "desc": d.get("description", ""),
            "date": d.get("datePublished", ""),
            "ressort": km.group(1).strip() if km else "",
        })
    arts.sort(key=lambda a: (a["date"], a["file"]), reverse=True)
    return arts


def write_feed(arts):
    items = []
    for a in arts:
        items.append(
            "  <item>\n"
            f"    <title>{escape(a['title'])}</title>\n"
            f"    <link>{a['url']}</link>\n"
            f"    <guid>{a['url']}</guid>\n"
            f"    <description>{escape(a['desc'])}</description>\n"
            f"    <pubDate>{rfc822(a['date'])}</pubDate>\n"
            "  </item>"
        )
    now = datetime.now(timezone.utc)
    build = f"{DAYS[now.weekday()]}, {now.day:02d} {MONTHS[now.month]} {now.year} {now:%H:%M:%S} +0000"
    feed = (
        '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n'
        "  <title>ORealFunk — Nachrichten ohne ÖRR-Filter</title>\n"
        f"  <link>{SITE}/</link>\n"
        "  <description>ORF-Watch. Wie der Staatsfunk Nachrichten rahmt und was er weglaesst.</description>\n"
        "  <language>de-at</language>\n"
        f"  <lastBuildDate>{build}</lastBuildDate>\n"
        f'  <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="{SITE}/feed.xml" rel="self" type="application/rss+xml"/>\n'
        + "\n".join(items) + "\n</channel></rss>\n"
    )
    open("feed.xml", "w", encoding="utf-8").write(feed)


def write_sitemap(arts):
    import os
    roots = [("/", "1.0")]
    for p, pr in [("sport.html", "0.7"), ("wetter.html", "0.6"), ("archiv.html", "0.6"),
                  ("impressum.html", "0.2"), ("datenschutz.html", "0.2")]:
        if os.path.exists(p):
            roots.append(("/" + p, pr))
    urls = [f"  <url><loc>{SITE}{p}</loc><priority>{pr}</priority></url>" for p, pr in roots]
    for a in arts:
        urls.append(f"  <url><loc>{a['url']}</loc><lastmod>{a['date']}</lastmod><priority>0.7</priority></url>")
    sm = ('<?xml version="1.0" encoding="UTF-8"?>\n'
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
          + "\n".join(urls) + "\n</urlset>\n")
    open("sitemap.xml", "w", encoding="utf-8").write(sm)


def write_search(arts):
    idx = [{"t": a["title"], "d": a["desc"], "u": "/artikel/" + a["file"],
            "r": a["ressort"], "date": a["date"]} for a in arts]
    open("search-index.json", "w", encoding="utf-8").write(json.dumps(idx, ensure_ascii=False))


if __name__ == "__main__":
    try:
        import ogimages
        print(f"OG-Karten (Logo+Headline) generiert/aktualisiert: {ogimages.process()}")
    except Exception as e:
        print("OG-Schritt übersprungen:", e)
    arts = collect()
    write_feed(arts)
    write_sitemap(arts)
    write_search(arts)
    print(f"OK: {len(arts)} Artikel -> feed.xml, sitemap.xml, search-index.json")
