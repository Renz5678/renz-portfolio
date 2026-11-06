# Cosmic portfolio — discovery and design proposal

Status: DRAFT FOR REVIEW · 6 November 2026. Implementation approval pending.

## Evidence and limits

Inspected local repository `Renz5678/renz-portfolio`, HEAD `c2c692e`, on `main`, matching the locally recorded `origin/main`. Working tree was clean. No remote fetch succeeded or was assumed; deployment parity is unverified. Browser access failed with a session error; the web reader could not load the deployed URL and shell DNS resolution failed. Desktop/mobile screenshots, runtime accessibility, actual links, and performance measurements are therefore pending. This is a source audit, not a completed visual audit of production.

Library resolved both linked concepts: cosmic background 1672×941, 1,729,221 bytes; Rocky 1536×1024, 1,311,314 bytes. The read returned descriptions and image pointers rather than viewable pixels in this environment. Those descriptions indicate a wide dark sky with a low colorful cloud horizon and a five-limbed brown mineral form on black. Pixel inspection, deterministic color measurement, transparency, crop suitability and sprite readiness remain unverified. The spacecraft reference embedded in the request is visually available: a steep foreground structure and tiny human silhouette establish scale beneath organic green/amber turbulence. No full mood-board file was supplied in this turn; do not claim it was analyzed.

Reviewed Design DNA's public skill instructions and Storybook's Next.js Vite documentation. Design DNA separates measurable design system, qualitative style and visual effects. Its image workflow requires measured colors. Consequently the tokens below are authored proposals, not sampled reference colors or a completed extraction. Finish extraction after source pixels are accessible, record each source's measurement separately, then reconcile rather than silently replacing the approved palette.

## 1. Repository audit

Framework: Next.js 16.3.5 App Router, React/React DOM 19.2.8, TypeScript 5.9.3, Tailwind 4.3.3, Framer Motion 13.2.0. npm lockfile present. `dev`, `build`, `start`, `lint` scripts; no Storybook or automated test scripts. Read the installed Next server/client guide before proposing component boundaries.

| Priority | Evidence | Consequence and proposed response |
|---|---|---|
| High | `src/components/sections/Projects.tsx`: clickable `motion.article` uses `window.open`, no link or keyboard equivalent | Replace with ordinary named project links; keep whole presentation semantic and selectable. |
| High | `Nav.tsx`: nav hidden below `md`, resume hidden below `sm`; no mobile menu | Persistent compact mobile navigation with accessible disclosure, Escape handling and focus restoration. |
| High | `globals.css`: `#525a62` and `#353d45` on `#080a0c` | Calculated contrast 2.83:1 and 1.80:1; unsuitable for normal informational text. Increase text contrast and check final composited backgrounds. |
| High | `Projects.tsx`: 500vh sticky horizontal track, translation remains bound to Motion values | Large scrolling cost and dependence on motion/hydration; replace with vertical editorial projects, including reduced-motion and no-JS reading order. |
| High | `portfolio.ts`: Flyrank starts February 2027 and is marked present | Future relative to this review date. Confirm dates/status before publishing; preserve source facts pending confirmation. |
| High | All five project URLs point to the GitHub profile | Visitors cannot reach individual repositories. Resolve actual repository/demo URLs; don't invent destinations. |
| Medium | NetForge described as chat; ADA described as code-review tooling | Conflicts with project context supplied previously. Confirm from actual repositories before rewriting copy. Verify all roles, dates and technology lists, including PUP Tulong. |
| Medium | `layout.tsx` references `/og-image.png`, absent from `public` | Add original share artwork and verify deployed response. Metadata alternates renz/scarecrow and full-stack/backend AI descriptions. Establish one accurate identity. |
| Medium | `portfolio.ts`: URL fallback localhost; `.env.example` placeholder | Verify production `NEXT_PUBLIC_SITE_URL=https://www.renzgarcia.site`, canonical, sitemap and social metadata. Deployment env is not visible. |
| Medium | `PingIntro.tsx` full-screen session boot sequence; `MatrixWipe.tsx` intercepts input during nav transitions; nav delays scrolling by 200ms | Opening and navigation pacing compete with content. Replace boot gate and wipes with an immediately readable opening and native anchors. Keep necessary behavior available. |
| Medium | CSS reduced-motion override exists, but Hero/Projects use JS scroll transforms and Nav explicitly requests smooth scrolling | CSS alone does not disable Motion values or explicit JS behavior. Use one reactive motion preference for both rendering and scrolling. |
| Medium | `.reveal-item` defaults invisible until observer adds class | Content can disappear without script. Make content visible by default and opt into enhancements after initialization. |
| Medium | `Nav.tsx`: logo is clickable div; hero is outside main; global lowercase transform | Use real home link, one main including hero, meaningful heading order, natural names/case and skip link. |
| Medium | `ParticleField.tsx`: uncapped device pixel ratio, pairwise connections and new gradients each frame | Performance risk if reused; no measured FPS claim. Use static layered artwork first, bounded animation and visibility suspension. |
| Low | Three preloaded font families with many weights/styles; cursor updates left/top; numerous animated client sections | Reduce font variants and isolate client islands; measure production bundle before setting a regression threshold. |

