import CustomCursor from "@/components/cursor/CustomCursor";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import AchievementsEducation from "@/components/sections/AchievementsEducation";
import Contact from "@/components/sections/Contact";
import ScrollRevealInit from "@/components/ScrollRevealInit";

export default function Home() {
  return (
    <>
      {/* Custom cursor (client, fine-pointer only) */}
      <CustomCursor />

      {/* Scroll-reveal IntersectionObserver init (client, no DOM output) */}
      <ScrollRevealInit />

      {/* Persistent navigation */}
      <Nav />

      {/* Hero unveil panel (full-screen) */}
      <Hero />

      {/* Main editorial body */}
      <main className="w-full max-w-8xl mx-auto px-6 lg:px-12 relative z-30">
        <About />
        <Projects />
        <TechStack />
        <Experience />
        <AchievementsEducation />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
