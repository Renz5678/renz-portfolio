"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

const rings = [
  {
    radius: 120,
    speed: 40,
    direction: 1,
    items: ["python", "java", "react", "fastapi"],
    fontSize: "text-lg md:text-xl",
  },
  {
    radius: 220,
    speed: 55,
    direction: -1,
    items: ["docker", "supabase", "aws", "spring", "next.js", "sql"],
    fontSize: "text-sm md:text-base",
  },
  {
    radius: 340,
    speed: 70,
    direction: 1,
    items: ["git", "vercel", "actions", "expo", "tailwind", "dynamodb", "c++", "express"],
    fontSize: "text-[10px] md:text-xs",
  },
];

export default function TechStack() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <section
      id="capabilities"
      className="py-32 lg:py-48 min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      aria-labelledby="capabilities-heading"
    >
      {/* Section identifier — top left */}
      <div className="absolute top-12 md:top-24 left-6 lg:left-12 z-20">
        <TextReveal>
          <div className="font-mono text-xs text-fg-muted mb-3 tracking-wide">
            ~/.config/stack
          </div>
          <h2 id="capabilities-heading" className="font-display text-2xl md:text-3xl font-bold text-fg tracking-tight">
            stack
          </h2>
        </TextReveal>
      </div>

      <div className="relative w-full max-w-[800px] aspect-square flex items-center justify-center scale-75 md:scale-100 mt-12 md:mt-0">

        {/* Center point — signal red square */}
        <div className="absolute w-3 h-3 bg-signal shadow-[0_0_12px_rgba(192,80,56,0.6)] z-10" />

        {rings.map((ring, ringIdx) => (
          <div key={ringIdx} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* SVG ring line — cooler border color */}
            <svg width={ring.radius * 2} height={ring.radius * 2} className="absolute overflow-visible opacity-20">
              <circle
                cx={ring.radius}
                cy={ring.radius}
                r={ring.radius}
                fill="none"
                stroke="#525a62"
                strokeWidth="1"
                strokeDasharray="3 9"
              />
            </svg>

            {/* Orbital container */}
            <motion.div
              animate={prefersReduced ? {} : { rotate: 360 * ring.direction }}
              transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
              className="absolute flex items-center justify-center"
              style={{ width: ring.radius * 2, height: ring.radius * 2 }}
            >
              {ring.items.map((item, i) => {
                const angle = (i / ring.items.length) * Math.PI * 2;
                const x = Math.cos(angle) * ring.radius;
                const y = Math.sin(angle) * ring.radius;
                const isHovered = hoveredNode === item;

                return (
                  <motion.div
                    key={item}
                    className="absolute pointer-events-auto"
                    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                    animate={prefersReduced ? {} : { rotate: -360 * ring.direction }}
                    transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
                    onMouseEnter={() => setHoveredNode(item)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div
                      className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono transition-all duration-300 cursor-default px-2 py-0.5 border bg-bg
                        ${isHovered
                          ? "text-signal border-signal scale-110 z-50"
                          : "text-fg-muted border-border hover:text-fg"
                        } ${ring.fontSize}`}
                    >
                      {item}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
