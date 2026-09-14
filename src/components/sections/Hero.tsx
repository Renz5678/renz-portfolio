"use client";

import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { hero } from "@/data/portfolio";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale the name up slightly as we scroll down (less dramatic than before, fitting a terminal)
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  // Fade out the content as we scroll down
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="unveil"
      ref={containerRef}
      className="relative w-full h-[150vh] bg-background"
      aria-label="Hero — introduction"
    >
      {/* Sticky container to hold the content while scrolling */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center px-6 md:px-24">
        
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        {/* Center Content - Terminal Style */}
        <motion.div 
          style={{ opacity }} 
          className="relative z-10 flex flex-col items-start justify-center w-full max-w-6xl mx-auto"
        >
          <motion.div 
            style={{ scale: nameScale, transformOrigin: "left center" }}
            className="flex flex-col md:flex-row md:items-center gap-4 text-4xl md:text-7xl lg:text-[7vw] font-bold tracking-tight select-none"
          >
            {/* Terminal Prompt Prefix */}
            <span className="text-primary-container opacity-80">
              {hero.name}@dev:~$
            </span>
            
            {/* Hero Name & Blinking Cursor */}
            <div className="flex items-center text-white">
              <span className="opacity-0">{hero.name}</span> {/* Spacing offset if we wanted to type it, but we'll just show it */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.1 }}
                className="ml-2 md:ml-6"
              >
                {hero.name}
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="ml-2 md:ml-4 text-primary-container"
              >
                █
              </motion.span>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="text-sm md:text-base text-zinc-400 tracking-wider mt-12 pl-1 md:pl-2"
          >
            {hero.role} &amp; cs student
          </motion.p>
        </motion.div>

        {/* Bottom Metadata & Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-8 left-0 w-full px-8 md:px-12 flex justify-between items-end z-10 text-xs text-zinc-500 tracking-widest"
        >
          {/* Left: Scroll Cue */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px]">scroll</span>
            <motion.div 
              animate={{ height: ["0px", "24px", "0px"], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] bg-primary-container"
            />
          </div>

          {/* Right: Availability */}
          <div className="flex items-center gap-2 text-emerald-500 text-[10px]">
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-sm bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
            />
            {hero.availability.split(" & ")[0]}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
