"use client";

import { motion, Variants } from "framer-motion";

interface CharStaggerProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function CharStagger({ text, className = "", delay = 0 }: CharStaggerProps) {
  // Split the text into characters, but keep spaces intact
  const characters = text.split("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  };

  const prefersReduced = 
    typeof window !== "undefined" 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false;

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`inline-block ${className}`}
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={charVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          aria-hidden="true"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
