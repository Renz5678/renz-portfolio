"use client";

import { contact } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-border py-10 px-6 lg:px-12 relative z-30"
      aria-label="Site footer"
    >
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs text-fg-dim">
        {/* Copyright */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-signal" aria-hidden="true" />
          <span
            data-egg-matrix
            className="text-fg-muted cursor-default select-none"
            title="triple-click me ;)"
          >
            © 2025 scarecrow
          </span>
          <span className="text-border">//</span>
          <span>all rights reserved</span>
        </div>

        {/* Social links — plain text, no brackets */}
        <nav className="flex flex-wrap items-center gap-6" aria-label="Social links">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            github
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            linkedin
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hover:text-fg transition-colors"
          >
            email
          </a>
        </nav>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-signal transition-colors active:scale-90 text-[11px]"
          aria-label="Scroll to top"
        >
          ↑ top
        </button>
      </div>
    </footer>
  );
}
