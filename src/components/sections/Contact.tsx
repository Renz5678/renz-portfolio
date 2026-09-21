"use client";

import { useState } from "react";
import { contact } from "@/data/portfolio";
import TextReveal from "@/components/ui/TextReveal";
import { motion } from "framer-motion";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.location.href = `mailto:${contact.email}`;
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-24 py-32"
      aria-labelledby="contact-heading"
    >
      <div className="w-full max-w-4xl">

        {/* Section identifier */}
        <TextReveal>
          <div className="font-mono text-xs text-fg-muted mb-4 tracking-wide">
            ~/contact.sh
          </div>
          <h2 id="contact-heading" className="font-display text-2xl md:text-3xl font-bold text-fg tracking-tight mb-6">
            contact
          </h2>
        </TextReveal>

        <TextReveal delay={0.15}>
          <p className="font-sans text-sm text-fg-muted mb-10 max-w-[55ch] leading-relaxed">
            open to internships and full-stack roles. send a message or reach out directly.
          </p>
        </TextReveal>

        {/* Email — large, plain, clickable. No terminal box. */}
        <TextReveal delay={0.3}>
          <a
            href={`mailto:${contact.email}`}
            onClick={copyEmail}
            className="group block font-mono text-lg md:text-2xl text-fg hover:text-signal transition-colors duration-300 mb-2"
            title="click to copy & email"
          >
            {contact.email}
          </a>
          <div className="font-mono text-[10px] text-fg-dim tracking-widest h-5">
            {copied && "copied to clipboard"}
          </div>
        </TextReveal>

        {/* Social links — plain text, no brackets */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 flex items-center gap-8 md:gap-10"
        >
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-fg-muted hover:text-fg transition-colors"
          >
            github
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-fg-muted hover:text-fg transition-colors"
          >
            linkedin
          </a>
          <a
            href="/cv/lawrenz-garcia-cv.pdf"
            download="Lawrenz-Matthew-Garcia-CV.pdf"
            className="font-mono text-sm text-fg-muted hover:text-fg transition-colors"
          >
            resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
