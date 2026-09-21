import CharStagger from "@/components/ui/CharStagger";
import TextReveal from "@/components/ui/TextReveal";
import { about } from "@/data/portfolio";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 lg:py-48 min-h-screen flex items-center"
      aria-labelledby="about-heading"
    >
      <div className="w-full max-w-5xl px-6 md:px-12">
        {/* Section identifier — a file path, not a repeated prompt */}
        <TextReveal>
          <div className="font-mono text-xs text-fg-muted mb-12 tracking-wide">
            ~/about.md
          </div>
        </TextReveal>

        {/* Headline — Space Grotesk, large */}
        <h2
          id="about-heading"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-bold text-fg leading-[1.1] tracking-tight mb-8"
        >
          <span className="inline-block mr-3 md:mr-4">
            <CharStagger text="engineering" className="text-fg hover:text-fg transition-colors" delay={0.1} />
          </span>
          <span className="inline-block mr-3 md:mr-4">
            <CharStagger text="resilient" className="text-fg-muted hover:text-fg transition-colors" delay={0.4} />
          </span>
          <span className="inline-block">
            <CharStagger text="systems." className="text-signal" delay={0.7} />
          </span>
        </h2>

        {/* Bio — Inter prose, max ~65ch */}
        <TextReveal delay={0.8} className="mt-8">
          <p className="font-sans text-base text-fg-muted leading-relaxed max-w-[65ch]">
            {about.bio}
          </p>
        </TextReveal>

        {/* Stats — inline, no square markers, monospace for the numbers */}
        <TextReveal delay={1.2} className="mt-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-sans text-sm text-fg-muted">
            <span>
              <span className="font-mono text-fg font-semibold">3+</span>
              {" "}years coding
            </span>
            <span className="text-border">·</span>
            <span>
              <span className="font-mono text-fg font-semibold">5+</span>
              {" "}projects shipped
            </span>
            <span className="text-border">·</span>
            <span>
              <span className="font-mono text-fg font-semibold">6+</span>
              {" "}stacks
            </span>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}