Reusable: typed content module, contact links, resume PDF, section identities, active-section observer concept, existing Motion dependency, reduced-motion CSS foundation, robots/sitemap, and header configuration. Keep resume, contact, education, achievements and experience reachable. Retain chatbot capability through an optional explicit control; avoid two competing floating companions. Audit chatbot facts with the main content. Hidden interactions need a behavior inventory before any retirement.

Deployment: README describes generic Next/Vercel workflow; no dedicated deployment or CI configuration discovered in the inspected file listing. Current `next.config.ts` defines CSP and security headers. Proxy blocks several scripted user agents, which may complicate monitoring; it does not establish effective bot authentication. Do not attribute the browser failure to this proxy without evidence. Assets should be same-origin. No dependency vulnerability or deployment readiness assessment has been performed.

## 2. Proposed art direction

Working direction: **A small light, a long way from home.** A dark editorial portfolio with moments of discovery. Rocky supplies warmth. The artwork supplies scale. Straightforward project writing supplies credibility.

The opening uses roughly two-thirds empty sky with a low, off-center teal horizon and a distant amber star. Lawrenz Garcia appears toward the left in large editorial type, with one short factual introduction and visible Work / Contact links. Rocky occupies a small ledge to the lower right. The hero is readable immediately; no loading sequence blocks it. Native scrolling reveals the next section without a forced full-screen pause.

The supplied spacecraft artwork contributes its foreground/midground/background scale relationship and sparse warm highlights. Avoid copying the spacecraft, its composition exactly, or applying its dense turbulence behind text. Maintain the references' tension between isolation and warmth. The cosmic concept's purple/pink, if present on visual inspection, should stay localized and subordinate to teal/blue. No image should be tiled into a generic glowing backdrop.

| Token | Proposed value | Role |
|---|---|---|
| Void | `#060A10` | Main reading background |
| Deep blue | `#101F30` | Distant atmosphere |
| Teal | `#285459` | Nebula and environmental art |
| Primary ink | `#E9E5DB` | Headings and body text |
| Secondary ink | `#A8B8BC` | Informative secondary copy |
| Amber | `#DDB87A` | Focus, small highlights and selected actions |
| Quiet divider | `#35444B` | Sparse decorative separators only |

These are proposed semantic colors, not measured reference hexes. Text must meet 4.5:1, large text 3:1, and essential controls/focus indicators 3:1 against adjacent colors. Never rely on a divider or nebula color as text. Apply an opaque quiet reading region where artwork affects contrast.

Typography proposal: Newsreader for editorial headings, a system humanist sans stack for body, existing JetBrains Mono for code and technical annotations. Verify Newsreader availability/license before adding self-hosted WOFF2; retain existing body fonts until typography review. Test a restrained serif treatment against the sprite art. Display 48–112px fluid, section headings 32–56px, body 16–18px with 1.65 line height, annotations at least 12px. Use natural capitalization. One display voice and at most two loaded families; no pixel font for prose.

Spacing: 4/8/12/16/24/32/48/64/96/144px scale. Reading measure 60–68ch; page max 1280px. Desktop 12-column alignment; text often 5 columns beside 6-column artwork with a breathing column. Mobile one column, 20px gutters, sections 64–88px apart. Desktop sections 112–160px apart. Keep scenic empty space concentrated around the opening and transitions, not between every paragraph.

Shapes/effects: primarily unboxed content, simple hairlines where grouping requires them, modest corner radius on media only. Artwork may use dithering; text stays sharp. No full-screen noise overlay, blurred fixed sheets, glowing border system or cursor replacement. One atmospheric hero transition; subsequent sections settle into reading. No mandatory horizontal scrolling or scroll snapping.

### Journey and component specifications

