# Cosmic portfolio implementation plan

Date: 6 November 2026
Status: ready for review; application implementation has not started.
Source: [discovery and design proposal](./PROPOSAL.md).

## Scope and decisions

Evolve the existing Next.js App Router portfolio into a continuous cosmic journey with a five-limbed mineral companion. Keep React, TypeScript, Tailwind and the installed Framer Motion dependency. Use server-rendered editorial content and narrowly scoped interactive components. Native page scrolling remains the primary navigation model.

This plan defines executable work, dependencies and acceptance criteria. Requesting this plan does not approve the visual proposal or authorize deployment. Complete discovery and design review first, then implement a representative slice and seek milestone review before expanding.

The source audit identified real code concerns, but production screenshots, visual inspection of the linked assets and runtime performance remain pending. Resolve those gaps before calling discovery complete. The proposed palette is authored, not measured from the image references.

## Delivery sequence

| Milestone | Work packages | Depends on | Reviewable result |
|---|---|---|---|
| M0: establish evidence | P01–P02 | Repository and asset/browser access | Baseline report, verified content register |
| M1: define identity | P03–P04 | M0 | Design DNA, composition, production asset sample |
| M2: build vertical slice | P05–P08 | Explicit design approval | Hero → transition → one project, Rocky idle/dialogue, stories |
| M3: complete journey | P09–P11 | Slice review | Remaining sections, companion states, factual metadata |
| M4: verify and hand off | P12–P13 | M3 | Checks, comparison report, release instructions |

## P01 — Establish safe working state and production baseline

1. Inspect `git status`, local branch, remote and current commit; retain existing proposal and unrelated edits.
2. Create `feat/cosmic-portfolio` before application edits. Git ref creation previously failed because `.git` was not writable. Resolve through supported workspace access; do not circumvent permissions or continue implementation on production `main`.
3. Read applicable `AGENTS.md` files. Before writing Next code, read the relevant installed guides in `node_modules/next/dist/docs/`, especially server/client boundaries, images, metadata and fonts.
4. Confirm runtime/package-manager versions from the environment and lockfile. Record the production host/build settings when accessible; do not assume Vercel from README text alone.
5. Restore browser access. Inspect the deployed site at 1440×900 and 390×844, plus a 320px narrow viewport. Document opening, navigation, projects, contact, resume, chatbot and hidden interactions. Compare production with local source rather than assuming parity.
6. Run baseline lint/build and inspect the production output. Record transferred JS/CSS/fonts/images, network errors, image sizing, console warnings and a consistent throttled mobile performance trace. Record conditions for reproducible before/after comparisons.

Output: `docs/redesign/BASELINE.md`, including exact commit, tool/runtime versions, screenshots or local capture references, measured values, defects and unresolved access gaps.

Acceptance: branch writable; production/source comparison documented; real measurements distinguished from targets; no baseline defect silently assigned to the redesign.

## P02 — Verify portfolio facts and preserve behavior

Inspect `src/data/portfolio.ts`, `src/data/chatbot-intents.ts`, section copy and existing resume/contact links. Resolve named project repositories through authorized GitHub access and confirm actual purpose, stack, contribution and available media.

Create `docs/redesign/CONTENT_REGISTER.md` with one row per claim/link: current value, evidence, proposed value, verification status. Flag future Flyrank dates, NetForge/ADA descriptions, roles, achievements and all generic profile URLs. Repository contents establish project behavior; personal ownership and work dates may still need the user's confirmation. Keep unresolved claims pending rather than inventing replacements.

Inventory session boot, matrix wipes, custom cursor, Easter eggs and chatbot actions. Record what each does and its replacement or preservation decision. Reuse chatbot intent/classifier behavior behind an explicit control; Rocky's scripted contextual dialogue is a separate UI and must not imply an AI service.

Acceptance: one featured project has verified copy and actual links; uncertain claims are visible in the register; all existing useful navigation/contact/resume/chat behavior has a destination in the redesign.

## P03 — Complete Design DNA and approve the visual specification

Obtain viewable pixels for both linked concepts and the intended mood board. Inspect transparency, resolution, crop behavior and the five-limb silhouette. Follow Design DNA's current schema and deterministic color measurement instructions; retain per-reference measurements and provenance. Check its instructions before running source scripts or installing tools.

Create:

