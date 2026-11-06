/** Row order and frame durations from the supplied animation pack README. */
export const rockyAnimations = {
  walking: { row: 0, frameMs: 130 },
  crawling: { row: 1, frameMs: 165 },
  jumping: { row: 2, frameMs: 215 },
  waving: { row: 3, frameMs: 260 },
} as const;
export type RockyAnimation = keyof typeof rockyAnimations;
export const rockyAtlas = { src: '/rocky/rocky-atlas.webp', columns: 4, rows: 4, frameWidth: 320, frameHeight: 320 } as const;
