"use client";

/**
 * ChatWidget.tsx
 *
 * Floating trigger button + ChatPanel shell.
 *
 * Keyboard shortcut: Ctrl+/ (or Cmd+/ on Mac) toggles the panel.
 *
 * Unread dot: shows a pulsing red dot on the button if the panel has never
 * been opened this session. The panel never auto-opens — the dot is a
 * passive nudge only.
 */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatPanel from "./ChatPanel";

const OPENED_KEY = "scarecrow_chat_opened";

export default function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // Show unread dot on first visit — panel stays closed until manually opened.
  useEffect(() => {
    if (!sessionStorage.getItem(OPENED_KEY)) {
      setHasUnread(true);
    }
  }, []);

  // Keyboard shortcut: Ctrl+/ or Cmd+/
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        // Mark as opened — hide unread dot
        sessionStorage.setItem(OPENED_KEY, "1");
        setHasUnread(false);
      }
      return next;
    });
  };

  return (
    <>
      {/* ── Floating trigger button ──────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[9980]">
        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative font-mono text-[10px] uppercase tracking-widest px-4 py-2 border border-zinc-800 text-zinc-400 hover:border-[#e31b23] hover:text-white transition-all duration-200 bg-zinc-950"
          title={open ? "close chat (ctrl+/)" : "open chat (ctrl+/)"}
          aria-label={open ? "close chat" : "open chat"}
        >
          {open ? "[ close ]" : "[ chat ]"}

          {/* Unread indicator dot */}
          {hasUnread && !open && (
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#e31b23]"
              aria-hidden="true"
            />
          )}
        </motion.button>

        {/* Keyboard shortcut hint — visible on hover via group */}
        <div className="absolute bottom-full right-0 mb-1 pointer-events-none">
          <motion.span
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="font-mono text-[8px] text-zinc-700 uppercase tracking-widest whitespace-nowrap"
          >
            ctrl+/
          </motion.span>
        </div>
      </div>

      {/* ── Chat panel ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && <ChatPanel onClose={toggle} />}
      </AnimatePresence>
    </>
  );
}
