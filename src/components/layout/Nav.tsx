"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

// No numbered prefixes — the nav is not a sequence.
// No [ bracket ] wrappers — those read as a generic tell.
const navItems = [
  { name: "about",   id: "about" },
  { name: "work",    id: "works" },
  { name: "stack",   id: "capabilities" },
  { name: "path",    id: "trajectory" },
  { name: "honors",  id: "honors" },
  { name: "contact", id: "contact" },
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
    window.dispatchEvent(new CustomEvent("matrix-wipe"));
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-bg/70 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* Logo — monospace, lowercase, one red dot */}
        <div
          onClick={() => scrollTo("unveil")}
          data-egg-prompt
          className="font-mono text-xs text-fg tracking-widest cursor-pointer hover:text-signal transition-colors group flex items-center gap-2"
        >
          <span data-egg-dot className="w-1.5 h-1.5 rounded-sm bg-signal" />
          renz.
        </div>

        {/* Desktop Nav — plain words, no numbers, no brackets */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-mono text-[11px] tracking-wider transition-all duration-300 relative
                  ${isActive ? "text-fg" : "text-fg-muted hover:text-fg"}
                `}
              >
                {item.name}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 w-full h-[1px] bg-signal"
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

        {/* Resume CTA — plain text link, no brackets */}
        <a
          href="/cv/lawrenz-garcia-cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block font-mono text-[11px] tracking-wider text-fg-muted hover:text-fg border border-border hover:border-border-bright px-4 py-1.5 transition-all"
        >
          resume
        </a>
      </div>
    </motion.header>
  );
}
