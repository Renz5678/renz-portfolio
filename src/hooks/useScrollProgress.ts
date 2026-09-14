"use client";

import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { RefObject } from "react";

/**
 * Returns a spring-smoothed scroll progress (0–1) for the given container ref.
 * If no ref is provided, tracks the entire page scroll.
 */
export function useScrollProgress(
  containerRef?: RefObject<HTMLElement | null>,
  options?: { offset?: any }
): { scrollYProgress: MotionValue<number>; smoothProgress: MotionValue<number> } {
  const { scrollYProgress } = useScroll(
    containerRef
      ? { target: containerRef, offset: options?.offset ?? ["start end", "end start"] }
      : {}
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { scrollYProgress, smoothProgress };
}

/**
 * Maps a scroll progress value to a CSS transform value.
 * e.g. scrollToTranslate(progress, [0, 1], ["0%", "-80%"])
 */
export function scrollToTranslate(
  progress: MotionValue<number>,
  inputRange: [number, number],
  outputRange: [string, string]
): MotionValue<string> {
  return useTransform(progress, inputRange, outputRange);
}
