"use client";

import { motion, Variants } from "framer-motion";
import { achievements, education } from "@/data/portfolio";

export default function AchievementsEducation() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section
      id="honors"
      className="py-32 lg:py-48 min-h-screen flex items-center"
      aria-labelledby="honors-heading"
    >
      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        
        {/* Achievements Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-zinc-950 border border-zinc-900 p-8 lg:p-12 flex flex-col justify-between h-full"
        >
          <div>
            <h2 id="honors-heading" className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
              <span className="text-primary-container block mb-2 text-lg font-normal opacity-80">
                renz@dev:~$ cat honors.txt
              </span>
              honors
            </h2>
            <div className="flex flex-col gap-4">
              {achievements.map((item, i) => (
                <div key={i} className="inline-flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  <span className="font-mono text-sm text-zinc-300 uppercase tracking-wider">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }} // Staggered entry
          className="bg-zinc-950 border border-zinc-900 p-8 lg:p-12 flex flex-col justify-between h-full"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
              education
            </h2>
            <h3 className="text-xl md:text-2xl text-zinc-100 mb-2">
              {education.institution}
            </h3>
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              {education.degree} // {education.expectedGrad}
            </p>
          </div>
          
          <div className="mt-12">
            {education.honors.map((honor, i) => (
              <span key={i} className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-400 border border-zinc-800 px-3 py-1.5 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                {honor}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
