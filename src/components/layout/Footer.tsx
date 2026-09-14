"use client";

import { contact } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-zinc-900 py-12 px-6 lg:px-12 relative z-30"
      aria-label="Site footer"
    >
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-zinc-500">
        {/* Copyright */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container" aria-hidden="true" />
          <span className="text-zinc-400">© 2025 lawrenz matthew garcia</span>
          <span className="text-zinc-700">//</span>
          <span>all rights reserved</span>
        </div>

        {/* Social links */}
        <nav
          className="flex flex-wrap items-center gap-6"
          aria-label="Social links"
        >
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:underline transition-colors"
          >
            github
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:underline transition-colors"
          >
            linkedin
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hover:text-white hover:underline transition-colors"
          >
            email
          </a>
        </nav>

        {/* Back to top */}
        <div className="flex items-center gap-4 text-[11px] text-zinc-600">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-primary-container transition-colors uppercase active:scale-90"
            aria-label="Scroll to top"
          >
            ↑ top
          </button>
        </div>
      </div>
    </footer>
  );
}
