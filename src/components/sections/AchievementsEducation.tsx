"use client";

import { motion } from "framer-motion";
import { achievements, education } from "@/data/portfolio";
import TextReveal from "@/components/ui/TextReveal";

export default function AchievementsEducation() {
  return (
    <section
      id="honors"
      className="py-32 lg:py-48 min-h-screen flex items-center"
      aria-labelledby="honors-heading"
    >
      <div className="w-full max-w-6xl mx-auto px-6">

        {/* Section identifier */}
        <TextReveal>
          <div className="font-mono text-xs text-fg-muted mb-4 tracking-wide">
            ~/records/
          </div>
          <h2 id="honors-heading" className="font-display text-2xl md:text-3xl font-bold text-fg tracking-tight mb-16">
            honors
          </h2>
        </TextReveal>

        {/* Two-column — achievements list left, education block right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* Achievements — lean list with a left border accent */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="font-mono text-[10px] text-fg-dim tracking-widest mb-6">
              awards
            </div>
            <ul className="flex flex-col gap-5">
              {achievements.map((item, i) => (
                <li key={i} className="flex items-baseline gap-4 group">
                  <span className="font-mono text-[10px] text-signal w-4 flex-shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-base text-fg group-hover:text-fg transition-colors leading-snug">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Education — larger typographic block, different treatment */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-[10px] text-fg-dim tracking-widest mb-6">
                education
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-fg leading-tight mb-3">
                {education.institution}
              </h3>
              <p className="font-sans text-sm text-fg-muted">
                {education.degree}
              </p>
              <p className="font-mono text-xs text-fg-dim mt-1 tracking-wide">
                expected {education.expectedGrad.replace("expected ", "")}
              </p>
            </div>

            {/* Honors — no animated pulses, clean tags */}
            <div className="flex flex-wrap gap-2 mt-10">
              {education.honors.map((honor, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] text-cursor-green border border-cursor-green/30 px-3 py-1.5 tracking-widest"
                >
                  {honor}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
