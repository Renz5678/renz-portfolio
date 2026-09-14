"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on fine-pointer devices
    const isFinePen = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePen || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show the cursors
    dot.style.display = "block";
    ring.style.display = "block";

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const lerpRing = () => {
      const ease = 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      animId = requestAnimationFrame(lerpRing);
    };
    animId = requestAnimationFrame(lerpRing);

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const targets = document.querySelectorAll(
      "a, button, article, input, [role='button']"
    );
    const onEnter = () => ring.classList.add("is-hovering");
    const onLeave = () => ring.classList.remove("is-hovering");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden"
        aria-hidden="true"
        style={{ left: "-100px", top: "-100px" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden"
        aria-hidden="true"
        style={{ left: "-100px", top: "-100px" }}
      />
    </>
  );
}
