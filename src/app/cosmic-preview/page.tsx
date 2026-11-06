import type { Metadata } from 'next';
import JourneyNav from '@/components/cosmic/JourneyNav';
import Atmosphere from '@/components/cosmic/Atmosphere';
import ProjectFeature from '@/components/cosmic/ProjectFeature';
import RockyCompanion from '@/components/rocky/RockyCompanion';
import { contact } from '@/data/portfolio';
import './cosmic.css';
export const metadata: Metadata = { title: 'Lawrenz Garcia — Cosmic study', robots: { index: false, follow: false }, openGraph: { title: 'Lawrenz Garcia — Cosmic study', images: [] }, twitter: { images: [] } };
export default function CosmicPreview() {
  return <div className="cosmic-experience">
    <a href="#cosmic-main" className="cosmic-skip">Skip to content</a><JourneyNav />
    <main id="cosmic-main">
      <section id="unveil" className="cosmic-hero" aria-labelledby="cosmic-name"><Atmosphere />
        <div className="cosmic-hero-content"><p className="cosmic-eyebrow">Lawrenz Garcia · Developer</p>
          <h1 id="cosmic-name">A little curious.<br />A little <em>cosmic.</em></h1>
          <p className="cosmic-introduction">I build things for the world down here.<br />My mind wanders a little further.</p>
          <a className="cosmic-text-link" href="#works">Discover the work <span aria-hidden="true">↓</span></a>
        </div>
        <div className="cosmic-hero-companion"><RockyCompanion /></div>
        <div className="cosmic-hero-foot"><span>Based on Earth. Building with curiosity.</span><a href="#about">A little further down ↓</a></div>
      </section>
      <div className="cosmic-reading">
        <section id="about" className="cosmic-about" aria-labelledby="cosmic-about-heading"><span className="cosmic-eyebrow">The human behind the work</span><div><h2 id="cosmic-about-heading">Hello, I’m Lawrenz.<br /><em>You can call me Renz.</em></h2><p>A computer science student at the Polytechnic University of the Philippines. I build web and mobile tools, and I like figuring out what makes them work.</p><p>I’m drawn to useful ideas, unfamiliar problems, and the small details that make something feel considered.</p></div></section>
        <ProjectFeature />
        <section id="contact" className="cosmic-contact" aria-labelledby="cosmic-contact-heading"><span className="cosmic-eyebrow">Until our paths cross</span><h2 id="cosmic-contact-heading">Something in mind?<br /><em>Let’s make it real.</em></h2><a className="cosmic-text-link cosmic-email" href={`mailto:${contact.email}`}>Say hello <span aria-hidden="true">↗</span></a><nav aria-label="Connect"><a href={contact.github}>GitHub ↗</a><a href={contact.linkedin}>LinkedIn ↗</a><a href="/cv/lawrenz-garcia-cv.pdf">Résumé ↗</a></nav></section>
        <footer className="cosmic-footer"><span>Lawrenz Garcia</span><a href="#unveil">Back to the stars ↑</a></footer>
      </div>
    </main>
  </div>;
}
