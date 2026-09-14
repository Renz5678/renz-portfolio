import { achievements, education } from "@/data/portfolio";

export default function AchievementsEducation() {
  return (
    <section
      id="honors"
      className="py-24 lg:py-32 hairline-b"
      aria-labelledby="honors-heading"
    >
      {/* Section label */}
      <div className="font-mono text-xs tracking-[0.22em] text-primary-container uppercase mb-8 group inline-flex items-center gap-1 cursor-default">
        <span className="text-zinc-500 group-hover:text-primary-container transition-colors">
          $
        </span>
        <span className="group-hover:text-white transition-colors">
          {"cat achievements.log && cat education.txt"}
        </span>
        <span className="text-zinc-600">[06/07]</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-container ml-1 font-bold">
          {">_"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Achievements */}
        <div className="lg:col-span-6 reveal-item">
          <h2
            id="honors-heading"
            className="font-mono text-xl sm:text-2xl font-semibold text-white uppercase mb-8 flex items-center gap-2"
          >
            <span className="text-primary-container">#</span>
            achievements &amp; honors
          </h2>
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="border-l border-zinc-800 pl-4 py-1.5 hover:border-primary-container hover:bg-neutral-900/30 transition-all duration-200 rounded-r group"
              >
                <div className="text-sm font-mono text-white font-medium group-hover:text-primary transition-colors">
                  {achievement.title}
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  {achievement.institution}
                </div>
                <p className="text-xs text-zinc-500 mt-1 font-mono group-hover:text-zinc-400 transition-colors">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="lg:col-span-6 reveal-item">
          <h2 className="font-mono text-xl sm:text-2xl font-semibold text-white uppercase mb-8 flex items-center gap-2">
            <span className="text-primary-container">#</span>
            education
          </h2>
          <div className="border border-zinc-900 bg-zinc-950/40 p-6 hover:border-neutral-700 hover:bg-neutral-900/40 hover:-translate-y-0.5 transition-all duration-300 rounded group">
            <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">
              // tertiary degree
            </div>
            <h3 className="font-display text-xl text-white font-medium mt-1 group-hover:text-primary transition-colors">
              {education.institution}
            </h3>
            <div className="font-mono text-xs text-zinc-300 mt-1">
              {education.location}
            </div>
            <div className="font-mono text-sm text-primary-container mt-3 font-medium">
              {education.degree}
            </div>
            <div className="text-xs font-mono text-zinc-400 mt-1">
              expected graduation: {education.expectedGrad} ({education.year})
            </div>

            {/* Honors */}
            <div className="mt-6 pt-5 border-t border-zinc-900 group-hover:border-zinc-800 transition-colors">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-2">
                academic honors
              </span>
              {education.honors.map((honor, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 text-xs font-mono bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 text-zinc-300 hover:border-primary-container hover:text-white transition-all duration-200 cursor-default"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"
                    aria-hidden="true"
                  />
                  <span>{honor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
