# Rocky — 16-bit animation pack

Four transparent, looping 16-bit-style Rocky animations inspired by the three supplied references. Pixel-art assets for a cosmic / Project Hail Mary-inspired portfolio.

## Files

- `rocky-walking.webp`, `rocky-crawling.webp`, `rocky-jumping.webp`, `rocky-waving.webp` — animated transparent WebP, optimized for a website.
- Matching `.png` files — animated PNG (APNG), for lossless alpha.
- Matching `.gif` files — compatibility previews (limited transparency/palette).
- `rocky-16bit-spritesheet.png` — 4 columns × 4 rows, 1280 × 1280, each frame 320 × 320.
- `frames/` — 16 separate transparent PNG frames, four per animation.
- `preview.html` — local browser preview with all four looping animations.
- `original-generated-sheet.png` — unprocessed image-generation source.

Sprite sheet row order: walking, crawling, jumping, waving. Frames progress left to right. Keep `image-rendering: pixelated` to preserve the retro pixel edges when displayed at a scaled size.

## Usage in React / Next.js

Put the WebP files under `public/rocky/`, then:

```jsx
<img src="/rocky/rocky-waving.webp" alt="Rocky waving" width={160} height={160} style={{ imageRendering: 'pixelated' }} />
```

For dynamic selection, change the URL according to the current scroll or interaction state. Use CSS `prefers-reduced-motion` to show a static first-frame PNG to visitors who prefer less animation.

## Timing

Walking: 130 ms/frame · Crawling: 165 ms/frame · Jumping: 215 ms/frame · Waving: 260 ms/frame. Each animation loops infinitely. These are illustrated keyframe loops, not physically simulated skeletal animations.
