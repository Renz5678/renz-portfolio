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
        <TextReveal>
          <h2 id="trajectory-heading" className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-24">
            <span className="text-primary-container block mb-2 text-lg font-normal opacity-80">
              renz@dev:~$ cat timeline.log
            </span>
            trajectory
          </h2>
        </TextReveal>

        <div className="relative border-l border-zinc-800/80 ml-2 md:ml-0 pl-8 md:pl-12">
          {experience.map((entry, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative mb-12 last:mb-0 group cursor-default"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[37px] md:-left-[53px] top-2 w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-primary-container transition-colors duration-300" />
              
              {/* Amber placeholder dot if needed */}
              {entry.isPlaceholder && (
                <div className="absolute -left-[50px] md:-left-[66px] top-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" title="Placeholder Data" />
              )}

              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl md:text-3xl text-zinc-100 group-hover:text-white transition-colors">
                  {entry.company}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 whitespace-nowrap">
                  {entry.dateRange}
                </span>
              </div>
              
              <div className="font-mono text-xs text-zinc-400 mt-2 uppercase tracking-wider group-hover:text-primary-container transition-colors">
                {entry.role}
              </div>

              {/* Expandable Description */}
              <AnimatePresence>
                {(hoveredIdx === idx) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
                      {/* Truncate to first sentence for minimalism */}
                      {entry.description.split(". ")[0]}.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Leadership merged as inline tags */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative mt-24 pt-12 border-t border-zinc-900"
          >
             <div className="absolute -left-[37px] md:-left-[53px] top-14 w-2 h-2 rounded-full bg-zinc-800" />
             <div className="text-[10px] text-zinc-500 tracking-widest mb-6">
               leadership &amp; community
             </div>
             <div className="flex flex-wrap gap-4">
               {leadership.map((item, i) => (
                 <span key={i} className="font-mono text-xs text-zinc-400 border border-zinc-800 px-3 py-1.5 hover:text-white hover:border-zinc-500 transition-colors cursor-default">
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
