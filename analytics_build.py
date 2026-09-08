"""Keep the existing Cloudflare Web Analytics tag on every public HTML page."""
from pathlib import Path
from html.parser import HTMLParser
import json

BEACON_URL = 'https://static.cloudflareinsights.com/beacon.min.js'
# Public site identifier from the existing production integration, not an API credential.
SITE_TOKEN = 'a017662ec0e94031a498c6b772dc7271'
TAG = '<!-- Cloudflare Web Analytics --><script defer src="' + BEACON_URL + '" data-cf-beacon=\'{"token":"' + SITE_TOKEN + '"}\'></script><!-- End Cloudflare Web Analytics -->'

class BeaconParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'script' and 'cloudflareinsights.com/beacon.min.js' in attrs.get('src', ''):
            self.tags.append(attrs)

def ensure_analytics(root=Path('.')):
    total = added = 0
    for page in sorted(Path(root).rglob('*.html')):
        if '.git' in page.parts:
            continue
        text = page.read_text(encoding='utf-8')
        parser = BeaconParser()
        parser.feed(text)
        if len(parser.tags) > 1:
            raise ValueError(f'{page}: doppelte Analytics-Einbindung')
        if parser.tags:
            config = json.loads(parser.tags[0].get('data-cf-beacon', '{}'))
            if config.get('token') != SITE_TOKEN:
                raise ValueError(f'{page}: abweichende Analytics-Site-ID')
        else:
            if '</body>' not in text:
                raise ValueError(f'{page}: schließendes body-Tag fehlt')
            page.write_text(text.replace('</body>', TAG + '\n</body>', 1), encoding='utf-8')
            added += 1
        total += 1
    print(f'Analytics: {total} Seiten, {added} Einbindungen ergänzt, keine Duplikate')
    return total, added

if __name__ == '__main__':
    ensure_analytics()
