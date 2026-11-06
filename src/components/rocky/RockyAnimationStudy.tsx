'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionPolicy } from '@/hooks/useMotionPolicy';
import RockySprite from './RockySprite';
import { rockyAnimations, type RockyAnimation } from './rocky-frames';

export default function RockyAnimationStudy({ animation }: { animation: RockyAnimation }) {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { staticMotion } = useMotionPolicy();
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <article ref={ref} className="rocky-animation-study">
    <h2>{animation}</h2>
    <div className="rocky-perch"><RockySprite animation={animation} animated={playing} resting={staticMotion || !visible} loop /></div>
    <button className="cosmic-quiet-button" aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'} {animation}</button>
    <p>{rockyAnimations[animation].frameMs} ms/frame · 4 frames</p>
    {staticMotion && <p>Static pose: reduced motion or inactive tab.</p>}
  </article>;
}
