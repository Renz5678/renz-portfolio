"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

const rings = [
  {
    radius: 120,
    speed: 40,
    direction: 1,
    items: ["[python]", "[java]", "[react]", "[fastapi]"],
    fontSize: "text-lg md:text-xl",
  },
  {
    radius: 220,
    speed: 55,
    direction: -1,
    items: ["[docker]", "[supabase]", "[aws]", "[spring]", "[next.js]", "[sql]"],
    fontSize: "text-sm md:text-base",
  },
  {
    radius: 340,
    speed: 70,
    direction: 1,
    items: ["[git]", "[vercel]", "[actions]", "[expo]", "[tailwind]", "[dynamodb]", "[c++]", "[express]"],
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
      <div className="absolute top-12 md:top-24 left-6 lg:left-12 z-20">
        <TextReveal>
          <h2 id="capabilities-heading" className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            <span className="text-primary-container block mb-2 text-lg font-normal opacity-80">
              renz@dev:~$ cat .config/stack.json
            </span>
            capabilities
          </h2>
        </TextReveal>
      </div>

      <div className="relative w-full max-w-[800px] aspect-square flex items-center justify-center scale-75 md:scale-100 mt-12 md:mt-0">
        
        {/* Core center point */}
        <div className="absolute w-4 h-4 bg-primary-container shadow-[0_0_15px_rgba(227,27,35,0.8)] z-10" />

        {rings.map((ring, ringIdx) => (
          <div key={ringIdx} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* SVG Ring Line */}
            <svg width={ring.radius * 2} height={ring.radius * 2} className="absolute overflow-visible opacity-30">
              <circle cx={ring.radius} cy={ring.radius} r={ring.radius} fill="none" stroke="#e31b23" strokeWidth="1" strokeDasharray="4 8" />
            </svg>

            {/* Orbital Container (rotates) */}
            <motion.div
              animate={prefersReduced ? {} : { rotate: 360 * ring.direction }}
              transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
              className={`absolute w-[${ring.radius * 2}px] h-[${ring.radius * 2}px] flex items-center justify-center`}
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
                    // Counter-rotate the item so text stays upright
                    animate={prefersReduced ? {} : { rotate: -360 * ring.direction }}
                    transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
                    onMouseEnter={() => setHoveredNode(item)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div 
                      className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 border transition-all duration-300 cursor-default bg-background
                        ${isHovered 
                          ? "text-primary-container border-primary-container scale-110 z-50 shadow-[0_0_10px_rgba(227,27,35,0.4)]" 
                          : "text-zinc-500 border-zinc-800 hover:text-white"
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
