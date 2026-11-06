'use client';
import { useSyncExternalStore } from 'react';
function subscribe(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  document.addEventListener('visibilitychange', callback);
  return () => {
    media.removeEventListener('change', callback);
    document.removeEventListener('visibilitychange', callback);
  };
}
const getSnapshot = () => document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerSnapshot = () => true;
export function useMotionPolicy() {
  return { staticMotion: useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) };
}
