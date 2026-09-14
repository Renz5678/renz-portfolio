"use client";

import { useEffect, useState } from "react";
import { useCountUp } from "@/hooks/useScrollReveal";
import { hero } from "@/data/portfolio";

function StatCounter({
  target,
  label,
  reducedMotion,
}: {
  target: number;
  label: string;
  reducedMotion: boolean;
}) {
  const ref = useCountUp(target, 1400, !reducedMotion);
  return (
    <div className="group cursor-default p-2 -ml-2 rounded hover:bg-zinc-900/40 transition-colors">
      <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight group-hover:text-primary-container group-hover:translate-x-0.5 transition-all">
        <span ref={ref}>{target}+</span>
      </div>
      <div className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest mt-0.5 group-hover:text-zinc-400">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="unveil"
      className="relative w-full h-screen flex flex-col justify-between p-8 lg:p-14 z-40 bg-background select-none"
      aria-label="Hero — introduction"
    >
      {/* Top metadata bar */}
      <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest text-zinc-500">
        <span className="flex items-center gap-2 group cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container group-hover:scale-125 transition-transform" aria-hidden="true" />
          <span className="group-hover:text-zinc-300 transition-colors">
            portfolio // {hero.name.toLowerCase()}
          </span>
        </span>
        <span className="hidden md:inline-block hover:text-zinc-300 transition-colors cursor-default">
          {hero.location.toLowerCase()}
        </span>
        <span className="text-emerald-400 flex items-center gap-1.5 hover:brightness-125 transition-all cursor-default">
          <span
            className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${reducedMotion ? "" : "animate-pulse"}`}
            aria-hidden="true"
          />
          {hero.availability}
        </span>
      </div>

      {/* Centerpiece */}
      <div className="my-auto py-6">
        {/* Terminal prompt */}
        <p className="font-mono text-xs sm:text-sm tracking-wider text-zinc-400 mb-5 flex items-center gap-2">
          <span className="text-primary-container font-semibold">
            {hero.prompt.split(" ")[0]}
          </span>
          <span className="hover:text-white transition-colors">
            {hero.prompt.split(" ").slice(1).join(" ")}
          </span>
          <span className="text-zinc-500">{hero.promptComment}</span>
        </p>

        {/* Name heading */}
        <h1 className="font-mono font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5.8rem] tracking-tight leading-[0.94] text-white flex flex-col items-start select-text">
          <span className="hover:text-zinc-100 transition-colors">
            {`> ${hero.name.toLowerCase()}`}
            <span
              className={`terminal-cursor text-primary-container ml-2 inline-block ${reducedMotion ? "opacity-100" : ""}`}
              aria-hidden="true"
            >
              _
            </span>
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-zinc-300 text-xs sm:text-sm md:text-base font-mono max-w-2xl leading-relaxed border-l border-zinc-800 hover:border-primary-container pl-4 transition-colors">
          <span className="text-primary-container font-medium">stdout:</span>{" "}
          {hero.tagline}
        </p>

        {/* Stat counters */}
        <div
          className="grid grid-cols-3 max-w-lg gap-4 mt-8 pt-6 border-t border-zinc-900"
          aria-label="Quick stats"
        >
          {hero.stats.map(({ value, label }) => {
            const numericValue = parseInt(value.replace("+", ""));
            return (
              <StatCounter
                key={label}
                target={numericValue}
                label={label}
                reducedMotion={reducedMotion}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-end justify-between font-mono text-[11px] tracking-widest text-zinc-600">
        <div className="flex items-center gap-3 group cursor-default">
          <span className="inline-block w-6 h-[1px] bg-primary-container group-hover:w-10 transition-all duration-300" aria-hidden="true" />
          <span className="text-zinc-400 group-hover:text-white transition-colors">
            {hero.school.toLowerCase()}
          </span>
        </div>

        {/* Scroll CTA */}
        <div className="flex flex-col items-center gap-2 cursor-pointer group p-2 transition-transform hover:-translate-y-1 duration-200">
          <button
            onClick={scrollToAbout}
            aria-label="Scroll to about section"
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.22em] text-zinc-400 group-hover:text-primary-container transition-colors">
              [ scroll to unveil ]
            </span>
            <span
              className={`text-primary-container text-sm ${reducedMotion ? "" : "animate-bounce"} group-hover:scale-125 transition-transform`}
              aria-hidden="true"
            >
              ↓
            </span>
          </button>
        </div>

        <div className="hidden sm:block text-right">
          <span className="hover:text-zinc-400 transition-colors cursor-default">
            terminal status: ready
          </span>
        </div>
      </div>
    </section>
  );
}
