"use client";

import { projects } from "@/data/portfolio";

export default function Projects() {
  return (
    <section
      id="works"
      className="py-24 lg:py-32 hairline-b"
      aria-labelledby="works-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
        <div>
          <div className="font-mono text-xs tracking-[0.22em] text-primary-container uppercase mb-2 group inline-flex items-center gap-1 cursor-default">
            <span className="text-zinc-500 group-hover:text-primary-container transition-colors">
              $
            </span>
            <span className="group-hover:text-white transition-colors">
              {"ls -la ./projects/"}
            </span>
            <span className="text-zinc-600">[02/07]</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-container ml-1 font-bold">
              {">_"}
            </span>
          </div>
          <h2
            id="works-heading"
            className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-white uppercase"
          >
            <span className="text-primary-container font-mono mr-2">#</span>
            selected deployments &amp; software
          </h2>
        </div>
        <div className="font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors cursor-default">
          [ 05 curated entries ]
        </div>
      </div>

      {/* Project list */}
      <div className="divide-y divide-zinc-900 border-y border-zinc-900">
        {projects.map((project) => (
          <article
            key={project.index}
            className="transition-all duration-300 ease-out group hover:bg-neutral-900/50 hover:pl-4 hover:border-l-2 hover:border-[#e31b23] rounded-r-md cursor-pointer py-10 reveal-item"
            onClick={() => window.open(project.githubUrl, "_blank")}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                window.open(project.githubUrl, "_blank");
            }}
            role="link"
            aria-label={`${project.title} — ${project.description}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
              {/* Index */}
              <div className="lg:col-span-1 font-mono text-xs text-zinc-600 group-hover:text-primary-container transition-colors duration-200">
                {project.index}
              </div>

              {/* Title + date */}
              <div className="lg:col-span-4">
                <h3 className="font-display text-2xl sm:text-3xl text-zinc-200 group-hover:text-[#e31b23] group-hover:translate-x-1 transition-all duration-200 font-medium">
                  {project.title}
                </h3>
                <span className="font-mono text-[11px] text-zinc-500 block mt-1 tracking-wider uppercase group-hover:text-zinc-400 transition-colors">
                  {project.role} // {project.dateRange}
                </span>
              </div>

              {/* Description + tags */}
              <div className="lg:col-span-5 text-zinc-400 text-sm font-light leading-relaxed">
                {project.description}
                <div className="flex flex-wrap gap-2 mt-4 font-mono text-[11px] text-zinc-500">
                  {project.techTags.map((tag, i) => (
                    <span
                      key={i}
                      className={`border border-transparent hover:border-[#e31b23]/60 hover:text-white hover:bg-[#e31b23]/15 transition-all duration-200 cursor-default px-1.5 py-0.5 rounded ${
                        i === 0 ? "text-zinc-300" : "text-zinc-400"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link */}
              <div className="lg:col-span-2 flex lg:justify-end items-center gap-3 pt-2 lg:pt-0">
                <a
                  href={project.githubUrl}
                  onClick={(e) => e.stopPropagation()}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="font-mono text-xs tracking-wider text-zinc-400 hover:text-primary-container inline-flex items-center gap-1 group/btn transition-all"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <span className="group-hover/btn:text-white transition-colors">
                    inspect
                  </span>
                  <span className="text-[14px] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 group-hover/btn:text-white transition-transform duration-200">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
