import { techStack } from "@/data/portfolio";

export default function TechStack() {
  return (
    <section
      id="capabilities"
      className="py-24 lg:py-32 hairline-b"
      aria-labelledby="capabilities-heading"
    >
      <div className="font-mono text-xs tracking-[0.22em] text-primary-container uppercase mb-2 group inline-flex items-center gap-1 cursor-default">
        <span className="text-zinc-500 group-hover:text-primary-container transition-colors">
          $
        </span>
        <span className="group-hover:text-white transition-colors">
          cat capabilities.matrix
        </span>
        <span className="text-zinc-600">[03/07]</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-container ml-1 font-bold">
          {">_"}
        </span>
      </div>

      <h2
        id="capabilities-heading"
        className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-16 uppercase"
      >
        <span className="text-primary-container font-mono mr-2">#</span>
        technologies &amp; toolchains
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {techStack.map((group) => (
          <div
            key={group.id}
            className="reveal-item p-4 -m-4 rounded-md hover:bg-neutral-900/30 transition-all duration-300 border border-transparent hover:border-zinc-800/80"
          >
            {/* Group header */}
            <div className="font-mono text-xs text-zinc-400 pb-3 border-b border-zinc-800 flex justify-between items-center mb-5 hover:text-white transition-colors">
              <span className="hover:text-primary-container transition-colors">
                {group.header}
              </span>
              <span className="text-primary-container">{group.badge}</span>
            </div>

            {/* Items */}
            <ul className="space-y-3 font-mono text-xs" role="list">
              {group.items.map((item, i) => (
                <li
                  key={item.name}
                  className={`flex justify-between hover:text-[#e31b23] hover:translate-x-1 transition-all duration-150 cursor-pointer p-1 -m-1 rounded hover:bg-neutral-900/40 ${
                    i < 3 ? "text-zinc-300" : "text-zinc-400"
                  }`}
                >
                  <span className="inline-block">{item.name}</span>
                  <span className="text-zinc-600">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
