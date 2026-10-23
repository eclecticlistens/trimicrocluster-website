/* Shared article enhancements. Text and ordinary links remain usable without JS. */
(() => {
  'use strict';
  const nav = document.querySelector('header nav');
  if (nav && !nav.querySelector('a[href="grid.html"]')) {
    const link = document.createElement('a');
    link.href = 'grid.html'; link.textContent = 'Grid';
    const architecture = nav.querySelector('a[href="architecture.html"]');
    if (architecture) architecture.insertAdjacentElement('afterend', link);
    else nav.appendChild(link);
  }
  const button = document.querySelector('[data-reading-toggle]');
  if (!button) return;
  button.hidden = false;
  const key = 'tmc-reading';
  try { if (localStorage.getItem(key) === 'true') document.body.classList.add('reading'); } catch (_) {}
  const reflect = () => {
    const enabled = document.body.classList.contains('reading');
    button.setAttribute('aria-pressed', String(enabled));
    button.textContent = enabled ? 'Standard layout' : 'Reading layout';
  };
  reflect();
  button.addEventListener('click', () => {
    document.body.classList.toggle('reading');
    reflect();
    try { localStorage.setItem(key, String(document.body.classList.contains('reading'))); } catch (_) {}
  });
})();
