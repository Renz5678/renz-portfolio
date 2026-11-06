import JourneyMotion from '@/components/cosmic/JourneyMotion';
import PlanetGallery from '@/components/cosmic/PlanetGallery';
import JourneyNav from '@/components/cosmic/JourneyNav';
import Atmosphere from '@/components/cosmic/Atmosphere';
import JourneyRocky from '@/components/rocky/JourneyRocky';
import Capabilities from '@/components/cosmic/Capabilities';
import Background from '@/components/cosmic/Background';
import AsciiPortrait from '@/components/cosmic/AsciiPortrait';
import { contact } from '@/data/portfolio';
export default function CosmicPortfolio() {
  return <div className="cosmic-experience">
    <a href="#cosmic-main" className="cosmic-skip">Skip to content</a><JourneyNav />
    <Atmosphere /><JourneyMotion /><main id="cosmic-main" tabIndex={-1}>
      <section id="unveil" className="cosmic-hero" aria-labelledby="cosmic-name">
        <div className="cosmic-hero-content"><p className="cosmic-eyebrow">Full-stack developer / Philippines</p>
          <h1 id="cosmic-name"><span className="cosmic-title-line">Lawrenz</span><span className="cosmic-title-line cosmic-title-offset">Garcia<span className="cosmic-title-period">.</span></span></h1>
          <p className="cosmic-introduction">I build web and mobile applications.<br />From the interface to the API and database.</p>
          <a className="cosmic-text-link" href="#works">See what I’m building <span aria-hidden="true">↓</span></a>
        </div>
        <div className="cosmic-hero-foot"><span>Based on Earth. Building with curiosity.</span><a href="#about">A little further down ↓</a></div>
      </section>
      <div className="cosmic-reading">
        <section id="about" className="cosmic-about" aria-labelledby="cosmic-about-heading"><AsciiPortrait /><div><span className="cosmic-eyebrow">The human behind the work</span><h2 id="cosmic-about-heading">Down to earth.<br /><em>Eyes on what’s next.</em></h2><p>A computer science student at the Polytechnic University of the Philippines. I build web and mobile tools, and I like figuring out what makes them work.</p><p>I’m drawn to useful ideas, unfamiliar problems, and the small details that make something feel considered.</p></div></section>
        <PlanetGallery /><Capabilities /><Background />
        <section id="contact" className="cosmic-contact" aria-labelledby="cosmic-contact-heading"><span className="cosmic-eyebrow">Until our paths cross</span><h2 id="cosmic-contact-heading">Good things<br /><em>start with hello.</em></h2><a className="cosmic-text-link cosmic-email" href={`mailto:${contact.email}`}>Say hello <span aria-hidden="true">↗</span></a><nav aria-label="Connect"><a href={contact.github}>GitHub ↗</a><a href={contact.linkedin}>LinkedIn ↗</a><a href="/cv/lawrenz-garcia-cv.pdf">Résumé ↗</a></nav></section>
        <footer className="cosmic-footer"><span>Lawrenz Garcia</span><a href="#unveil">Back to the stars ↑</a></footer>
      </div>
    </main><JourneyRocky />
  </div>;
}
