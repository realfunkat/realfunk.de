/* Keep headline, image, subtitle and full-card destination in sync. */
(() => {
  const hero = document.querySelector('#top.hero');
  const data = document.getElementById('hero-rotation-data');
  if (!hero || !data) return;
  const slides = JSON.parse(data.textContent);
  if (slides.length < 2) return;
  const controls = hero.querySelector('.hero-rotation-controls');
  const pause = controls.querySelector('[data-hero-pause]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, paused = reduced.matches, timer;
  slides.forEach(slide => { const image = new Image(); image.src = 'images/' + slide.img; });
  function schedule() {
    clearTimeout(timer);
    if (!paused && !document.hidden && !hero.matches(':hover') && !hero.contains(document.activeElement)) {
      timer = setTimeout(() => show(index + 1), 8000);
    }
  }
  function show(next) {
    index = (next + slides.length) % slides.length;
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
    controls.querySelector('[data-hero-position]').textContent = `${index + 1} / ${slides.length}`;
    if (!reduced.matches) [image, hero.querySelector('.hero-copy')].forEach(el => el.animate([{opacity:.25},{opacity:1}], {duration:450}));
    schedule();
  }
  function updatePause() {
    pause.textContent = paused ? '▶' : 'Ⅱ';
    pause.setAttribute('aria-label', paused ? 'Automatischen Wechsel starten' : 'Automatischen Wechsel pausieren');
    schedule();
  }
  controls.hidden = false;
  controls.querySelector('[data-hero-prev]').addEventListener('click', () => show(index - 1));
  controls.querySelector('[data-hero-next]').addEventListener('click', () => show(index + 1));
  pause.addEventListener('click', () => { paused = !paused; updatePause(); });
  hero.addEventListener('mouseenter', () => clearTimeout(timer));
  hero.addEventListener('mouseleave', schedule);
  hero.addEventListener('focusin', () => clearTimeout(timer));
  hero.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  updatePause();
})();
