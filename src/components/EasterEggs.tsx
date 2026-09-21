"use client";

/**
 * EasterEggs.tsx
 * A collection of hidden interactions for the portfolio:
 *  1. Konami Code (↑↑↓↓←→←→BA) → terminal overlay
 *  2. Click renz@dev:~$ 5× → glitch message
 *  3. Type "sudo" anywhere → snarky popup toast
 *  4. Type "hello" anywhere → greeting popup
 *  5. Triple-click footer copyright → Matrix rain canvas
 *
 * Nav-dot hover glitch is handled inline in Nav.tsx via `data-egg-dot`.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type ToastVariant = "sudo" | "hello" | "konami" | "click" | "glitch";

interface Toast {
  id: number;
  variant: ToastVariant;
  message: string;
}

// ---------------------------------------------------------------------------
// Konami code sequence
// ---------------------------------------------------------------------------
const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

// ---------------------------------------------------------------------------
// Matrix rain canvas (drawn on demand, removed after 4 s)
// ---------------------------------------------------------------------------
function startMatrixRain() {
  const existing = document.getElementById("__matrix_canvas__");
  if (existing) return; // already running

  const canvas = document.createElement("canvas");
  canvas.id = "__matrix_canvas__";
  canvas.style.cssText =
    "position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0;transition:opacity 0.3s";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const cols = Math.floor(canvas.width / 16);
  const drops: number[] = Array.from({ length: cols }, () =>
    Math.floor(Math.random() * -canvas.height)
  );
  const chars = "アイウエオカキクケコ01ABCDEF</>{}[];".split("");

  requestAnimationFrame(() => {
    canvas.style.opacity = "1";
  });

  let frame = 0;
  const interval = setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = "14px JetBrains Mono, monospace";

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 16, y * 16);
      drops[i] = y > canvas.height / 16 ? 0 : y + 1;
    });

    frame++;
    if (frame > 200) {
      clearInterval(interval);
      canvas.style.opacity = "0";
      setTimeout(() => canvas.remove(), 400);
    }
  }, 33);
}

// ---------------------------------------------------------------------------
// Hook: listen for matrix trigger (triple-click on #footer-copyright)
// ---------------------------------------------------------------------------
function useMatrixEgg() {
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-egg-matrix]");
      if (!el) return;

      clickCount.current += 1;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { clickCount.current = 0; }, 700);

      if (clickCount.current >= 3) {
        clickCount.current = 0;
        startMatrixRain();
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

// ---------------------------------------------------------------------------
// Hook: renz@dev click 5× egg
// ---------------------------------------------------------------------------
function usePromptClickEgg(onTrigger: () => void) {
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-egg-prompt]");
      if (!el) return;

      clickCount.current += 1;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { clickCount.current = 0; }, 1500);

      if (clickCount.current >= 5) {
        clickCount.current = 0;
        onTrigger();
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [onTrigger]);
}

// ---------------------------------------------------------------------------
// Hook: nav dot hover glitch (rapid hover 8×)
// ---------------------------------------------------------------------------
function useNavDotGlitch(onTrigger: () => void) {
  const hoverCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-egg-dot]");
      if (!el) return;

      hoverCount.current += 1;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { hoverCount.current = 0; }, 2000);

      if (hoverCount.current >= 8) {
        hoverCount.current = 0;
        onTrigger();
      }
    };

    document.addEventListener("mouseover", handler);
    return () => document.removeEventListener("mouseover", handler);
  }, [onTrigger]);
}

// ---------------------------------------------------------------------------
// Hook: keyboard buffer for "sudo" and "hello"
// ---------------------------------------------------------------------------
function useKeywordEgg(
  keyword: string,
  onTrigger: () => void
) {
  const buffer = useRef("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.length !== 1) { buffer.current = ""; return; }
      buffer.current = (buffer.current + e.key).slice(-keyword.length);
      if (buffer.current.toLowerCase() === keyword.toLowerCase()) {
        buffer.current = "";
        onTrigger();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keyword, onTrigger]);
}

// ---------------------------------------------------------------------------
// Hook: Konami code
// ---------------------------------------------------------------------------
function useKonami(onTrigger: () => void) {
  const progress = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[progress.current]) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          onTrigger();
        }
      } else {
        progress.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onTrigger]);
}

// ---------------------------------------------------------------------------
// Toast messages
// ---------------------------------------------------------------------------
const TOAST_MESSAGES: Record<ToastVariant, string> = {
  sudo:   "[error]: permission denied — nice try though.",
  hello:  "[stdout]: hey. i see you. 👀",
  konami: "[unlocked]: ↑↑↓↓←→←→BA — you're a legend.",
  click:  "[debug]: stop clicking me. i'm just a prompt.",
  glitch: "[warn]: reality.exe encountered an unexpected error.",
};

// ---------------------------------------------------------------------------
// Toast component
// ---------------------------------------------------------------------------
function ToastItem({ toast, onDone }: { toast: Toast; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="font-mono text-xs text-zinc-200 bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-sm shadow-2xl max-w-xs select-none pointer-events-none"
    >
      <span className="opacity-50 mr-2">scarecrow@dev:~$</span>
      {toast.message}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="ml-1 text-white"
      >
        █
      </motion.span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Konami overlay
// ---------------------------------------------------------------------------
function KonamiOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { clearTimeout(t); window.removeEventListener("keydown", handler); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="font-mono text-center px-8 py-10 border border-zinc-700 bg-zinc-950 max-w-md rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white text-4xl mb-4">🎮</div>
        <div className="text-zinc-200 text-sm tracking-widest mb-2">
          [easter_egg.exe — UNLOCKED]
        </div>
        <div className="text-zinc-300 text-xs mt-4 leading-relaxed opacity-80">
          ↑ ↑ ↓ ↓ ← → ← → B A<br />
          <span className="text-zinc-500">konami code detected.<br />
          you found a secret. respect.</span>
        </div>
        <div className="mt-6 text-zinc-600 text-[10px] tracking-widest">
          press ESC or click to dismiss
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main EasterEggs component
// ---------------------------------------------------------------------------
let toastId = 0;

export default function EasterEggs() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showKonami, setShowKonami] = useState(false);

  const addToast = useCallback((variant: ToastVariant) => {
    setToasts((prev) => [
      ...prev,
      { id: ++toastId, variant, message: TOAST_MESSAGES[variant] },
    ]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Konami
  useKonami(useCallback(() => setShowKonami(true), []));

  // Keyword eggs
  useKeywordEgg("sudo",  useCallback(() => addToast("sudo"),  [addToast]));
  useKeywordEgg("hello", useCallback(() => addToast("hello"), [addToast]));

  // Click eggs
  usePromptClickEgg(useCallback(() => addToast("click"), [addToast]));

  // Nav dot hover glitch
  useNavDotGlitch(useCallback(() => addToast("glitch"), [addToast]));

  // Matrix rain (footer triple-click)
  useMatrixEgg();

  return (
    <>
      {/* Konami overlay */}
      <AnimatePresence>
        {showKonami && (
          <KonamiOverlay onClose={() => setShowKonami(false)} />
        )}
      </AnimatePresence>

      {/* Toast stack — bottom right */}
      <div className="fixed bottom-[52px] right-6 z-[9997] flex flex-col-reverse gap-3 items-end">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem
              key={t.id}
              toast={t}
              onDone={() => removeToast(t.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
