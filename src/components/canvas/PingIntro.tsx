"use client";

/**
 * PingIntro.tsx
 *
 * A full-screen terminal boot screen styled after the Unix `ping` command.
 * Plays once per browser session (sessionStorage). Sequence:
 *
 *   0.2 s  — prompt "$" appears with blinking cursor
 *   0.5 s  — command types itself out: "ping renz.scarecrow.dev.02"
 *   ~1.4 s — PING header prints
 *   ~1.7 s — icmp_seq=0 … icmp_seq=3 appear every ~300 ms
 *   ~3.0 s — ^C interrupt
 *   ~3.2 s — statistics block prints
 *   ~3.6 s — "connection established." with blinking cursor
 *   ~4.4 s — overlay fades out, component unmounts
 *
 * Respects prefers-reduced-motion (skips entirely).
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────
const SESSION_KEY  = "scarecrow_intro_seen";
const HOST         = "renz.scarecrow.dev.02";
const IP           = "142.250.185.46";
const CMD          = `ping ${HOST}`;
const TYPING_MS    = 50;    // ms per character while typing the command
const PING_GAP_MS  = 650;   // delay between each icmp_seq line

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type Variant =
  | "header"
  | "ping"
  | "interrupt"
  | "stat-header"
  | "stat"
  | "rtt"
  | "success"
  | "gap";

interface Line {
  id: number;
  variant: Variant;
  text: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Style map — intentionally monochrome, no green
// ─────────────────────────────────────────────────────────────────────────────
const VARIANT_CLASS: Record<Variant, string> = {
  header:       "text-zinc-500",
  ping:         "text-zinc-300",
  interrupt:    "text-[#e31b23]",          // site accent for ^C only
  "stat-header":"text-zinc-500",
  stat:         "text-zinc-400",
  rtt:          "text-zinc-400",
  success:      "text-white",
  gap:          "",
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function rndTime() {
  return (Math.random() * 2.2 + 0.4).toFixed(3);
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function PingIntro() {
  const [mounted,      setMounted]      = useState(false);
  const [visible,      setVisible]      = useState(false);
  const [promptReady,  setPromptReady]  = useState(false);
  const [typedCmd,     setTypedCmd]     = useState("");
  const [cmdDone,      setCmdDone]      = useState(false);
  const [lines,        setLines]        = useState<Line[]>([]);

  const timers  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Mount check ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    setMounted(true);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // ── Sequence ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return;

    // Generate random-but-realistic ping times
    const pt      = Array.from({ length: 4 }, rndTime);
    const vals    = pt.map(parseFloat);
    const min     = Math.min(...vals).toFixed(3);
    const max     = Math.max(...vals).toFixed(3);
    const avg     = (vals.reduce((a, b) => a + b, 0) / 4).toFixed(3);
    const mdev    = (Math.random() * 0.13 + 0.02).toFixed(3);
    const elapsed = Math.floor(Math.random() * 200 + 2850);

    let nextId = 0;
    const push = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };
    const addLine = (variant: Variant, text: string) => {
      const id = nextId++;
      setLines(prev => [...prev, { id, variant, text }]);
    };

    // 1. Show prompt
    push(() => setPromptReady(true), 200);

    // 2. Type command character-by-character
    push(() => {
      let i = 0;
      typerRef.current = setInterval(() => {
        i++;
        setTypedCmd(CMD.slice(0, i));
        if (i >= CMD.length) {
          clearInterval(typerRef.current!);
          typerRef.current = null;
          // Cursor disappears after a short pause (simulating Enter press)
          setTimeout(() => setCmdDone(true), 120);
        }
      }, TYPING_MS);
    }, 500);

    // Time at which command finishes printing
    const afterCmd = 600 + CMD.length * TYPING_MS + 350;

    // 3. PING header
    push(() => addLine("header", `PING ${HOST} (${IP}): 56 data bytes`), afterCmd);

    // 4. icmp responses
    for (let seq = 0; seq < 4; seq++) {
      push(
        () => addLine("ping", `64 bytes from ${IP}: icmp_seq=${seq} ttl=64 time=${pt[seq]} ms`),
        afterCmd + 260 + seq * PING_GAP_MS
      );
    }

    const afterPings = afterCmd + 260 + 4 * PING_GAP_MS;

    // 5. ^C
    push(() => addLine("interrupt", "^C"), afterPings + 350);

    // 6. Statistics block (indented 4 spaces)
    push(() => addLine("gap",         ""),                                                                          afterPings + 500);
    push(() => addLine("stat-header", `--- ${HOST} ping statistics ---`),                                          afterPings + 580);
    push(() => addLine("stat",        `    4 packets transmitted, 4 received, 0% packet loss, time ${elapsed}ms`), afterPings + 750);
    push(() => addLine("rtt",         `    rtt min/avg/max/mdev = ${min}/${avg}/${max}/${mdev} ms`),               afterPings + 920);

    // 7. Success
    push(() => addLine("gap",     ""),                       afterPings + 1100);
    push(() => addLine("success", "connection established."), afterPings + 1220);

    // 8. Fade out
    push(() => setVisible(false), afterPings + 2600);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      if (typerRef.current) clearInterval(typerRef.current);
    };
  }, [visible]);

  // ── Unmount after transition ───────────────────────────────────────────────
  useEffect(() => {
    if (!mounted || visible) return;
    const t = setTimeout(() => setMounted(false), 600);
    return () => clearTimeout(t);
  }, [visible, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ping-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeIn" } }}
          className="fixed inset-0 z-[10000] bg-[#0c0c0c] flex flex-col justify-start overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle scanlines for CRT texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.10) 2px,rgba(0,0,0,0.10) 4px)",
            }}
          />

          {/* Terminal content — starts top-left, no wrapping */}
          <div className="relative z-10 pt-[14vh] px-6 md:px-12 w-full font-mono text-[12.5px] md:text-[13.5px] leading-[1.6] tracking-normal">

            {/* ── Command prompt line ── */}
            {promptReady && (
              <div className="flex items-center gap-[0.5ch] whitespace-nowrap">
                <span className="text-zinc-500 select-none">C:\Users\scarecrow&gt;</span>
                <span className="text-white">{typedCmd}</span>
                {/* Blinking block cursor while typing */}
                {!cmdDone && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.55, ease: "linear" }}
                    className="inline-block w-[8px] h-[13px] bg-white align-middle translate-y-[1px]"
                  />
                )}
              </div>
            )}

            {/* ── Output lines ── */}
            {lines.map((line) => {
              if (line.variant === "gap") {
                return <div key={line.id} className="h-[0.25em]" />;
              }

              return (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.07 }}
                  className={`whitespace-nowrap ${VARIANT_CLASS[line.variant]}`}
                >
                  {line.text}

                  {/* Blinking cursor on the final "connection established." line */}
                  {line.variant === "success" && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.55, ease: "linear" }}
                      className="inline-block ml-[0.3em] w-[8px] h-[14px] bg-white align-middle translate-y-[1px]"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
