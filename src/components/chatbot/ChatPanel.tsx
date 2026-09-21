"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useChatbot } from "@/hooks/useChatbot";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface ChatPanelProps {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const { messages, isTyping, send, clear } = useChatbot();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or typing indicator
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Small delay so the DOM has painted the new message
    const t = setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 30);
    return () => clearTimeout(t);
  }, [messages, isTyping]);

  return (
    <motion.div
      key="chat-panel"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-[58px] right-6 z-[9979] w-[320px] md:w-[380px] flex flex-col bg-zinc-950 border border-zinc-800 shadow-2xl"
      style={{ height: "min(480px, 65vh)" }}
    >
      {/* ── Terminal chrome header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-[#111111] shrink-0">
        <div className="flex items-center gap-2">
          {/* Window dots */}
          <span className="w-[7px] h-[7px] rounded-sm bg-zinc-700" />
          <span className="w-[7px] h-[7px] rounded-sm bg-zinc-700" />
          <span className="w-[7px] h-[7px] rounded-sm bg-zinc-700" />
          <span className="ml-2 font-mono text-[9px] text-zinc-600 uppercase tracking-widest select-none">
            renz@dev:~$ ./chat
          </span>
        </div>

        <button
          onClick={clear}
          className="font-mono text-[9px] uppercase tracking-widest text-zinc-700 hover:text-zinc-400 transition-colors"
          title="clear history"
        >
          [clear]
        </button>
      </div>

      {/* ── Message list ──────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-3 space-y-3 hide-scrollbar"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[11px] text-[#e31b23]"
          >
            renz@dev:~${" "}
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
            >
              ▌
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* ── Input bar ─────────────────────────────────────────────────────── */}
      <ChatInput onSend={send} disabled={isTyping} />
    </motion.div>
  );
}
