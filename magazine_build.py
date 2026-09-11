"""Refresh magazine sections using the existing editorial hero pool and article index."""
from pathlib import Path
import re,json
from html import escape, unescape

def update_magazine(arts):
 p=Path('index.html');s=p.read_text(encoding='utf-8')
 if 'class="small-heroes"' not in s:return
 pool=re.search(r'var HERO_POOL = \[([\s\S]*?)\n  \];',Path('hero.js').read_text(encoding='utf-8'))
 if not pool:raise ValueError('HERO_POOL fehlt')
 items=[]
 for entry in re.finditer(r'\{([^{}]+)\}',pool[1]):
  values={k:json.loads(v) for k,v in re.findall(r'(\w+)\s*:\s*("(?:[^"\\]|\\.)*")',entry[1])}
  if all(k in values for k in ('file','kick','ttl','img')):items.append(values)
 if len(items)<5:raise ValueError('Mindestens fünf vollständige Hero-Einträge erforderlich')
 def esc(t):return escape(t,quote=True)
 first=items[0]
 article=Path('artikel',first['file']).read_text(encoding='utf-8')
 subtitle_match=re.search(r'<(?:div|p)[^>]*class=["\'][^"\']*\bsubheadline\b[^"\']*["\'][^>]*>(.*?)</(?:div|p)>',article,re.S)
 subtitle=unescape(re.sub(r'<[^>]+>','',subtitle_match[1])).strip() if subtitle_match else ''
 subtitle_html='<p>'+esc(subtitle)+'</p>' if subtitle else ''
 hero=f'''<section class="hero" id="top"><img src="images/{esc(first['img'])}" alt="{esc(first.get('alt',''))}"><div class="hero-copy"><span class="eyebrow">Top-Themen / {esc(first['kick'])}</span><h1 id="hero-title">{esc(first['ttl'])}</h1>{subtitle_html}<span class="link" aria-hidden="true">Zum Artikel ↗</span></div><a class="hero-full-link" href="artikel/{esc(first['file'])}" aria-labelledby="hero-title"></a></section>'''
 rotation=[]
 for item in items[:3]:
  article=Path('artikel',item['file']).read_text(encoding='utf-8')
  sub=re.search(r'<(?:div|p)[^>]*class=["\'][^"\']*\bsubheadline\b[^"\']*["\'][^>]*>(.*?)</(?:div|p)>',article,re.S)
  rotation.append(dict(item,subtitle=unescape(re.sub(r'<[^>]+>','',sub[1])).strip() if sub else ''))
 payload=json.dumps(rotation,ensure_ascii=False).replace('<','\\u003c')
 controls='<div class="hero-switch" hidden><button type="button" data-hero-prev aria-label="Vorheriges Top-Thema">←</button><span data-hero-position></span><button type="button" data-hero-next aria-label="Nächstes Top-Thema">→</button></div>'
 hero=hero.replace('</section>',controls+'<script type="application/json" id="hero-rotation-data">'+payload+'</script></section>')
 if 'src="hero-rotation.js' not in s:s=s.replace('</body>','<script defer src="hero-rotation.js?v=20260911-three"></script></body>')
 small='<section class="small-heroes" aria-label="Weitere Top-Themen">'+''.join(f'''<a class="mini-hero" href="artikel/{esc(x['file'])}"><img src="images/{esc(x['img'])}" alt="{esc(x.get('alt',''))}" loading="lazy"><div><span>{esc(x['kick'])}</span><h2>{esc(x['ttl'])}</h2></div></a>''' for x in items[1:5])+'</section>'
 s=re.sub(r'<section class="hero" id="top">.*?</section>',lambda m:hero,s,count=1,flags=re.S)
 s=re.sub(r'<section class="small-heroes".*?</section>',lambda m:small,s,count=1,flags=re.S)
 active=['Deutschland','EU','ÖRR','Österreich','Ausland','Durchschaut','Kurzartikel']
 hero_files={item['file'] for item in items[:5]}
 rows=[]
 for topic in active:
  a=next((a for a in arts if a['ressort']==topic and a['file'] not in hero_files),None)
  if not a:continue
  rows.append(f'''<a href="artikel/{esc(a['file'])}"><span class="story-topic">{esc(topic)}</span><strong>{esc(a['title'])}</strong><time datetime="{esc(a['date'])}">{esc('.'.join(a['date'].split('-')[::-1]))}</time><span aria-hidden="true">↗</span></a>''')
 stories='<section class="top-stories" id="meldungen"><div class="section-head"><h2>Meldungen</h2><p>Weitere Meldungen aus den Ressorts.</p></div><div class="story-list">'+''.join(rows)+'</div></section>'
 s=re.sub(r'<section class="top-stories".*?</section>',lambda m:stories,s,count=1,flags=re.S)
 s=re.sub(r'(<meta property="og:image" content=")[^"]*(">)',lambda m:m.group(1)+'https://realfunk.de/images/'+first['img']+m.group(2),s,count=1)
 p.write_text(s,encoding='utf-8')
 p=Path('archiv.html');s=p.read_text(encoding='utf-8')
 data=[{'t':a['title'],'d':a['desc'],'u':'/artikel/'+a['file'],'r':a['ressort'],'date':a['date'],'href':'artikel/'+a['file']} for a in arts]
 s,n=re.subn(r'const data=\[.*?\];',lambda m:'const data='+json.dumps(data,ensure_ascii=False)+';',s,count=1,flags=re.S)
 if n!=1:raise ValueError('Archivdatenblock fehlt')
 p.write_text(s,encoding='utf-8')
