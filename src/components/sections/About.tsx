import { about } from "@/data/portfolio";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32 hairline-b"
      aria-labelledby="about-heading"
    >
      {/* Section label */}
      <div className="font-mono text-xs tracking-[0.22em] text-primary-container uppercase mb-8 group inline-flex items-center gap-1 cursor-default">
        <span className="text-zinc-500 group-hover:text-primary-container transition-colors">
          $
        </span>
        <span className="group-hover:text-white transition-colors">
          lawrenz --profile
        </span>
        <span className="text-zinc-600">[01/07]</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-container ml-1 font-bold">
          {">_"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left — quote + bio */}
        <div className="lg:col-span-8">
          <blockquote
            id="about-heading"
            className="font-mono text-xl sm:text-2xl md:text-3xl font-normal text-zinc-100 leading-relaxed tracking-normal reveal-item border-l-2 border-primary-container/60 pl-6 hover:border-primary-container hover:bg-neutral-950/40 p-3 transition-all duration-300"
          >
            <span className="text-primary-container mr-2 text-xl font-bold">
              {`>>`}
            </span>
            &ldquo;{about.quote}&rdquo;
          </blockquote>

          <p className="mt-10 text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl reveal-item">
            hi, i&apos;m{" "}
            <span className="text-white font-medium hover:text-primary transition-colors cursor-default">
              lawrenz matthew garcia
            </span>
            . {about.bio.replace(/^hi, i'm lawrenz matthew garcia\. /, "")}
          </p>
        </div>

        {/* Right — metadata sidebar */}
        <aside
          className="lg:col-span-4 flex flex-col justify-between pt-2 space-y-8 border-l border-zinc-800/80 pl-8 lg:pl-10 reveal-item"
          aria-label="Profile metadata"
        >
          {/* Availability */}
          <div className="p-3 -ml-3 rounded transition-all duration-300 hover:bg-neutral-900/40 hover:border-l-2 hover:border-primary-container">
            <div className="font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase mb-1">
              availability
            </div>
            <div className="text-white text-xs font-medium flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                aria-hidden="true"
              />
              {about.availability}
            </div>
            <div className="text-zinc-500 text-xs font-mono mt-1">
              {about.location}
            </div>
          </div>

          {/* Core focus */}
          <div className="p-3 -ml-3 rounded transition-all duration-300 hover:bg-neutral-900/40 hover:border-l-2 hover:border-primary-container">
            <div className="font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase mb-1">
              core focus
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed font-mono">
              {about.coreFocus}
            </p>
          </div>

          {/* Direct channel */}
          <div className="p-3 -ml-3 rounded transition-all duration-300 hover:bg-neutral-900/40 hover:border-l-2 hover:border-primary-container">
            <div className="font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase mb-1">
              direct channel
            </div>
            <p className="text-zinc-300 text-xs font-mono hover:text-primary-container transition-colors">
              <a href={`mailto:${about.email}`}>{about.email}</a>
            </p>
            <p className="text-zinc-400 text-xs font-mono mt-0.5 hover:text-white transition-colors">
              <a href={`tel:${about.phone.replace(/\s/g, "")}`}>
                {about.phone}
              </a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
