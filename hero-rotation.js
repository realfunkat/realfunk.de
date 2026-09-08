/* Keep headline, image, subtitle and full-card destination in sync. */
(() => {
  const hero = document.querySelector('#top.hero');
  const data = document.getElementById('hero-rotation-data');
  if (!hero || !data) return;
  const slides = JSON.parse(data.textContent);
  if (slides.length < 2) return;
  // Shared two-hour slots: reloading does not restart the rotation.
  const slotDuration = 2 * 60 * 60 * 1000;
  const previewSpahn = new URLSearchParams(location.search).get('hero') === 'spahn';
  let index = -1, timer;
  function show(next) {
    if (next === index) return;
    index = next;
    const slide = slides[index];
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
  }
  function sync() {
    clearTimeout(timer);
    const now = Date.now();
    show(previewSpahn ? Math.max(0, slides.findIndex(slide => slide.file === 'spahn-schmeisst-den-haushalt.html')) : Math.floor(now / slotDuration) % slides.length);
    timer = setTimeout(sync, slotDuration - (now % slotDuration) + 50);
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) sync();
  });
  sync();
})();
