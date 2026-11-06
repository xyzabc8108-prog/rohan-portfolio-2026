/* First-page-entry transition: skip/Escape, reduced motion, and safe cleanup. */
(() => {
  'use strict';
  const root = document.documentElement;
  const intro = document.getElementById('portfolio-intro');
  if (!intro || !root.classList.contains('intro-active')) return;
  const skipButton = intro.querySelector('.intro-skip');
  let finished = false;
  let skipTimer;
  const autoTimer = window.setTimeout(removeIntro, 6400);
  function removeIntro() {
    if (finished) return;
    finished = true;
    window.clearTimeout(autoTimer);
    window.clearTimeout(skipTimer);
    document.body.classList.remove('intro-locked');
    root.classList.remove('intro-active');
    document.removeEventListener('keydown', onKey);
    intro.remove();
  }
  function skipIntro() {
    if (finished || intro.classList.contains('is-skipping')) return;
    intro.classList.add('is-skipping');
    window.clearTimeout(autoTimer);
    skipTimer = window.setTimeout(() => {
      removeIntro();
      const main = document.getElementById('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    }, 475);
  }
  function onKey(event) {
    if (event.key === 'Escape') skipIntro();
  }
  document.body.classList.add('intro-locked');
  skipButton?.addEventListener('click', skipIntro);
  document.addEventListener('keydown', onKey);
  skipButton?.focus({ preventScroll: true });
  const motionPref = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionPref.addEventListener) {
    motionPref.addEventListener('change', event => {
      if (event.matches) removeIntro();
    }, { once: true });
  }
  window.addEventListener('pagehide', removeIntro, { once: true });
})();
