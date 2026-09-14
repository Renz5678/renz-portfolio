import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section
      id="trajectory"
      className="py-24 lg:py-32 hairline-b"
      aria-labelledby="trajectory-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
        <div>
          <div className="font-mono text-xs tracking-[0.22em] text-primary-container uppercase mb-2 group inline-flex items-center gap-1 cursor-default">
            <span className="text-zinc-500 group-hover:text-primary-container transition-colors">
              $
            </span>
            <span className="group-hover:text-white transition-colors">
              git log --trajectory
            </span>
            <span className="text-zinc-600">[04/07]</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-container ml-1 font-bold">
              {">_"}
            </span>
          </div>
          <h2
            id="trajectory-heading"
            className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-white uppercase"
          >
            <span className="text-primary-container font-mono mr-2">#</span>
            experience &amp; fellowships
          </h2>
        </div>
        <div className="font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors cursor-default">
          [ verified engineering roles ]
        </div>
      </div>

      {/* Global placeholder notice */}
      <div className="mb-10 p-4 border border-dashed border-yellow-600/40 bg-yellow-900/10 rounded font-mono text-xs text-yellow-500/80">
        <span className="font-bold text-yellow-400">[⚠ PLACEHOLDER]</span> —
        experience entries below are marked as TODO. replace with final
        confirmed roles before publishing.
      </div>

      <div className="space-y-16">
        {experience.map((entry, index) => (
          <div
            key={index}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 reveal-item p-4 -m-4 rounded border border-transparent hover:border-neutral-700 hover:bg-neutral-900/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Placeholder badge overlay */}
            {entry.isPlaceholder && (
              <div className="absolute top-4 right-4 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase border border-yellow-600/50 text-yellow-500 bg-yellow-900/20 z-10">
                [TODO]
              </div>
            )}

            {/* Left — date / meta */}
            <div className="lg:col-span-3 font-mono text-xs text-zinc-500 pt-1">
              <div className={entry.isActive ? "text-white font-medium" : "text-zinc-300"}>
                {entry.dateRange}
              </div>
              <div className="text-zinc-600 mt-0.5">{entry.meta}</div>
              {entry.isActive && (
                <div className="inline-block mt-3 px-2 py-0.5 text-[10px] tracking-wider uppercase border border-primary-container/40 text-primary-container active-badge-pulse hover:border-primary-container transition-all cursor-default">
                  active tenure
                </div>
              )}
            </div>

            {/* Right — role details */}
            <div className="lg:col-span-9 pl-0 lg:pl-10 border-l-0 lg:border-l border-zinc-800">
              <h3 className="font-display text-2xl text-white font-medium hover:text-primary transition-colors">
                {entry.company}
              </h3>
              <div className="font-mono text-xs text-zinc-400 mt-1 mb-4">
                {entry.role}
              </div>
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                {entry.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
