import { leadership } from "@/data/portfolio";

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="py-24 lg:py-32 hairline-b"
      aria-labelledby="leadership-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
        <div>
          <div className="font-mono text-xs tracking-[0.22em] text-primary-container uppercase mb-2 group inline-flex items-center gap-1 cursor-default">
            <span className="text-zinc-500 group-hover:text-primary-container transition-colors">
              $
            </span>
            <span className="group-hover:text-white transition-colors">
              lawrenz --leadership
            </span>
            <span className="text-zinc-600">[05/07]</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-container ml-1 font-bold">
              {">_"}
            </span>
          </div>
          <h2
            id="leadership-heading"
            className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-white uppercase"
          >
            <span className="text-primary-container font-mono mr-2">#</span>
            leadership &amp; community direction
          </h2>
        </div>
        <div className="font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors cursor-default">
          [ 03 appointed positions ]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {leadership.map((entry, index) => (
          <div
            key={index}
            className="border border-zinc-900 bg-zinc-950/40 p-6 reveal-item hover:border-neutral-700 hover:bg-neutral-900/40 hover:-translate-y-0.5 transition-all duration-300 rounded group"
          >
            <div className="font-mono text-[10px] text-primary-container tracking-wider uppercase mb-2 group-hover:text-white transition-colors">
              {entry.category}
            </div>
            <h3 className="font-display text-xl text-white font-medium group-hover:text-primary transition-colors">
              {entry.org}
            </h3>
            <div className="font-mono text-xs text-zinc-400 mt-1 mb-3">
              {entry.role}
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed group-hover:text-zinc-300 transition-colors">
              {entry.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
