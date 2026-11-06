# Cosmic portfolio — prototype design contract

Approved to proceed as a prototype on 6 November 2026. Full-site and visual milestone review pending. Read `docs/redesign/PROPOSAL.md` and `IMPLEMENTATION_PLAN.md` for context.

## Current implementation

Route `/cosmic-preview` contains the opening, About, four selected projects, capabilities, Background, contact and an optional scripted guide. `/cosmic-preview/states` contains isolated interactive component studies. Existing home page is not migrated until the slice passes visual review. Styles are scoped to `.cosmic-experience`.

Palette: void #060A10, text #E9E5DB, secondary text #A8B8BC, amber #DDB87A, divider #35444B. These are authored semantic tokens, not sampled reference colors. Do not present this as completed Design DNA extraction.

Type, revised after user feedback: locally hosted Unbounded Black (900) supplies wide, heavy uppercase headings. The hero uses two deliberately offset lines, “STAY / CURIOUS.”, at 38–148px. Body uses the existing local Inter; JetBrains Mono stays in small annotations. Italic serif treatments are removed. The display font is a 21,112-byte Latin WOFF2 from `fontsource/font-files`, `fonts/google/unbounded/files/unbounded-latin-900-normal.woff2`; OFL license accompanies it. No Google Fonts network fetch is used. Georgia/Newsreader are superseded for this direction.

Composition, revised: sharper project artwork silhouette, larger stacked project title, stronger section rules, left-aligned contact ending and a warmer #EBBD69 amber. Text/link focus treatments remain explicit. The hero and reading sections retain native vertical flow. Mobile removes the title offset and stacks Rocky beneath the introduction. Headline glyph widths fit the intended 320/390/768/1024/1440px containers using the bundled font's metrics; real browser review is still pending.

Motion, revised: one restrained 180ms link-arrow response to hover or keyboard focus, with existing quiet Rocky idle and bounded hero depth. Text is visible immediately; no entrance opacity gate. Reduced-motion policy disables decorative animation and transitions.

Atmosphere: original CSS/SVG study with sparse deterministic stars, distant amber star and low teal horizon. Source-reference image downloads failed. Replace/validate with supplied reference pixels when available; this is not a reconstruction of those assets. The PUP Tulong illustration is abstract original artwork, not an application screenshot.

Rocky: now uses the user-supplied `rocky-16bit-animation-pack/rocky-16bit-assets/rocky-16bit-spritesheet.png`, replacing the provisional SVG. The transparent 1280×1280 atlas contains four 320×320 frames per row, ordered walking/crawling/jumping/waving. Rendered at 160×160 with pixelated scaling. WebP runtime atlas preserves dimensions and transparency; source files remain intact. Frame durations are 130/165/215/260ms respectively. Static waving frame is the resting pose; dialogue activation plays one wave. Explicit movement studies allow playing all four loops. Pause, hidden-tab, offscreen and reduced-motion policies disable playback; no uncontrolled animated WebP/GIF is used. Cross-section travel and the other contextual transitions still follow slice review.

Interactions: native anchors, native mobile disclosure, named links, visible focus, inline mobile companion, explicit dialogue/ASCII/pause/hide controls. All core editorial content renders without JS. Media queries and reactive motion policy disable movement under reduced motion. No random speech or full-screen intro. No new runtime dependencies.

## Review gate

Obtain actual artwork, measure it using Design DNA, review fonts/crops/character fidelity, and visually verify desktop/mobile/keyboard/reduced motion before expanding. Storybook installation is pending registry access; the isolated route is a temporary review aid, not a completed Storybook integration.


Expanded journey: Rocky docks into reserved section stages; a single reducer preserves pause/hide/dialogue state. Context-specific dialogue accompanies the current section. Brief walking/crawling/jumping reactions follow travel/discovery/contact, with no movement over reading columns. Preview chat uses verified project summaries and parks Rocky while open. Personal role/date confirmations remain in CONTENT_REGISTER.md.
# Small-universe interaction milestone

Approved steering, 6 November 2026: project presentations become distinct pixel
planets, technical skills form an asteroid belt, and the provided monochrome ASCII
portrait enters the hero. Keep project descriptions visible beside each world.
Planet links lead to their corresponding descriptions; skill names remain readable
semantic lists rather than orbiting text.

Rocky now follows in a reserved desktop edge rail using a damped spring responding
to scroll velocity. Mobile uses a compact bottom dock. Native document scrolling
remains authoritative; no wheel interception or scroll replacement. Opening Rocky
starts the CV-backed scripted conversation using the existing chatbot hook and
classifier. Conversation, pause, ASCII, and reduced-motion states suppress travel.
The standalone state gallery retains its original companion controls.

Portrait: three locally optimized WebP angles extracted from supplied HTML, with
quiet holds and discrete angle changes. No original embedded script execution.
OS reduced motion freezes the front pose; leaving view suspends its timer.
Planets use stepped silhouettes, restrained dithering and scroll-linked transforms
where supported. Asteroid marks drift; their labels remain still. Reduced motion
disables both effects.
# Free-flight correction — 6 November 2026

Rocky glides across both viewport axes along a scroll-derived curve, with spring
interpolation and bounded destinations. Prefer nearby gaps when a destination
intersects text or controls; return to a resting corner when scrolling stops.
The sprite layer does not intercept pointers; only controls do. Keyboard focus,
conversation, pause and reduced motion inhibit travel. The chat panel stays fixed
for reading rather than traveling with Rocky. This supersedes the edge-rail/mobile
dock direction below.

Portrait hero uses transparent containers and screen blending to remove the black
field of the supplied raster frames without degrading glyph details. Source HTML
body/stage backgrounds and inset black shadow are also removed.

