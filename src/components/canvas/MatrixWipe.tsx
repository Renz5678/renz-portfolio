"use client";

/**
 * MatrixWipe.tsx
 *
 * A section-transition overlay triggered by the custom DOM event "matrix-wipe".
 * When fired, a white Matrix rain sweeps the full screen for ~400 ms then
 * fades out, giving nav clicks a cinematic wipe feel.
 *
 * Wipe timeline:
 *   0 ms   — overlay appears (opacity 0 → 1 in 80 ms), rain starts
 *   400 ms — peak: rain is dense, scroll has already happened underneath
 *   700 ms — rain dissolves column-by-column
 *   1000 ms — overlay is gone, component idles
 *
 * Dispatch the wipe from anywhere:
 *   window.dispatchEvent(new CustomEvent("matrix-wipe"))
 */

import { useEffect, useRef, useCallback } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const CHAR_SET = "アイウエオカキクケコ01ABCDEF</>{}[];∴∷".split("");
const COL_W = 18; // px per column
const PEAK_MS = 380;     // how long rain runs at full intensity
const DISSOLVE_MS = 500; // how long the column-dissolve takes
const FADE_OUT_MS = 250; // final CSS opacity fade after dissolve

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------------
// Core canvas renderer (imperative, no React state in the hot path)
// ---------------------------------------------------------------------------
function runMatrixWipe(canvas: HTMLCanvasElement, overlay: HTMLDivElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  const numCols = Math.ceil(W / COL_W);
  const numRows = Math.ceil(H / COL_W);

  // Each column: head y position, speed, whether it's dissolving, opacity
  const cols = Array.from({ length: numCols }, () => ({
    y: Math.floor(Math.random() * -numRows * 0.5),
    speed: Math.random() * 0.8 + 0.5,
    dissolving: false,
    opacity: 1,
  }));

  let rafId = 0;
  let frame = 0;
  let dissolved = false;

  // --- Draw loop ---
  const draw = () => {
    frame++;

    // Clear canvas instead of painting it black to keep the background visible
    ctx.clearRect(0, 0, W, H);

    ctx.font = `${COL_W - 2}px "JetBrains Mono", monospace`;

    for (let i = 0; i < cols.length; i++) {
      const col = cols[i];

      if (col.dissolving) {
        col.opacity = Math.max(0, col.opacity - 0.055);
        if (col.opacity <= 0) continue;
      }

      col.y += col.speed;

      const x = i * COL_W;
      const headY = Math.floor(col.y) * COL_W;

      // Head — pure white
      ctx.fillStyle = `rgba(255, 255, 255, ${col.opacity})`;
      ctx.fillText(rand(CHAR_SET), x, headY);

      // Trail — white → grey
      for (let j = 1; j <= 18; j++) {
        const alpha = ((18 - j) / 18) * 0.7 * col.opacity;
        const brightness = Math.floor(255 - (190 * j) / 18);
        ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},${alpha})`;
        ctx.fillText(rand(CHAR_SET), x, headY - j * COL_W);
      }

      if (col.y > numRows + 5) {
        col.y = col.dissolving ? 999 : Math.floor(Math.random() * -5);
        col.speed = Math.random() * 0.8 + 0.5;
      }
    }

    rafId = requestAnimationFrame(draw);
  };

  // --- Show overlay ---
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "all";
  rafId = requestAnimationFrame(draw);

  // --- Begin dissolve after PEAK_MS ---
  const peakTimer = setTimeout(() => {
    // Stagger column dissolves in random waves
    const shuffled = [...cols].sort(() => Math.random() - 0.5);
    const batchSize = Math.ceil(numCols / 12);
    shuffled.forEach((col, idx) => {
      setTimeout(() => {
        col.dissolving = true;
      }, Math.floor(idx / batchSize) * 60);
    });
  }, PEAK_MS);

  // --- Fade overlay out after dissolve ---
  const dissolveTimer = setTimeout(() => {
    dissolved = true;
    overlay.style.transition = `opacity ${FADE_OUT_MS}ms ease-out`;
    overlay.style.opacity = "0";

    setTimeout(() => {
      cancelAnimationFrame(rafId);
      overlay.style.pointerEvents = "none";
      // Clear canvas so it's fresh for the next wipe
      ctx.clearRect(0, 0, W, H);
    }, FADE_OUT_MS + 50);
  }, PEAK_MS + DISSOLVE_MS);

  return () => {
    clearTimeout(peakTimer);
    clearTimeout(dissolveTimer);
    cancelAnimationFrame(rafId);
  };
}

// ---------------------------------------------------------------------------
// React component
// ---------------------------------------------------------------------------
export default function MatrixWipe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);
  const busyRef = useRef(false);

  const trigger = useCallback(() => {
    if (busyRef.current) return;
    if (!canvasRef.current || !overlayRef.current) return;
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    busyRef.current = true;
    cleanupRef.current?.();
    cleanupRef.current = runMatrixWipe(canvasRef.current, overlayRef.current) ?? undefined;

    // Re-enable after full wipe cycle
    setTimeout(() => { busyRef.current = false; }, PEAK_MS + DISSOLVE_MS + FADE_OUT_MS + 100);
  }, []);

  useEffect(() => {
    window.addEventListener("matrix-wipe", trigger);
    return () => window.removeEventListener("matrix-wipe", trigger);
  }, [trigger]);

  return (
    // Overlay sits above everything except the cursor (z-[9990])
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] pointer-events-none"
      style={{ opacity: 0, transition: "opacity 80ms ease-in" }}
      aria-hidden="true"
    >

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
