# Grid documentation — 23 October 2026

## Scope

`grid.html`, `grid.css` and `grid-demo.js` explain the interface and accepted nudge design. They contain no audio, MIDI, live norns connection or TMC Advanced source.

## Evidence and status

- **User constraint, 28 September:** Anchor should remain brightest. Suggested brightness ranges are not treated as verified TMC constants.
- **User-approved specification, 30 September 16:41:** temporary attraction, not Anchor relocation; up to three accepted notes or fifteen seconds; weakening on use; replacement, not stacking; no immediate note, no waking IDLE, no TRI change and no change to an already-sounding note.
- **Implementation report, 30 September 16:41:** held press >=0.65s, committed on release; double-tap uses taps <=0.30s and gap <=0.35s; one-use Shimmer and Nudge mutually replace. Historical report, not a current source audit.
- **User test report, 30 September 18:37:** working on the 8x8 controller; native 128 testing still to follow.
- **Assistant layout proposal, 30 September 18:40:** Drone/SubHarm/Rings Cells/Tonal 1/Tonal 2/Tonal 3/focused ARP/global. The exact order and shared ARP display are labelled as a proposal; recovered evidence does not establish final adoption.
- **12 October plan:** later two-bank TMC/Bitbox mixer; not presented as completed.

The prior claim that 1–2 October records established the final seven-lane map has been corrected. No exact global button column assignments are published. Older long-press-to-move-Anchor descriptions are not substituted for the later user-approved Nudge specification.

## Website checks

The GitHub Pages deployment for commit b2f0bb94dc46cb3d5a35fa6ea789256812cbfb79 succeeded. Its exact published artifact was downloaded for local browser testing. At widths 1440, 390 and 320 pixels: 128 grid cells rendered, the homepage Grid feature and link were present, and there was no document-width overflow. Browser page errors were absent. External font requests were unavailable in the test environment, so typography used fallback fonts during these checks.

Interactive checks passed: queue=3; accepted note decrements; IDLE does not decrement; replacement resets rather than adds; manual expiry clears in IDLE; three accepted notes clear; focused view has one Anchor; reading layout activates without overflow. These check the website illustration, not TMC software or hardware.

## Integration

The approved homepage is retained at `_includes/tmc-home-base.html`. The small `index.html` Liquid wrapper adds the Grid link and feature after the main AI/dyslexia feature. GitHub Pages builds ordinary HTML. The shared `reader.js` adds a Grid menu link to other articles; the homepage and Grid article have static links.

## Primary hardware references

- https://monome.org/docs/norns/reference/grid — the API accepts brightness 0–15.
- https://monome.org/docs/grid/editions/ — hardware size and edition-specific lighting.

Hardware documentation is not evidence for TMC-specific mappings.
