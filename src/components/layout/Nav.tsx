"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { name: "01. intro", id: "about" },
  { name: "02. works", id: "works" },
  { name: "03. stack", id: "capabilities" },
  { name: "04. path", id: "trajectory" },
  { name: "05. honors", id: "honors" },
  { name: "06. contact", id: "contact" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection([
    "unveil",
    "about",
    "works",
    "capabilities",
    "trajectory",
    "honors",
    "contact",
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/60 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo / Handle */}
        <div 
          onClick={() => scrollTo("unveil")}
          className="font-mono text-xs text-white tracking-widest uppercase cursor-pointer hover:text-primary-container transition-colors group flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
          renz.
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 relative group
                  ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"}
                `}
              >
                {item.name}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 w-full h-[1px] bg-primary-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        {/* Let's Talk CTA */}
        <button 
          onClick={() => scrollTo("contact")}
          className="hidden sm:block font-mono text-[10px] uppercase tracking-widest px-4 py-2 border border-zinc-800 text-zinc-300 hover:border-primary-container hover:text-white transition-all rounded-sm"
        >
          [ talk ]
        </button>
      </div>
    </motion.header>
  );
}
