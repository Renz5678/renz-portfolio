import Planet from './Planet';
export default function ProjectFeature() {
  return <article id="project-tulong" className="cosmic-project-row cosmic-featured-planet" aria-labelledby="tulong-heading">
    <div className="cosmic-project-grid">
      <a className="cosmic-planet-link" href="#tulong-heading" aria-label="Discover PUP Tulong"><Planet label="01 / PUP Tulong" /></a>
      <div className="cosmic-project-copy"><span className="cosmic-eyebrow">Web application</span><h2 id="tulong-heading">PUP<br />Tulong<span aria-hidden="true">.</span></h2>
        <p className="cosmic-project-lede">A place for students to ask for a hand.</p>
        <p>A task marketplace built around a simple exchange: someone needs help, and someone else can offer it.</p>
        <dl><div><dt>The work</dt><dd>Developed task posting, matching, and management, with Google OAuth, OTP verification, and asynchronous notifications.</dd></div><div><dt>Built with</dt><dd>FastAPI · AWS Lambda · DynamoDB</dd></div></dl>
        <a className="cosmic-text-link" href="https://github.com/Renz5678/PUP-Tulong" target="_blank" rel="noopener noreferrer">Explore the repository <span aria-hidden="true">↗</span></a>
      </div>
    </div>

  </article>;
}
