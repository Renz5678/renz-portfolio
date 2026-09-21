"use client";

/**
 * useChatbot.ts
 * React hook that owns all chat state.
 * - Persists history to localStorage for 1 day (EXPIRY_MS)
 * - Sends a greeting on first visit (or after expiry / clear)
 * - Simulates a short "thinking" delay before bot replies
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { classify } from "@/lib/classifier";
import { getReply } from "@/data/chatbot-intents";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  links?: { label: string; href: string }[];
  timestamp: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Storage helpers
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = "scarecrow_chat_v1";
const EXPIRY_MS   = 24 * 60 * 60 * 1000; // 1 day

function genId(): string {
  return typeof crypto !== "undefined"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadHistory(): Message[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const stored = JSON.parse(raw) as { messages: Message[]; savedAt: number };
    if (Date.now() - stored.savedAt > EXPIRY_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return stored.messages;
  } catch {
    return [];
  }
}

function saveHistory(messages: Message[]): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages, savedAt: Date.now() })
    );
  } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
// Greeting factory — sources from the "greeting" intent
// ─────────────────────────────────────────────────────────────────────────────
function makeGreeting(): Message {
  const reply = getReply("greeting", "");
  return {
    id: genId(),
    role: "bot",
    content: reply.text,
    links: reply.links,
    timestamp: Date.now(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────
export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const hydrated = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on first mount (client-only)
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const history = loadHistory();
    setMessages(history.length > 0 ? history : [makeGreeting()]);
  }, []);

  // Persist whenever messages change
  useEffect(() => {
    if (messages.length > 0) saveHistory(messages);
  }, [messages]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const send = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: genId(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate "thinking" with a short randomised delay
    const delay = 420 + Math.random() * 380;
    timerRef.current = setTimeout(() => {
      const intentId = classify(trimmed);
      const reply    = getReply(intentId, trimmed);

      const botMsg: Message = {
        id: genId(),
        role: "bot",
        content: reply.text,
        links: reply.links,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  }, []);

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsTyping(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setMessages([makeGreeting()]);
  }, []);

  return { messages, isTyping, send, clear };
}
