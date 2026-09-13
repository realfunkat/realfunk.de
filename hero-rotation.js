/* Keep headline, image, subtitle and full-card destination in sync. */
(() => {
  const hero = document.querySelector('#top.hero');
  const data = document.getElementById('hero-rotation-data');
  if (!hero || !data) return;
  const slides = JSON.parse(data.textContent);
  if (slides.length < 2) return;
  // Shared eight-second slots: reloading does not restart the rotation.
  const slotDuration = 8 * 1000;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const preview = new URLSearchParams(location.search).get('hero');
  const previewFile = {
    afd: 'afd-tarnt-wahlwerbung-als-fuck-afd-protest.html',
    babler: 'bablers-neue-wirklichkeit.html',
    merz: 'cdu-insider-packt-aus.html',
    pisa: 'pisa-beweist-politik-wirkt.html'
  }[preview];
  const controls = hero.querySelector(".hero-switch");
  let index = -1, timer, lastSlot = -1;
  function show(next) {
    next = (next + slides.length) % slides.length;
    if (next === index) return;
    index = next;
    const slide = slides[index];
    if (controls) controls.querySelector("[data-hero-position]").textContent = `${index + 1} / ${slides.length}`;
    const image = hero.querySelector('img');
    image.src = 'images/' + slide.img;
    image.alt = slide.alt || '';
    hero.querySelector('video')?.remove();
    hero.querySelector('.hero-video-credit')?.remove();
    if (slide.video) {
      const video = document.createElement('video');
      video.className = 'hero-video';
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('aria-hidden', 'true');
      video.poster = image.src;
      video.src = slide.video;
      video.preload = 'auto';
      image.after(video);
      const credit = document.createElement('span');
      credit.className = 'hero-video-credit';
      credit.textContent = 'KI-Satire';
      hero.append(credit);
      // Play once, then retain the final frame. The still remains as fallback.
      if (!reducedMotion.matches) {
        video.play().catch(() => video.remove());
      }
    }
    hero.querySelector('.eyebrow').textContent = 'Top-Themen / ' + slide.kick;
    hero.querySelector('h1').textContent = slide.ttl;
    let subtitle = hero.querySelector('.hero-copy p');
    if (!subtitle) {
      subtitle = document.createElement('p');
      hero.querySelector('h1').after(subtitle);
    }
    subtitle.textContent = slide.subtitle;
    subtitle.hidden = !slide.subtitle;
    hero.querySelector('.hero-full-link').href = 'artikel/' + slide.file;
    // The other rotating features occupy the first companion tiles.
    const companions = slides.filter((_, slideIndex) => slideIndex !== index);
    document.querySelectorAll('.small-heroes .mini-hero').forEach((tile, tileIndex) => {
      const companion = companions[tileIndex];
      if (!companion || tileIndex >= slides.length - 1) return;
      tile.href = 'artikel/' + companion.file;
      tile.dataset.wideScene = 'false';
      tile.querySelector('img').src = 'images/' + companion.img;
      tile.querySelector('img').alt = companion.alt || '';
      tile.querySelector('span').textContent = companion.kick;
      tile.querySelector('h2').textContent = companion.ttl;
    });
  }
  function sync() {
    clearTimeout(timer);
    const now = Date.now();
    const slot = Math.floor(now / slotDuration);
    if (previewFile || reducedMotion.matches) {
      if (lastSlot === -1) {
        show(previewFile ? Math.max(0, slides.findIndex(slide => slide.file === previewFile)) : slot % slides.length);
      }
      lastSlot = slot;
      return;
    }
    if (slot !== lastSlot) {
      show(slot % slides.length);
      lastSlot = slot;
    }
    timer = setTimeout(sync, slotDuration - (now % slotDuration) + 50);
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) sync();
  });
  reducedMotion.addEventListener?.('change', sync);
  if (controls) {
    controls.hidden = false;
    controls.querySelector('[data-hero-prev]').addEventListener('click', () => show(index - 1));
    controls.querySelector('[data-hero-next]').addEventListener('click', () => show(index + 1));
  }
  sync();
})();