| Scene | Composition and content | Interaction |
|---|---|---|
| Opening | Name, concise factual line, two links; low horizon and small Rocky | Optional bounded parallax, Rocky idle/hello; immediate content |
| About | 2–3 short paragraphs with personal building interests and actual experience | Quiet reading; Rocky rests at a reserved margin |
| Work | One featured project with large real product image; subsequent projects alternate image/text emphasis | Named repository/demo links, keyboard focus equivalent to hover |
| Capabilities | Three compact narratives: interfaces, services/data, delivery; each references verified work | Text links back to evidence; no badge wall |
| Experience/education | Compact chronological entries including existing factual material after verification | Ordinary readable list, no animated timeline gate |
| Contact | Simple invitation, email, GitHub, LinkedIn and resume | Native links; optional explicit chatbot entry |

Each project includes problem, motivation, personal contribution, implementation and actual links. Draft data fields: `id`, `title`, `problem`, `motivation`, `contribution`, `technologies`, `media`, `repoUrl`, optional `demoUrl`. Do not infer individual ownership from repository existence. Start with one project whose facts can be confirmed; PUP Tulong is a candidate, not pre-approved copy.

Suggested introductory copy for review: “I'm Lawrenz, a computer science student at PUP. I build web and mobile tools, and I like figuring out what makes them work.” Confirm the voice before using it. Keep any availability claim separately verifiable.

## 3. Component and animation architecture

Keep App Router and current dependencies. Page, editorial text and project content remain server-rendered. Small client islands handle menu state, section observation, Rocky and atmospheric transforms. Pure presentation components receive explicit props so Storybook can render them without a live page.

Proposed modules: `CosmicHero`, `AtmosphereLayers`, `ProjectFeature`, `ProjectRow`, `Capabilities`, `JourneyNav`, `ContactInvitation`; `RockyCompanion`, `RockySprite`, `RockyDialogue`, `useRockyMachine`, `useMotionPolicy`. Use native anchors with scroll margins. Avoid moving the whole app behind a client provider.

Rocky is a non-humanoid five-limbed mineral silhouette, neutral warm rock shading and no invented human face. Concept art is not an animation atlas: produce transparent, aligned frames after reference inspection. Proposed 64×64 logical canvas, integer 2×/3× display scales, 6–8fps deliberate sprite playback, 4–8 frames per loop as needed. Verify readability at actual display size before expanding states. Use nearest-neighbor rendering. Atlas metadata records frame names, dimensions, origin and state transitions. No animation library needed beyond existing Motion and CSS steps.

| Event/condition | Next state | Exit rule |
|---|---|---|
| Hero visible, no stronger event | idle | Section or intentional interaction |
| Active section changes during scrolling | traveling | Settle within 500ms; newest target wins |
| Project enters active reading zone | curious | One short pose, then resting |
| User activates Rocky | communicating | Dismiss, Escape or focus leaves dialogue |
| Meaningful completed action, e.g. successful copy | excited | One short reaction, then resting |
| Reading pauses / dialogue dismissed | resting | Next meaningful event |
| User requests ASCII | ascii | Brief explicit transformation, then previous quiet state |
| Hidden tab, reduced motion or pause | resting/static | Resume according to policy, not old queued timers |

Priority: user pause / hidden / reduced-motion > active intentional dialogue > travel > contextual pose > idle. Cancel obsolete timers and discard queued section reactions. No random speech. Initial welcome is optional and shown once; other dialogue follows intentional activation. No unsolicited live-region narration. ASCII form is a stable preformatted silhouette hidden from assistive technology with an equivalent accessible character name; state does not expose meaningless glyphs.

Desktop: companion resides in reserved stage regions outside reading columns. A small explicit button offers dialogue, pause/hide and optional transformation. Mobile: inline scene anchors, no persistent floating travel across text or bottom safe area. Keep controls at least 44×44 CSS px; visual sprite may be smaller. Chat and Rocky share a single interaction policy so neither overlaps the other.

Motion: native browser scroll; 120–180ms control feedback; 300–500ms section/pose transition; ease-out `cubic-bezier(0.22,1,0.36,1)`. No spring overshoot. Atmospheric travel bounded to about 24px desktop, disabled mobile by default. Idle movement stays within 2–3px, has a pause control and stops offscreen. Reduced motion means static art, no parallax/travel/sprite loops, instant anchor navigation, and dialogue still available. Reactively observe preference changes. Content remains visible without JS and failed artwork has a solid background.

Storybook fits this architecture: official documentation recommends `@storybook/nextjs-vite` for Next apps. Introduce it only with the prototype, with matching pinned dev dependency versions and supported Node/peer ranges checked at installation time. Keep it outside the production route and bundle. Initial stories: all Rocky states, ASCII, pause/reduced motion, narrow/long dialogue, mobile nav open/closed, project with/without media/demo, button hover/focus/disabled, and artwork loading/error. Freeze clocks, random seeds and animation for screenshots. Add useful keyboard/transition interaction assertions and accessibility addon checks; avoid a paid visual service requirement. Browser-level scroll/collision checks remain necessary beyond component stories.

