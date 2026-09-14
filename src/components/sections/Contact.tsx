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
      className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-24"
      aria-labelledby="contact-heading"
    >
      <div className="w-full max-w-4xl">
        <h2 id="contact-heading" className="sr-only">contact</h2>
        
        <TextReveal>
          <div className="text-xl md:text-3xl font-bold tracking-tight text-white mb-6">
            <span className="text-primary-container font-normal opacity-80 mr-4">
              renz@dev:~$
            </span>
            ./transmit_contact.sh
          </div>
        </TextReveal>

        <TextReveal delay={0.2}>
          <p className="text-sm md:text-base text-zinc-400 mb-8 max-w-xl">
            initializing secure channel. waiting for incoming transmission.
            click to copy address or open default client.
          </p>
        </TextReveal>

        {/* Terminal Style Email CTA */}
        <TextReveal delay={0.4}>
          <a
            href={`mailto:${contact.email}`}
            onClick={copyEmail}
            className="group flex items-center gap-4 p-4 border border-zinc-800 bg-zinc-950 hover:border-primary-container transition-colors duration-300 w-fit"
            title="click to copy & email"
          >
            <span className="text-primary-container opacity-80">{">"}</span>
            <span className="text-lg md:text-xl text-zinc-300 group-hover:text-white transition-colors">
              {contact.email}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="text-primary-container"
            >
              █
            </motion.span>
          </a>
        </TextReveal>

        {/* Copy Feedback */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : -10 }}
          className="h-8 mt-4 text-xs text-primary-container tracking-widest pointer-events-none"
        >
          [stdout]: copied to clipboard. opening mail client...
        </motion.div>

        {/* Icon-only links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex items-center gap-8 md:gap-12"
        >
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2" title="github">
            <span>[ github ]</span>
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2" title="linkedin">
            <span>[ linkedin ]</span>
          </a>
          <a href="/cv/lawrenz-garcia-cv.pdf" download="Lawrenz-Matthew-Garcia-CV.pdf" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2" title="download cv">
            <span>[ fetch cv ]</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
