"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience, leadership } from "@/data/portfolio";
import TextReveal from "@/components/ui/TextReveal";

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="trajectory"
      className="py-32 lg:py-48 min-h-screen relative"
      aria-labelledby="trajectory-heading"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* Section identifier */}
        <TextReveal>
          <div className="font-mono text-xs text-fg-muted mb-4 tracking-wide">
            ~/timeline.log
          </div>
          <h2
            id="trajectory-heading"
            className="font-display text-2xl md:text-3xl font-bold text-fg tracking-tight mb-16"
          >
            path
          </h2>
        </TextReveal>

        {/* Timeline — the content IS a sequence, so the vertical list structure is earned */}
        <div className="relative border-l border-border ml-2 md:ml-0 pl-8 md:pl-12">
          {experience.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="relative mb-14 last:mb-0 group cursor-default"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Timeline marker — square, not round */}
              <div
                className={`absolute -left-[37px] md:-left-[53px] top-2.5 w-2 h-2 border transition-all duration-300 ${
                  hoveredIdx === idx
                    ? "bg-signal border-signal"
                    : "bg-transparent border-border"
                }`}
              />

              {/* Company + date row */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-1">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-fg group-hover:text-fg transition-colors">
                  {entry.company}
                  {entry.isActive && (
                    <span className="ml-3 font-mono text-[10px] text-cursor-green tracking-widest align-middle">
                      active
                    </span>
                  )}
                </h3>
                <span className="font-mono text-[10px] text-fg-muted tracking-widest whitespace-nowrap">
                  {entry.dateRange}
                </span>
              </div>

              {/* Role — Inter, not mono */}
              <div className="font-sans text-sm text-fg-muted group-hover:text-fg transition-colors">
                {entry.role}
              </div>

              {/* Description — expands on hover */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 font-sans text-sm text-fg-muted leading-relaxed max-w-2xl">
                      {entry.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Leadership — plain comma-separated, no brackets */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative mt-20 pt-12 border-t border-border"
          >
            <div className="absolute -left-[37px] md:-left-[53px] top-14 w-2 h-2 border border-border" />
            <div className="font-mono text-[10px] text-fg-muted tracking-widest mb-5">
              leadership & community
            </div>
            <div className="flex flex-wrap gap-3">
              {leadership.map((item, i) => (
                <span
                  key={i}
                  className="font-sans text-sm text-fg-muted border border-border px-3 py-1.5 hover:text-fg hover:border-border-bright transition-colors cursor-default"
                >
                  {item.org}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
