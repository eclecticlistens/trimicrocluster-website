/* Explanatory models only. No audio, MIDI, telemetry or instrument connection. */
(() => {
  'use strict';
  const map = document.getElementById('grid-map');
  const anchors = [5, 7, 4, 5, 8, 6, 9];
  if (map) {
    const pads = Array.from({length: 128}, (_, i) => {
      const pad = document.createElement('span');
      pad.className = 'map-pad' + (i >= 112 ? ' global-pad' : '');
      pad.setAttribute('aria-hidden', 'true');
      map.appendChild(pad);
      return pad;
    });
    const paint = (mode) => {
      pads.forEach((pad, i) => {
        const row = Math.floor(i / 16), col = i % 16;
        pad.className = 'map-pad' + (row === 7 ? ' global-pad' : '');
        if (row === 7) return; // No invented global button mapping.
        if (mode === 'focus' && row !== 3) return;
        const a = anchors[row];
        if (col === a) pad.classList.add('anchor');
        else if (col === a + 2) pad.classList.add('orbit');
        else if (col === (a + 6) % 16) pad.classList.add('shimmer');
        else if (Math.abs(col - a) === 1) pad.classList.add('dim');
      });
      const labels = document.querySelector('.map-labels');
      if (labels) labels.style.height = (map.getBoundingClientRect().height + (window.innerWidth <= 600 ? 8 : 12)) + 'px';
      map.setAttribute('aria-label', mode === 'focus' ? '16 columns and 8 rows. Only row 4, Tonal 1, is lit: Anchor is brightest, Orbit and Shimmer are dimmer. This is an illustrative state.' : '16 columns and 8 rows. Seven voice lanes show illustrative role relationships; the global row is unassigned in this diagram. Anchor is the brightest position in each lane.');
    };
    let mode = 'all';
    document.querySelectorAll('[data-map-mode]').forEach(button => {
      button.addEventListener('click', () => {
        mode = button.dataset.mapMode;
        document.querySelectorAll('[data-map-mode]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        paint(mode);
      });
    });
    paint(mode);
    if ('ResizeObserver' in window) new ResizeObserver(() => paint(mode)).observe(map);
    else window.addEventListener('resize', () => paint(mode));
  }
  document.querySelectorAll('[data-demo-controls]').forEach(el => { el.hidden = false; });
  const queue = document.getElementById('queue-nudge');
  if (!queue) return;
  let remaining = 0, idle = false;
  const permission = document.getElementById('nudge-permission');
  const budget = document.getElementById('nudge-budget');
  const strength = document.getElementById('nudge-strength');
  const lamp = document.getElementById('nudge-lamp');
  const message = document.getElementById('nudge-message');
  const toggle = document.getElementById('toggle-idle');
  function show(text) {
    permission.textContent = idle ? 'IDLE' : 'PLAY';
    budget.textContent = String(remaining);
    strength.textContent = ['None pending', 'Light influence remaining', 'Reduced influence remaining', 'Strongest influence pending'][remaining];
    lamp.className = 'key-light ' + ['off', 'trace', 'shimmer', 'orbit'][remaining];
    toggle.setAttribute('aria-pressed', String(idle));
    toggle.textContent = idle ? 'Set PLAY' : 'Set IDLE';
    message.textContent = text;
  }
  queue.addEventListener('click', () => {
    const replacing = remaining > 0;
    remaining = 3;
    show((replacing ? 'The previous nudge is replaced, not stacked. ' : 'A temporary attraction is pending. ') + (idle ? 'The voice stays IDLE; none of the three notes is consumed. The real design can still expire after 15 seconds.' : 'Three accepted notes are available before release. Anchor and TRI are unchanged.'));
  });
  document.getElementById('accept-note').addEventListener('click', () => {
    if (idle) return show('IDLE: no note is accepted. The pending allowance is unchanged; a nudge does not wake the voice.');
    if (!remaining) return show('There is no pending nudge. The example voice continues without this temporary attraction.');
    remaining -= 1;
    show(remaining ? 'One note was accepted. The influence for the next eligible note is weaker; ' + remaining + ' remain. Anchor has not moved.' : 'The third note was accepted. The temporary attraction is released; Anchor remains where it was.');
  });
  toggle.addEventListener('click', () => {
    idle = !idle;
    show(idle ? 'Permission is now IDLE. No note allowance is consumed, but the 15-second expiry still applies in the design.' : 'Permission is now PLAY. A pending nudge can affect the next eligible accepted note, unless it has expired.');
  });
  document.getElementById('expire-nudge').addEventListener('click', () => {
    remaining = 0;
    show('The example has advanced to the 15-second expiry. Any pending attraction is cleared, including during IDLE. This button models time; it is not a real-time countdown.');
  });
  document.getElementById('reset-nudge').addEventListener('click', () => {
    remaining = 0; idle = false;
    show('Example reset: PLAY permission, no pending nudge, Anchor unchanged.');
  });
})();
