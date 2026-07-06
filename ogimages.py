#!/usr/bin/env python3
"""Generiert gebrandete OG-Share-Bilder (1200x630) je Artikel: Wortmarke Real+Flagge+Domain + Headline.
Nur für Artikel OHNE echtes Bild (og:image == og-default.png) oder die bereits eine og/<slug>.png nutzen.
Schreibt images/og/<slug>.png und setzt og:image/twitter:image/JSON-LD image im Artikel darauf.
Domain, Flagge und Hintergrund werden automatisch aus build.py (SITE) abgeleitet:
  realfunk.at -> Hellblau + rot-weiss-rot ; realfunk.de -> Navy + schwarz-rot-gold.
"""
import os, re, glob
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
MARGIN = 70
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
ACCENT = (232, 162, 0)        # amber accent line
OGDIR = "images/og"


def _host():
    try:
        s = open("build.py", encoding="utf-8").read()
        m = re.search(r'SITE\s*=\s*"https://([^"]+)"', s)
        if m:
            return m.group(1)
    except OSError:
        pass
    return "realfunk.at"


HOST = _host()
TLD = "." + HOST.rsplit(".", 1)[-1]
IS_DE = HOST.endswith(".de")

if IS_DE:
    G_TOP, G_BOT = (5, 17, 42), (32, 40, 74)          # #05112a -> #20284a (Navy)
    FLAG = [(26, 26, 26), (221, 0, 0), (255, 206, 0)]  # Schwarz-Rot-Gold
else:
    G_TOP, G_BOT = (36, 84, 140), (91, 155, 213)       # #24548c -> #5b9bd5 (Hellblau)
    FLAG = [(200, 16, 46), (255, 255, 255), (200, 16, 46)]  # Rot-Weiss-Rot


def gradient():
    base = Image.new("RGB", (W, H), G_TOP)
    px = base.load()
    for y in range(H):
        t = y / (H - 1)
        r = int(G_TOP[0] + (G_BOT[0] - G_TOP[0]) * t)
        g = int(G_TOP[1] + (G_BOT[1] - G_TOP[1]) * t)
        b = int(G_TOP[2] + (G_BOT[2] - G_TOP[2]) * t)
        for x in range(W):
            px[x, y] = (r, g, b)
    return base


def draw_flag(img, x, y, w=40, h=27, radius=5):
    fl = Image.new("RGB", (w, h))
    fd = ImageDraw.Draw(fl)
    sh = h / 3.0
    for i, c in enumerate(FLAG):
        fd.rectangle([0, int(round(i * sh)), w, int(round((i + 1) * sh))], fill=c)
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, w - 1, h - 1], radius=radius, fill=255)
    img.paste(fl, (x, y), mask)
    ImageDraw.Draw(img).rounded_rectangle([x, y, x + w - 1, y + h - 1], radius=radius,
                                          outline=(255, 255, 255), width=2)


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
    # Wortmarke oben: Real [Flagge] Funk .tld
    logo_f = ImageFont.truetype(FONT_BOLD, 40)
    d.text((MARGIN, 54), "Real", font=logo_f, fill=(255, 255, 255))
    rlw = d.textlength("Real", font=logo_f)
    fx = int(MARGIN + rlw + 16)
    draw_flag(img, fx, 58)
    funk_x = fx + 40 + 14
    d.text((funk_x, 54), "Funk", font=logo_f, fill=(255, 255, 255))
    fkw = d.textlength("Funk", font=logo_f)
    d.text((funk_x + fkw + 4, 62), TLD, font=ImageFont.truetype(FONT_REG, 30), fill=(230, 240, 255))
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
    d.text((MARGIN, H - 72), f"{HOST} — die Nachrichten, bevor sie durch den Filter gehen",
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
        m = re.search(r'<meta property="og:image" content="https://%s/images/([^"]+)"' % re.escape(HOST), s)
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
            newimg = f"https://{HOST}/images/og/{slug}.png"
            s = s.replace(f'<meta property="og:image" content="https://{HOST}/images/og-default.png">',
                          f'<meta property="og:image" content="{newimg}">')
            s = s.replace(f'<meta name="twitter:image" content="https://{HOST}/images/og-default.png">',
                          f'<meta name="twitter:image" content="{newimg}">')
            # JSON-LD top-level image (nicht publisher logo)
            s = s.replace('"mainEntityOfPage": "https://%s/artikel/%s.html", "image": "https://%s/images/og-default.png"' % (HOST, slug, HOST),
                          '"mainEntityOfPage": "https://%s/artikel/%s.html", "image": "%s"' % (HOST, slug, newimg))
            open(f, "w", encoding="utf-8").write(s)
    return n


if __name__ == "__main__":
    import sys
    if "--one" in sys.argv:
        make_card("Totalversagen der österreichischen Justiz — ein sehr langer Test-Titel zum Umbruch prüfen", "images/og/_test.png")
        print("Testbild: images/og/_test.png")
    else:
        print("OG-Karten generiert + Tags gesetzt:", process())
