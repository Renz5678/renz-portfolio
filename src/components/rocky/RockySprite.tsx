import type { CSSProperties } from 'react';
import { rockyAnimations, rockyAtlas, type RockyAnimation } from './rocky-frames';

type SpriteStyle = CSSProperties & { '--rocky-row': number; '--rocky-duration': string };
export default function RockySprite({ resting = false, animation = 'waving', animated = false, loop = false }: {
  resting?: boolean;
  animation?: RockyAnimation;
  animated?: boolean;
  loop?: boolean;
}) {
  const clip = rockyAnimations[animation];
  const style: SpriteStyle = {
    '--rocky-row': clip.row,
    '--rocky-duration': `${clip.frameMs * rockyAtlas.columns}ms`,
    backgroundImage: `url("${rockyAtlas.src}")`,
  };
  return <span className="rocky-sprite" aria-hidden="true" style={style} data-playing={animated && !resting} data-loop={loop} />;
}
