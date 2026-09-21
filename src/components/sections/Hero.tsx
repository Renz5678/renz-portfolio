"use client";

import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { hero } from "@/data/portfolio";

const marqueeText = `valenzuela city, ph  ·  full-stack developer  ·  ai engineer  ·  pup cs 2028  ·  available for internships  ·  backend  ·  mobile  ·  `;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms — these only affect elements as you scroll.
  // Do NOT use initial/animate opacity-0 here: Next.js SSR means framer-motion
  // may not re-animate after hydration, leaving elements permanently invisible.
  const nameScale   = useTransform(scrollYProgress, [0, 0.8], [1, 1.4]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      id="unveil"
      ref={containerRef}
      className="relative w-full h-[160vh] bg-bg"
      aria-label="Hero — introduction"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">

        {/* === Main Content — immediately visible, no fade-in delay === */}
        <motion.div
          style={{ opacity: nameOpacity }}
          className="relative z-10 flex flex-col items-start justify-center w-full max-w-8xl mx-auto px-6 md:px-12"
        >
          {/* The $ prompt — appears exactly once */}
          <div className="font-mono text-sm text-signal mb-4 tracking-wide" style={{ color: "#c05038" }}>
            $ whoami
          </div>

          {/* Name — the visual centrepiece. No opacity-0 initial. */}
          <motion.div
            style={{ scale: nameScale, transformOrigin: "left bottom" }}
            className="flex flex-col select-none"
          >
            <span
              className="font-display font-bold text-fg leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)", color: "#c8cdd2" }}
            >
              {hero.name}
            </span>
          </motion.div>

          {/* Subtitle — Inter, not mono */}
          <p className="font-sans text-sm text-fg-muted mt-6 ml-1 tracking-wide" style={{ color: "#525a62" }}>
            {hero.role} · cs student
          </p>
        </motion.div>

        {/* === Marquee strip — CSS animation, always works === */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute bottom-16 left-0 w-full overflow-hidden z-10 border-t border-border"
        >
          <div className="marquee-track py-3 font-mono text-[11px] text-fg-dim tracking-widest whitespace-nowrap">
            {marqueeText + marqueeText}
          </div>
        </motion.div>

        {/* === Availability badge — bottom right === */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute bottom-5 right-6 md:right-12 z-10"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] text-cursor-green tracking-widest">
            <span className="w-1.5 h-1.5 rounded-sm bg-cursor-green active-badge-pulse" />
            {hero.availability.split(" & ")[0]}
          </div>
        </motion.div>

        {/* === Scroll cue — bottom left === */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute bottom-5 left-6 md:left-12 z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-fg-dim tracking-widest">scroll</span>
            <motion.div
              animate={{ height: ["0px", "20px", "0px"], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] bg-signal"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
