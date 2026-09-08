/* Keep headline, image, subtitle and full-card destination in sync. */
(() => {
  const hero = document.querySelector('#top.hero');
  const data = document.getElementById('hero-rotation-data');
  if (!hero || !data) return;
  const slides = JSON.parse(data.textContent);
  if (slides.length < 2) return;
  // Shared two-hour slots: reloading does not restart the rotation.
  const slotDuration = 2 * 60 * 60 * 1000;
  const preview = new URLSearchParams(location.search).get('hero');
  const previewFile = {spahn:'spahn-schmeisst-den-haushalt.html',neuwahl:'von-der-leyen-fordert-neuwahl.html'}[preview];
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
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
    // The other rotating feature occupies the first small tile.
    const companion = slides[(index + 1) % slides.length];
    const tile = document.querySelector('.small-heroes .mini-hero');
    if (tile) {
      tile.href = 'artikel/' + companion.file;
      tile.dataset.wideScene = companion.file === 'von-der-leyen-fordert-neuwahl.html' ? 'true' : 'false';
      tile.querySelector('img').src = 'images/' + companion.img;
      tile.querySelector('img').alt = companion.alt || '';
      tile.querySelector('span').textContent = companion.kick;
      tile.querySelector('h2').textContent = companion.ttl;
    }
  }
  function sync() {
    clearTimeout(timer);
    const now = Date.now();
    const slot = Math.floor(now / slotDuration);
    if (slot !== lastSlot) {
    show(previewFile ? Math.max(0, slides.findIndex(slide => slide.file === previewFile)) : Math.floor(now / slotDuration) % slides.length);
    lastSlot = slot;
    }
    timer = setTimeout(sync, slotDuration - (now % slotDuration) + 50);
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) sync();
  });
  if (controls) {
    controls.hidden = false;
    controls.querySelector('[data-hero-prev]').addEventListener('click', () => show(index - 1));
    controls.querySelector('[data-hero-next]').addEventListener('click', () => show(index + 1));
  }
  sync();
})();
