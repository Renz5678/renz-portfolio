'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionPolicy } from '@/hooks/useMotionPolicy';
export default function Atmosphere() {
  const stage = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { staticMotion } = useMotionPolicy();
  useEffect(() => {
    if (!stage.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={stage} className="cosmic-atmosphere" data-drifting={visible && !staticMotion} aria-hidden="true">
    <div className="cosmic-galaxy-drift"><div className="cosmic-galaxy-spin" /></div>
    <svg className="cosmic-stars" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 76 }, (_, i) => <rect key={i} x={(i * 293 + 71) % 1440} y={(i * 137 + 49) % 900} width={i % 9 === 0 ? 2 : 1} height={i % 9 === 0 ? 2 : 1} fill={i % 9 === 0 ? '#ddbd87' : '#b4c7cd'} opacity={0.2 + (i % 5) * 0.12} />)}
    </svg>
    <div className="cosmic-distant-light" /><div className="cosmic-nebula" /><div className="cosmic-horizon" /><div className="cosmic-dither" />
  </div>;
}
