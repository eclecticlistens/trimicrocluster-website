/* Optional reading layout. The article remains complete without JavaScript. */
(() => {
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
