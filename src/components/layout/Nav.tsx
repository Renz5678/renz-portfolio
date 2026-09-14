"use client";

import { useEffect, useState } from "react";
import { navLinks, contact } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setVisible(y > vh * 0.35);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#050505]/85 border-b border-white/[0.06] transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      aria-label="Site navigation"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#unveil"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group font-mono text-xs tracking-wider"
          aria-label="Back to top"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container group-hover:scale-125 transition-transform" />
          <span className="text-on-surface font-medium group-hover:text-primary transition-colors">
            lawrenz
          </span>
          <span className="text-zinc-500">/ backend-ai</span>
        </a>

        {/* Nav links */}
        <nav
          className="hidden md:flex items-center gap-7 font-mono text-[11px] tracking-widest text-zinc-400"
          aria-label="Sections"
        >
          {navLinks.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = active === sectionId;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(sectionId)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`pb-0.5 transition-all duration-200 ${
                  isActive
                    ? "text-white border-b border-primary-container"
                    : "hover:text-white hover:border-b hover:border-primary-container"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href={`mailto:${contact.email}`}
          className="font-mono text-[11px] tracking-widest text-primary-container border border-primary-container/30 px-3 py-1.5 hover:bg-primary-container hover:text-white hover:shadow-[0_0_12px_rgba(227,27,35,0.4)] transition-all duration-200 active:scale-95"
          aria-label="Send email"
        >
          [ talk ]
        </a>
      </div>
    </header>
  );
}