- `docs/redesign/reference-analysis.md`: source identity, visual observations, measurements, conflicts and original interpretation.
- `docs/redesign/design-dna.json`: populated design system, style and visual-effects dimensions using the upstream schema. Explicitly distinguish measured source values from authored semantic choices.
- `DESIGN.md`: reviewed semantic tokens, typography roles, spacing, composition, accessibility, image and motion rules. This becomes implementation's visual source of truth after approval.

Resolve the preliminary seven-color palette and Newsreader heading proposal against actual artwork. Choose font files, weights and fallbacks after checking license and availability. Keep body text comfortably readable and avoid a pixel font for prose. Specify desktop/mobile hero crops and a real featured-project layout. Review actual palette swatches and typography/art composition before coding the slice.

Acceptance: user approves composition, palette, type voice, Rocky silhouette and featured-project choice; no reference described as inspected or measured without evidence. Propagate later approved token changes to both spec and JSON.

## P04 — Prepare production artwork

Proposed paths:

- `public/images/cosmic/`: optimized desktop/mobile horizon variants and optional separate foreground.
- `public/images/projects/<project-id>/`: real product images, useful responsive widths.
- `public/rocky/`: transparent sprite atlas and matching frame manifest.
- `src/components/rocky/rocky-frames.ts`: typed atlas/frame definitions if importing JSON is unsuitable.

First create one static Rocky pose and idle frames at a proposed 64×64 logical canvas; assess five-limb recognition and mineral shading at actual 2×/3× rendering sizes. Keep all frames aligned to a consistent origin with transparent padding for limb movement. After sample approval, add communication frames. Additional states follow the slice review.

Concept stills must not be treated as ready-made sprite sheets. Prepare or commission a deliberate atlas; inspect every frame for limb count, silhouette continuity and background remnants. Include an equivalent static pose for reduced-motion/failed-load handling. Keep source artwork distinct from optimized runtime exports.

Acceptance: approved static/idle sample, matching atlas coordinates, crisp integer scaling, useful mobile crop, dimensions/alt-text decisions and asset license/provenance recorded. Initial targets: desktop hero <=250KB, mobile <=150KB, atlas <=100KB; document quality tradeoffs if targets cannot be met.

## P05 — Build semantic foundations and motion policy

Modify `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/fonts.ts` and `src/app/page.tsx` only after P03 approval.

- Translate approved tokens into Tailwind/CSS variables; replace legacy aliases incrementally so remaining sections stay readable.
- Put hero and content within one `main`; add a visible-on-focus skip link, one descriptive h1 and coherent heading hierarchy.
- Remove forced lowercase formatting; use natural names and casing.
- Make content visible in server HTML and when JavaScript fails. Replace default-hidden reveal behavior.
- Add consistent visible focus styles, comfortable touch targets and anchor scroll margins.
- Implement `src/hooks/useMotionPolicy.ts` for reactive reduced-motion preference, document visibility and explicit animation pause. Start with a static server-compatible state to avoid hydration mismatch.
- Keep scrolling native; smooth behavior obeys reduced-motion preferences. Do not add a scroll engine.

Acceptance: page reads without JS; no hydration warnings; preference changes take effect without reload; typography and background fallback stay legible before images/fonts load.

## P06 — Implement accessible navigation

Refactor existing `src/components/layout/Nav.tsx` and retain existing section IDs (`unveil`, `about`, `works`, `capabilities`, `trajectory`, `honors`, `contact`) where practical.

Use actual anchor links and a home link. Mobile uses a disclosure button with accessible name, `aria-expanded` and `aria-controls`. Prefer a nonmodal disclosure with natural tab order; Escape closes it and returns focus to the trigger. Close on selection. Keep resume/contact reachable at small widths and avoid requiring JS for basic destination access.

Remove navigation's matrix-wipe dispatch and delayed scrolling when connecting the new experience. Active-section state may reuse `useActiveSection`; it must not change focus during scrolling. The header must avoid covering targets, content or Rocky.

Acceptance: keyboard-only and touch journeys reach every destination, focus is visible, URL fragments work directly/back/forward, and the 320px layout has no horizontal page overflow.

## P07 — Implement the representative slice

Refactor `src/components/sections/Hero.tsx` with `src/components/cosmic/AtmosphereLayers.tsx` and a small client motion layer only where necessary. The hero text and links render immediately. Use optimized responsive artwork with reserved dimensions, a solid fallback and decorative alt handling. Use installed Next image guidance for loading priority; avoid lazy-loading the hero's LCP image.

Replace the 160vh hero pinning with a content-safe opening based on stable viewport sizing. Introduce one bounded depth transition toward About/work; disable parallax on mobile and under reduced motion. Avoid full-screen visual loading gates.

