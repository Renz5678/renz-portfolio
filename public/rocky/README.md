# Rocky runtime atlas

Source: user-provided project-root `rocky-16bit-animation-pack/rocky-16bit-assets/rocky-16bit-spritesheet.png`. Source folder is retained intact.

Runtime `rocky-atlas.webp`: original 1280×1280 dimensions and alpha channel, encoded with Sharp WebP quality 90, alpha quality 100. 457,502 bytes versus approximately 1.4MB PNG. This exceeds the preliminary 100KB sprite budget; retain fidelity for this review and revisit lower-resolution exports after browser inspection. No limbs, frames or alignment were edited. The sheet's small edge artifacts originate in the supplied artwork and remain subject to visual review.

4 columns × 4 rows; 320×320 source frames. Rows: walking, crawling, jumping, waving. Metadata and durations live in `src/components/rocky/rocky-frames.ts`. CSS displays 160px frames via a 400% background, four discrete steps and per-row offsets. No browser image decoder loop bypasses Pause/reduced motion.

Hero: static waving pose while resting, one wave on opening dialogue. Component gallery `/cosmic-preview/states`: explicit Play/Pause for all four movements. Traveling between page sections is not implemented by this asset integration.
