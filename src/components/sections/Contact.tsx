"use client";

import { useState } from "react";
import { contact } from "@/data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback: select text approach
    }
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-3xl">
        {/* Section label */}
        <div className="font-mono text-xs tracking-[0.22em] text-primary-container uppercase mb-3 group inline-flex items-center gap-1 cursor-default">
          <span className="text-zinc-500 group-hover:text-primary-container transition-colors">
            $
          </span>
          <span className="group-hover:text-white transition-colors">
            ./transmit_contact.sh
          </span>
          <span className="text-zinc-600">[07/07]</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-container ml-1 font-bold">
            {">_"}
          </span>
        </div>

        {/* Headline */}
        <h2
          id="contact-heading"
          className="font-mono text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight"
        >
          {">"} have a project in mind?
          <br />
          <span className="text-zinc-400 font-normal">
            let&apos;s engineer something resilient.
          </span>
          <span
            className="terminal-cursor text-primary-container ml-2"
            aria-hidden="true"
          >
            _
          </span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base font-light mt-6 leading-relaxed">
          open to software engineering internships, backend &amp; ai developer
          roles, and full-stack collaboration. transmit your query directly
          below.
        </p>

        {/* Email + copy */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="font-display text-xl sm:text-2xl md:text-3xl text-zinc-200 hover:text-primary-container transition-colors tracking-tight underline decoration-primary-container/40 underline-offset-8 group"
            aria-label={`Send email to ${contact.email}`}
          >
            {contact.email}
          </a>
          <button
            id="copyBtn"
            onClick={copyEmail}
            aria-label="Copy email address to clipboard"
            className={`font-mono text-[11px] tracking-wider uppercase border px-3 py-1.5 transition-all active:scale-95 duration-150 ${
              copied
                ? "text-white border-primary-container bg-primary-container/20"
                : "text-zinc-400 border-zinc-800 hover:text-white hover:border-white"
            }`}
          >
            {copied ? "copied to clipboard" : "copy address"}
          </button>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-900 font-mono text-xs text-zinc-400">
          <div className="hover:text-zinc-200 transition-colors">
            <span className="text-zinc-600">// phone:</span>{" "}
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="hover:text-white hover:underline transition-colors"
            >
              {contact.phone}
            </a>
          </div>
          <div className="hover:text-zinc-200 transition-colors">
            <span className="text-zinc-600">// location:</span>{" "}
            {contact.location}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wider uppercase bg-primary-container text-white px-5 py-2.5 hover:bg-red-700 hover:shadow-[0_0_16px_rgba(227,27,35,0.4)] transition-all duration-200 inline-flex items-center gap-2 group active:scale-95"
          >
            <span>github repos</span>
            <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200">
              →
            </span>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wider uppercase border border-zinc-800 px-5 py-2.5 text-zinc-300 hover:border-zinc-500 hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all duration-200 active:scale-95 inline-flex items-center gap-1.5 group"
          >
            <span>linkedin profile</span>
            <span className="text-[13px] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              ↗
            </span>
          </a>
          {/* CV Download */}
          <a
            href="/cv/lawrenz-garcia-cv.pdf"
            download="Lawrenz-Matthew-Garcia-CV.pdf"
            className="font-mono text-xs tracking-wider uppercase border border-zinc-800 px-5 py-2.5 text-zinc-300 hover:border-primary-container/60 hover:text-white transition-all duration-200 active:scale-95 inline-flex items-center gap-1.5"
            aria-label="Download CV"
          >
            ↓ download cv
          </a>
        </div>
      </div>
    </section>
  );
}