Refactor `src/components/sections/Projects.tsx` to remove 500vh horizontal travel. Add `src/components/projects/ProjectFeature.tsx` receiving explicit verified data and real imagery. Render problem, motivation, contribution, technologies and real repo/demo anchors. Missing demos are omitted; failed media leaves a readable project presentation.

Retire `PingIntro`, `MatrixWipe` and `CustomCursor` from the page composition as their replacements land. Remove unused implementations only after the behavior inventory confirms the decision.

Acceptance: hero → meaningful scroll transition → one project works at desktop/mobile widths, without JS and under reduced motion; no action is gated by animation; project links work by keyboard.

## P08 — Implement Rocky idle/dialogue and minimal Storybook

Create `src/components/rocky/RockyCompanion.tsx`, `RockySprite.tsx`, `RockyDialogue.tsx`, `rocky-machine.ts` and `useRockyMachine.ts`.

Use a typed reducer for explicit events and deterministic transitions. Separate rendering, event handling, placement and motion policy. Initial states: idle, communicating and resting. Store only essential state; avoid driving every sprite frame through React. Register observers/listeners once and clean up timers, animation frames and callbacks. Pause while hidden/offscreen.

Place desktop Rocky within a reserved stage beside content. Use inline stages on mobile. Never position dialogue over links or reading columns. An intentional button opens dialogue; Escape/dismiss closes it with appropriate focus restoration. Expose pause/hide controls without hover dependence. Do not move focus automatically on section changes.

Add Storybook after checking current Node/React/Next peer compatibility. Use `@storybook/nextjs-vite` and compatible pinned dev dependencies; install only needed accessibility/interaction tooling. Proposed files: `.storybook/main.ts`, `.storybook/preview.tsx`, colocated `*.stories.tsx`, package scripts and lockfile updates. Import shared styles and handle fonts explicitly. Storybook must not enter the production route.

Initial stories: Rocky idle/resting/dialogue, long dialogue/mobile, pause/reduced motion, nav open/closed, project media loading/error/no-demo, and action focus states. Freeze clocks and motion for visual comparisons. Implement meaningful checks for menu keyboard behavior, dialogue dismissal and pause policy.

Acceptance: slice review includes real desktop/mobile renders, reduced-motion demonstration and working isolated stories. User reviews this milestone before M3.

## P09 — Expand verified content across the journey

Following slice approval, evolve `About.tsx`, `TechStack.tsx`, `Experience.tsx`, `AchievementsEducation.tsx`, `Contact.tsx` and `Footer.tsx`.

Add `ProjectRow.tsx` for subsequent projects with alternating editorial emphasis while retaining a logical DOM order. Use one feature and quieter entries rather than identical oversized cards. Extend `src/data/portfolio.ts` with typed project fields established in P02. Keep technical experience tied to demonstrated work in three concise capability narratives. Experience, leadership, achievements and education remain readable and reachable.

Restyle the chatbot entry/panel to match tokens and keep its existing classifier/intent flow. Coordinate its placement with Rocky: opening chat hides or parks Rocky, and closing chat restores the previous quiet state. Audit chatbot factual answers alongside portfolio copy. Keep resume, email and social links explicit and professional.

Acceptance: every verified project has evidence and contribution; no placeholder profile links masquerade as project repositories; all retained content and useful behavior are accounted for.

## P10 — Expand Rocky's contextual states

Add curious, traveling, excited and ASCII states after the slice establishes a successful silhouette and interaction model. Extend atlas and deterministic stories accordingly.

| Trigger | Behavior | Constraint |
|---|---|---|
| Active section changes | Travel toward the new reserved stage | Newest target wins; maximum 500ms transition |
| Featured project becomes active | One curious pose, then rest | No repeated response from observer jitter |
| Intentional Rocky activation | Short contextual dialogue | No random speech or focus stealing |
| Confirmed interaction succeeds | One excited reaction | Do not react before a failed action completes |
| User requests transformation | Brief ASCII form then quiet state | Stable glyph layout; accessible equivalent name |
| Pause/reduced motion/hidden tab | Static resting pose | Cancel obsolete timers and queued reactions |

Priority: pause/hidden/reduced motion > intentional dialogue > travel > contextual pose > idle. Dialogues use an explicit context-to-copy map in `src/data/rocky-dialogue.ts`. Do not equate hide with reduced motion: hiding removes the companion, while reduced motion retains its usable static control. Mobile transitions between inline stages without flying across content.

