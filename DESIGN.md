# Cosmic portfolio — prototype design contract

Approved to proceed as a prototype on 6 November 2026. Full-site and visual milestone review pending. Read `docs/redesign/PROPOSAL.md` and `IMPLEMENTATION_PLAN.md` for context.

## Current implementation

Route `/cosmic-preview` contains the opening, About bridge, one project and contact ending. `/cosmic-preview/states` contains isolated interactive component studies. Existing home page is not migrated until the slice passes visual review. Styles are scoped to `.cosmic-experience`.

Palette: void #060A10, text #E9E5DB, secondary text #A8B8BC, amber #DDB87A, divider #35444B. These are authored semantic tokens, not sampled reference colors. Do not present this as completed Design DNA extraction.

Type: Georgia editorial display, system sans body, existing JetBrains Mono annotations. Georgia is an offline prototype substitute for the proposed Newsreader; no new font installed. Body 15–16px, headings responsive 40–118px. Natural capitalization. 1280px reading container, 20–72px gutters, 70–150px section spacing. One column below 800px.

Atmosphere: original CSS/SVG study with sparse deterministic stars, distant amber star and low teal horizon. Source-reference image downloads failed. Replace/validate with supplied reference pixels when available; this is not a reconstruction of those assets. The PUP Tulong illustration is abstract original artwork, not an application screenshot.

Rocky: provisional hand-authored 64×64 SVG pixel study rendered at 128px. Five mineral limbs; no humanoid face. It floats within a 3px bound only when visible, unpaused and permitted by OS preference. This is not a reference-derived atlas; sprite-frame production and character fidelity review remain pending.

Interactions: native anchors, native mobile disclosure, named links, visible focus, inline mobile companion, explicit dialogue/ASCII/pause/hide controls. All core editorial content renders without JS. Media queries and reactive motion policy disable movement under reduced motion. No random speech or full-screen intro. No new runtime dependencies.

## Review gate

Obtain actual artwork, measure it using Design DNA, review fonts/crops/character fidelity, and visually verify desktop/mobile/keyboard/reduced motion before expanding. Storybook installation is pending registry access; the isolated route is a temporary review aid, not a completed Storybook integration.
