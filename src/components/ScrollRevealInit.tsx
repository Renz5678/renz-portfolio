"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Mounts the IntersectionObserver that triggers .reveal-item → .revealed.
 * Rendered once at the page level, no DOM output.
 */
export default function ScrollRevealInit() {
  useScrollReveal();
  return null;
}