Acceptance: no overlaps at target widths/zoom; no timer leaks on navigation/unmount; pause and preference changes interrupt active sequences; every state has a deterministic story and critical transitions have behavioral checks.

## P11 — Finish SEO, images and dependency cleanup

Align name, description, social previews and structured data in `layout.tsx` and `portfolio.ts` with verified identity. Confirm production site URL and preserve working `robots.ts`/`sitemap.ts`. Add original share artwork at the configured path or use the installed framework's supported metadata image convention.

Remove unused imports/dead visual code, font variants and legacy CSS after all sections migrate. Review assets for dimensions, responsive sizes and correct loading order. Retain header/proxy behavior unless a separately evidenced issue requires a scoped fix; do not mix a broad security rewrite into this redesign.

Acceptance: no missing OG image, localhost URLs in production metadata, conflicting identity or missing static assets; chatbot and navigation links remain valid; dependency changes are justified and recorded.

## P12 — Verify against explicit criteria

Use focused checks during each milestone, then one complete release pass. Existing scripts: `npm run lint`, `npm run build`. Add named Storybook build/test scripts only for tooling actually installed. Browser testing may require dev-only Playwright tooling if no capable existing runner is available; choose one runner rather than duplicate stacks.

| Area | Required checks |
|---|---|
| Layout | 320, 390, 768 and 1440px widths; 200% zoom; long headings/dialogue; no obscured controls or horizontal page overflow |
| Navigation | Keyboard tab order, skip link, menu Escape/focus return, direct fragments, browser back/forward, resume/contact/social/project links |
| Motion | OS preference enabled before load and changed while running; explicit pause/hide; hidden-tab suspension; no content gated by JS |
| Rocky | State priorities, latest section wins, interrupted timers, ASCII return, chat coexistence, mobile stage placement |
| Accessibility | Semantic landmarks/headings/names, focus visibility, touch targets, contrast on composited artwork, meaningful alt text, automated accessibility scan plus manual review |
| Robustness | JS disabled, images unavailable/loading, slow fonts/network, missing optional demo/media, reload and return visits |
| Performance | Same baseline device/throttling; production assets and JS comparison, long tasks, scrolling trace, LCP/CLS; report lab results with conditions |
| SEO | Valid production origin, share image, metadata/schema/sitemap/robots, HTTP status for linked assets |

Targets: LCP <=2.5s, CLS <=0.1; INP <=200ms where real field measurements exist. Do not label a lab run as field INP. Initial visual assets <=500KB, hero <=250KB desktop/150KB mobile, atlas <=100KB. Aim for smooth desktop scrolling on modest hardware; reduce decorative animation when traces show sustained dropped frames. Determine an allowed JS increase from the measured baseline before expansion; Storybook adds no production JS.

Output: `docs/redesign/VERIFICATION.md`, with pass/fail, conditions, before/after measurements, remaining issues and actual commands. Do not report planned checks as executed.

## P13 — Deliver reviewable changes and release instructions

Use small commits grouped around complete milestones, for example:

1. `docs: record redesign baseline and verified content`
2. `docs: define approved cosmic design system`
3. `feat: add accessible portfolio foundations and navigation`
4. `feat: build cosmic hero and featured project`
5. `feat: add Rocky companion and component stories`
6. `feat: complete portfolio journey and contextual Rocky states`
7. `fix: finalize accessibility performance and social metadata`

Commit grouping may follow actual dependencies; each application commit must build. Preserve the pre-redesign commit for rollback. Never revert unrelated user changes.

Final handoff includes changed files, added dependencies and reasons, screenshots, executed checks, performance comparison, unresolved content decisions and deployment steps. Push/PR only through the authorized workflow; request explicit approval for merge/deployment.

Deployment checklist: confirm actual host/runtime, install lockfile dependencies, set `NEXT_PUBLIC_SITE_URL`, run production build, inspect an authorized preview, and verify metadata/links/resume/companion on the deployed result after release approval. If regression occurs, roll back through the host's supported release history or revert the scoped redesign commits on a corrective branch.

## Immediate next actions

1. Review the direction in `PROPOSAL.md` and approve the M1 design choices.
2. Resolve Git ref-write access and restore browser/source-asset inspection for M0.
3. Confirm the featured project's facts and links from available repository evidence.
4. Complete the measured specification and asset sample, then implement M2 after design approval.

Planning documents can be reviewed now. Application implementation, installs, commits, pushes and deployment have not been performed by this plan.
