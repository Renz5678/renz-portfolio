"use client";

import { useEffect, useRef, useCallback } from "react";

export function useScrollReveal() {
  const hasReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    const items = document.querySelectorAll(".reveal-item");

    // If reduced motion, reveal everything immediately
    if (hasReducedMotion) {
      items.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hasReducedMotion]);
}

export function useCountUp(
  target: number,
  duration = 1500,
  enabled = true
): React.MutableRefObject<HTMLSpanElement | null> {
  const ref = useRef<HTMLSpanElement | null>(null);

  const animate = useCallback(() => {
    if (!ref.current || !enabled) {
      if (ref.current) ref.current.textContent = `${target}+`;
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      if (ref.current) {
        ref.current.textContent = `${current}+`;
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration, enabled]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return ref;
}
