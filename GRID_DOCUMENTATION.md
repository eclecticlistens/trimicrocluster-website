# Grid documentation update — 23 October 2026

## Scope

Adds `grid.html`, `grid.css` and `grid-demo.js`. These are website explanations only, not instrument code, a MIDI controller or a live norns connection. Advanced source is not distributed.

## Evidence used

- 28 September user requirement: Anchor should remain brightest.
- 30 September user-approved melodic nudge: valid nearby pitch attraction, three accepted notes, weakening each use, fifteen-second expiry, replacing rather than stacking; no change to already-sounding notes or TRI; IDLE neither wakes nor consumes the note allowance. Wall-clock expiry still applies.
- 30 September accompanying implementation report: short tap selects a lane; a hold of at least 0.65 seconds commits a nudge on release; double-tap uses short taps at most 0.30 seconds, gap at most 0.35 seconds. Shimmer uses current Field Shimmer brought into the scale, one use and fifteen-second expiry; Shimmer/Nudge replace one another. These thresholds are historical implementation reports, not a current code audit.
- Later 30 September user report: grid working; native 128 testing still to follow.
- 1–2 October implementation/layout records: seven voice rows, shared focused ARP display lane, globals in row eight. Separate ARP voices and audio outputs are not combined by this display.
- 12 October: a two-bank TMC/Bitbox mixer is planned later, not treated as implemented here.

Older long-press-to-relocate-Anchor suggestions are not published as the refined nudge mapping. Generic numeric LED levels are not asserted as current TMC constants. Exact global column positions are omitted pending code inspection.

## Visual and interaction checks to maintain

- The map creates exactly 128 cells: sixteen columns, eight rows; no knobs.
- The Anchor is brighter than role-detail and nudge indicators.
- The nudge example is manually stepped, with no real-time timer, audio or MIDI.
- Accepted-note budget changes only for PLAY, not IDLE.
- A replacement starts a new budget rather than accumulating it.
- Expiry clears the pending influence even in IDLE.
- Text describes the complete rules without requiring the interactive example.

## Homepage integration

`_includes/tmc-home-base.html` retains the exact approved homepage before this update. The small `index.html` Liquid wrapper inserts a static Grid navigation link, an accessible mobile navigation layout and a Grid feature after the main AI/dyslexia feature. GitHub Pages already uses Jekyll; its output remains ordinary HTML. To change the underlying homepage, edit the include; to change these inserts, edit `index.html`.

The shared `reader.js` adds a Grid link to the other article menus when JavaScript is enabled; the homepage and Grid article have static links. Existing reading-layout storage is preserved.

## Primary hardware references

- https://monome.org/docs/norns/reference/grid — 0–15 API brightness range.
- https://monome.org/docs/grid/editions/ — hardware dimensions and edition-specific lighting.

These establish hardware/platform facts, not TMC-specific mappings.
