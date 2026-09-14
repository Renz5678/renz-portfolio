import CharStagger from "@/components/ui/CharStagger";
import TextReveal from "@/components/ui/TextReveal";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 lg:py-48 min-h-screen flex items-center"
      aria-labelledby="about-heading"
    >
      <div className="w-full max-w-5xl px-6 md:px-12">
        <h2 id="about-heading" className="sr-only">about</h2>
        
        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold text-white leading-[1.3] tracking-tight mb-12">
          <TextReveal>
            <span className="text-primary-container block mb-6 text-xl md:text-3xl font-normal opacity-80">
              renz@dev:~$ cat about.txt
            </span>
          </TextReveal>
          
          <span className="inline-block mr-3 md:mr-4"><CharStagger text="engineering" className="text-zinc-100 hover:text-white transition-colors" delay={0.2} /></span>
          <span className="inline-block mr-3 md:mr-4"><CharStagger text="resilient" className="text-zinc-400 hover:text-zinc-200 transition-colors" delay={0.6} /></span>
          <span className="inline-block"><CharStagger text="systems." className="text-primary-container" delay={1.0} /></span>
        </div>

        <TextReveal delay={1.4} className="mt-16">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm tracking-widest text-zinc-500">
            <span className="text-white">3+ yrs</span>
            <span className="w-1.5 h-1.5 bg-zinc-800" />
            <span className="text-white">5+ projects</span>
            <span className="w-1.5 h-1.5 bg-zinc-800" />
            <span className="text-white">6+ stacks</span>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}