## 4. Minimal phased plan and review gates

1. **Complete discovery prerequisites.** Restore browser/asset access; capture 1440×900 desktop and 390×844 mobile, plus 320px narrow width. Inventory all links/chat/easter eggs and confirm content against actual project repos. Measure current production bundle and runtime performance. Finish Design DNA image color measurement and source provenance. Exit: evidence gaps documented or resolved.
2. **Approve direction.** Review this composition, proposed palette, heading voice, Rocky treatment and confirmed featured project. Freeze `DESIGN.md` / token JSON as visual source of truth after review. Exit: explicit user design approval.
3. **Vertical slice.** Hero, static-to-idle Rocky, explicit dialogue, one scroll transition and one verified project, with mobile and reduced-motion versions. Integrate minimal Storybook stories here. Exit: review real desktop/mobile stills and interaction; approve before expansion.
4. **Expand incrementally.** About, remaining projects, capabilities, factual experience/education, contact; preserve resume/contact/chat functionality and required links. Commit separately by coherent milestone. Exit: each section follows approved spec, content confirmation complete.
5. **Verify.** Production build/lint; component interaction/accessibility checks; real keyboard and touch journeys; no-JS and asset-error fallback; preference changes; zoom to 200%; 320/390/768/1440 widths. Test anchors, menu Escape/focus return, Rocky pause/hide and collisions, reduced motion, resume/social/repo/demo links and share metadata. Exit: named failures resolved or explicitly accepted.
6. **Deliver for release approval.** Summarize files, dependencies, tests, before/after measurements and remaining limits. PR on feature branch after authorized push. Merge/deploy only on explicit approval. Deployment: install from npm lockfile, set production site URL, run build/start or existing verified host build flow; smoke-check preview then production after release authorization. Existing host/provider configuration must first be confirmed.

## 5. Risks, budgets and dependencies

| Risk | Mitigation / acceptance |
|---|---|
| Inaccessible live site and source pixels | Do not call source audit a production audit or mark palette extraction complete. Resolve before visual implementation validation. |
| Concept is large still artwork, not production sprite | Prepare transparent sprites, independent layers and responsive background crops; inspect final result before animating. |
| Content credibility | Resolve future dates, project claims, repo URLs, roles and chatbot data before publishing. |
| Rocky obstructs reading | Reserved stages; inline mobile mode; test long dialogue, keyboard zoom and all viewport widths. |
| Background costs and modest hardware | Target hero image <=250KB desktop / <=150KB mobile, sprite atlas <=100KB, initial visual assets <=500KB. Targets subject to measured quality, not reported results. |
| Animation workload | CSS transforms/opacity; no WebGL requirement; suspend hidden/offscreen; cap any Canvas DPR at 1.5–2 and avoid pairwise particle effects. |
| Bundle growth | Reuse installed Motion; Storybook dev-only; measure production baseline and agree a JS delta before expansion. No added scroll engine, state machine package or 3D runtime proposed. |
| Hydration / preference mismatch | Server HTML visible by default, browser-dependent effects after mount, static initial character. |
| Integration/tool versions | Check Storybook Node and peer compatibility with installed Next/React; verify Tailwind styles and next/font handling in stories. |
| Social art/asset availability | Create original share art, use same-origin assets within CSP, test fallback and image sizing. |

Performance acceptance targets: LCP <=2.5s, CLS <=0.1 and INP <=200ms at the 75th percentile where field data exists. Lab mobile throttling is a diagnostic, not a substitute for field INP. Record long tasks and dropped frames on modest hardware; aim for smooth 60fps desktop and stable mobile scrolling with decorative movement disabled as needed. No current Lighthouse, FPS, bundle or Core Web Vitals score has been measured.

Expected additions after approval: Storybook framework and accessibility/testing dev tooling; original optimized background crops, sprite atlas/metadata, real project screenshots, possibly a self-hosted display font. No application dependencies added during this proposal.

## Workflow status

Attempted `feat/cosmic-portfolio`; managed filesystem denied writing `.git/refs/heads`. Remain on `main`; only proposal documentation is written to the working tree, with no application changes, commit, push, merge or deployment. Create the feature branch once Git write access is available, before implementation.

## References

- https://github.com/zanwei/design-dna/blob/main/SKILL.md
- https://storybook.js.org/docs/get-started/frameworks/nextjs-vite
- Installed Next.js guide: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- User supplied concept IDs: `libfile_3da001e6942c8191bb4348eff4747bf8`, `libfile_1c83f9c36c4c8191a35b124285dcd28e`
