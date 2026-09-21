"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { projects } from "@/data/portfolio";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { smoothProgress } = useScrollProgress(targetRef, {
    offset: ["start start", "end end"]
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section
      id="works"
      ref={targetRef}
      className="relative h-[500vh] bg-bg"
      aria-label="projects"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        {/* Section identifier — left rail */}
        <div className="absolute top-10 md:top-12 left-6 lg:left-12 z-20">
          <div className="font-mono text-xs text-fg-muted mb-3 tracking-wide">
            ~/deployments/
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-fg tracking-tight">
            work
          </h2>
        </div>

        {/* Horizontal scroll track — no macOS chrome, just clean cards */}
        <motion.div
          style={{ x }}
          className="flex gap-6 px-6 lg:px-[30vw] items-center h-full pt-28 md:pt-0"
        >
          {projects.map((project) => (
            <motion.article
              key={project.index}
              initial={{ opacity: 0.5, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ root: targetRef, amount: "all", margin: "0px -20% 0px -20%" }}
              transition={{ duration: 0.4 }}
              className="relative flex-shrink-0 w-[85vw] sm:w-[420px] h-[500px] bg-surface border border-border flex flex-col justify-between p-8 group cursor-pointer overflow-hidden transition-colors duration-300 hover:border-border-bright"
              onClick={() => window.open(project.githubUrl, "_blank")}
            >
              {/* Top metadata — no fake window dots */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[10px] text-fg-dim tracking-widest mb-4">
                    {project.index.replace(".", "")}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-fg group-hover:text-signal transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="font-sans text-xs text-fg-muted mt-1">
                    {project.role}
                  </div>
                </div>
                {/* Date — top right */}
                <div className="font-mono text-[10px] text-fg-dim tracking-wide text-right">
                  {project.dateRange}
                </div>
              </div>

              {/* Description — Inter prose */}
              <div className="flex-1 flex items-center">
                <p className="font-sans text-sm text-fg-muted leading-relaxed max-w-[90%]">
                  {project.description}
                </p>
              </div>

              {/* Footer — tech tags and link */}
              <div className="flex items-end justify-between">
                {/* Tech tags — monospace, no brackets */}
                <div className="flex flex-wrap gap-3">
                  {project.techTags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono text-[10px] text-fg-muted border border-border px-2 py-0.5 group-hover:border-border-bright transition-colors"
                    >
                      {/* Strip the [ ] from tag data */}
                      {tag.replace(/[\[\]]/g, "")}
                    </span>
                  ))}
                  {project.techTags.length > 3 && (
                    <span className="font-mono text-[10px] text-fg-dim">
                      +{project.techTags.length - 3}
                    </span>
                  )}
                </div>

                {/* Open link — plain arrow, no box */}
                <span className="font-mono text-lg text-fg-dim group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                  ↗
                </span>
              </div>

              {/* Hover left-border accent */}
              <div className="absolute left-0 top-0 w-[2px] h-0 bg-signal group-hover:h-full transition-all duration-500 ease-out" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
