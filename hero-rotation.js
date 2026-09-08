/* Keep headline, image, subtitle and full-card destination in sync. */
(() => {
  const hero = document.querySelector('#top.hero');
  const data = document.getElementById('hero-rotation-data');
  if (!hero || !data) return;
  const slides = JSON.parse(data.textContent);
  if (slides.length < 2) return;
  // Shared two-hour slots: reloading does not restart the rotation.
  const slotDuration = 2 * 60 * 60 * 1000;
  let index = -1, timer;
  function show(next) {
    if (next === index) return;
    index = next;
    const slide = slides[index];
    const image = hero.querySelector('img');
    image.src = 'images/' + slide.img;
    image.alt = slide.alt || '';
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
    show(Math.floor(now / slotDuration) % slides.length);
    timer = setTimeout(sync, slotDuration - (now % slotDuration) + 50);
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) sync();
  });
  sync();
})();
