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
      className="relative h-[500vh] bg-background"
      aria-label="projects"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Section marker */}
        <div className="absolute top-12 md:top-1/4 left-6 lg:left-12 z-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            <span className="text-primary-container block mb-2 text-lg font-normal opacity-80">
              renz@dev:~$ ls -la ./deployments
            </span>
            total {projects.length}
          </h2>
        </div>

        {/* Horizontal scroll track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 px-6 lg:px-[30vw] items-center h-full pt-20 md:pt-0"
        >
          {projects.map((project) => (
            <motion.article
              key={project.index}
              initial={{ opacity: 0.4, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ root: targetRef, amount: "all", margin: "0px -20% 0px -20%" }}
              transition={{ duration: 0.4 }}
              className="relative flex-shrink-0 w-[85vw] sm:w-[400px] h-[520px] bg-zinc-950 border border-zinc-700 flex flex-col justify-between p-8 group cursor-pointer overflow-hidden transition-colors hover:border-primary-container"
              onClick={() => window.open(project.githubUrl, "_blank")}
            >
              {/* Terminal Window Header Bar */}
              <div className="absolute top-0 left-0 w-full h-8 border-b border-zinc-700 bg-zinc-900 flex items-center px-4 gap-2">
                <div className="w-2 h-2 rounded-sm bg-zinc-600 group-hover:bg-primary-container transition-colors" />
                <div className="w-2 h-2 rounded-sm bg-zinc-600 group-hover:bg-amber-500 transition-colors" />
                <div className="w-2 h-2 rounded-sm bg-zinc-600 group-hover:bg-emerald-500 transition-colors" />
                <span className="ml-auto text-[10px] text-zinc-500">{project.index.replace(".", "")}</span>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-primary-container transition-colors">
                  {project.title}
                </h3>
                <div className="text-[10px] text-zinc-500 tracking-widest mt-2">
                  {project.role}
                </div>
                
                <p className="mt-8 text-sm text-zinc-400 leading-relaxed max-w-[90%] relative z-10">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex gap-3 mt-8 relative z-10">
                  {project.techTags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-[10px] text-zinc-300">
                      {tag}
                    </span>
                  ))}
                  {project.techTags.length > 2 && (
                    <span className="text-[10px] text-zinc-600">
                      +[ {project.techTags.length - 2} ]
                    </span>
                  )}
                </div>
              </div>

              {/* Action button */}
              <div className="flex justify-between items-end relative z-10">
                <span className="text-xs text-primary-container opacity-0 group-hover:opacity-100 transition-opacity">
                  [{project.dateRange}]
                </span>
                <span className="w-10 h-10 border border-zinc-700 flex items-center justify-center group-hover:bg-primary-container group-hover:border-primary-container group-hover:text-black transition-all text-zinc-500">
                  ↗
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
