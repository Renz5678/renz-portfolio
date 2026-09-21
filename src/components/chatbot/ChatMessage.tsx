"use client";

import { motion } from "framer-motion";
import type { Message } from "@/hooks/useChatbot";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  // ── User message ─────────────────────────────────────────────────────────
  if (message.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
        className="flex justify-end"
      >
        <span className="font-mono text-[11px] text-zinc-400 break-words max-w-[80%]">
          <span className="text-zinc-600 mr-1 select-none">&gt;</span>
          {message.content}
        </span>
      </motion.div>
    );
  }

  // ── Bot message ───────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      className="space-y-2"
    >
      {/* Text content */}
      <div className="font-mono text-[11px] leading-relaxed break-words">
        <span className="text-[#e31b23] select-none mr-2">renz@dev:~$</span>
        <span className="text-zinc-200 whitespace-pre-wrap">{message.content}</span>
      </div>

      {/* Link chips */}
      {message.links && message.links.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pl-[88px]">
          {message.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border border-zinc-800 text-zinc-500 hover:border-[#e31b23] hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              ↗ {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}
