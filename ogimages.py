#!/usr/bin/env python3
"""Generiert gebrandete OG-Share-Bilder (1200x630) je Artikel: Logo + Headline auf ORealFunk-Blau.
Nur für Artikel OHNE echtes Bild (og:image == og-default.png) oder die bereits eine og/<slug>.png nutzen.
Schreibt images/og/<slug>.png und setzt og:image/twitter:image/JSON-LD image im Artikel darauf.
"""
import os, re, glob
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
MARGIN = 70
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BLUE_TOP = (36, 84, 140)      # #24548c
BLUE_BOT = (91, 155, 213)     # #5b9bd5
ACCENT = (232, 162, 0)        # amber accent line
OGDIR = "images/og"


def gradient():
    base = Image.new("RGB", (W, H), BLUE_TOP)
    top, bot = BLUE_TOP, BLUE_BOT
    px = base.load()
    for y in range(H):
        t = y / (H - 1)
        r = int(top[0] + (bot[0] - top[0]) * t)
        g = int(top[1] + (bot[1] - top[1]) * t)
        b = int(top[2] + (bot[2] - top[2]) * t)
        for x in range(W):
            px[x, y] = (r, g, b)
    return base


def wrap(draw, text, font, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if draw.textlength(test, font=font) <= maxw:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def make_card(headline, out):
    img = gradient()
    d = ImageDraw.Draw(img)
    # Wortmarke oben
    logo_f = ImageFont.truetype(FONT_BOLD, 40)
    d.text((MARGIN, 54), "OReal", font=logo_f, fill=(255, 255, 255))
    lw = d.textlength("OReal", font=logo_f)
    cx = MARGIN + lw + 20
    d.ellipse([cx, 60, cx + 26, 86], outline=(255, 255, 255), width=6)
    d.ellipse([cx + 8, 68, cx + 18, 78], fill=(255, 255, 255))
    d.text((cx + 36, 54), "Funk", font=logo_f, fill=(255, 255, 255))
    fw = d.textlength("Funk", font=logo_f)
    d.text((cx + 36 + fw + 4, 62), ".at", font=ImageFont.truetype(FONT_REG, 30), fill=(230, 240, 255))
    # Badge
    bf = ImageFont.truetype(FONT_BOLD, 20)
    d.text((MARGIN, 118), "NACHRICHTEN OHNE ÖRR-FILTER", font=bf, fill=(210, 226, 246))

    # Headline: passende Schriftgröße finden (max 5 Zeilen, min 40px)
    maxw = W - 2 * MARGIN
    size = 72
    while size >= 40:
        f = ImageFont.truetype(FONT_BOLD, size)
        lines = wrap(d, headline, f, maxw)
        lh = int(size * 1.2)
        if len(lines) <= 5 and len(lines) * lh <= 300:
            break
        size -= 4
    f = ImageFont.truetype(FONT_BOLD, size)
    lines = wrap(d, headline, f, maxw)
    lh = int(size * 1.22)
    total = len(lines) * lh
    y = 200 + max(0, (300 - total) // 2)
    for ln in lines:
        d.text((MARGIN, y), ln, font=f, fill=(255, 255, 255))
        y += lh
    # Akzentlinie + Fußzeile
    d.rectangle([MARGIN, H - 92, MARGIN + 90, H - 86], fill=ACCENT)
    d.text((MARGIN, H - 72), "realfunk.de — die Nachrichten, bevor sie durch den Filter gehen",
           font=ImageFont.truetype(FONT_REG, 24), fill=(226, 238, 252))
    os.makedirs(OGDIR, exist_ok=True)
    img.save(out, "PNG")


def article_headline(s):
    m = re.search(r'<h1>(.*?)</h1>', s, re.S)
    if not m:
        return None
    return re.sub(r'<[^>]+>', '', m.group(1)).strip()


def process(write_tags=True):
    n = 0
    for f in glob.glob("artikel/*.html"):
        slug = os.path.basename(f)[:-5]
        s = open(f, encoding="utf-8").read()
        m = re.search(r'<meta property="og:image" content="https://realfunk\.de/images/([^"]+)"', s)
        cur = m.group(1) if m else ""
        # nur generieren, wenn kein echtes Bild (og-default) oder bereits og/<slug>.png
        if cur != "og-default.png" and not cur.startswith("og/"):
            continue
        hl = article_headline(s)
        if not hl:
            continue
        out = f"{OGDIR}/{slug}.png"
        make_card(hl, out)
        n += 1
        if write_tags:
            newimg = f"https://realfunk.de/images/og/{slug}.png"
            s = s.replace('<meta property="og:image" content="https://realfunk.de/images/og-default.png">',
                          f'<meta property="og:image" content="{newimg}">')
            s = s.replace('<meta name="twitter:image" content="https://realfunk.de/images/og-default.png">',
                          f'<meta name="twitter:image" content="{newimg}">')
            # JSON-LD top-level image (nicht publisher logo)
            s = s.replace('"mainEntityOfPage": "https://realfunk.de/artikel/%s.html", "image": "https://realfunk.de/images/og-default.png"' % slug,
                          '"mainEntityOfPage": "https://realfunk.de/artikel/%s.html", "image": "%s"' % (slug, newimg))
            open(f, "w", encoding="utf-8").write(s)
    return n


if __name__ == "__main__":
    import sys
    if "--one" in sys.argv:
        make_card("Totalversagen der österreichischen Justiz — ein sehr langer Test-Titel zum Umbruch prüfen", "images/og/_test.png")
        print("Testbild: images/og/_test.png")
    else:
        print("OG-Karten generiert + Tags gesetzt:", process())
