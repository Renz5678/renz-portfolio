export default function ProjectFeature() {
  return <section id="works" className="cosmic-work" aria-labelledby="cosmic-work-heading">
    <div className="cosmic-section-top"><span className="cosmic-eyebrow">Selected work</span><span className="cosmic-note">01 / a way to help</span></div>
    <div className="cosmic-project-grid">
      <div className="cosmic-project-art" role="img" aria-label="Abstract illustration of small points connected around a shared center, representing students helping one another">
        <svg viewBox="0 0 600 540" aria-hidden="true">
          <circle cx="300" cy="270" r="170" fill="none" stroke="#405d60" strokeDasharray="2 12" />
          <circle cx="300" cy="270" r="112" fill="none" stroke="#2b454b" />
          <path d="M173 158 300 270 444 195M300 270 383 405M300 270 139 350" fill="none" stroke="#607c79" />
          <path d="M300 230v80m-40-40h80" stroke="#dabb89" strokeWidth="2" />
          {[[173,158],[444,195],[383,405],[139,350]].map(([x,y])=><g key={x}><rect x={x-4} y={y-4} width="8" height="8" fill="#acbeb8"/><circle cx={x} cy={y} r="15" fill="none" stroke="#3f5b5e" /></g>)}
        </svg>
        <span className="cosmic-art-caption">Small acts. Shared possibilities.</span>
      </div>
      <div className="cosmic-project-copy"><span className="cosmic-eyebrow">Web application</span><h2 id="cosmic-work-heading">PUP Tulong<span aria-hidden="true">.</span></h2>
        <p className="cosmic-project-lede">A place for students to ask for a hand.</p>
        <p>A task marketplace built around a simple exchange: someone needs help, and someone else can offer it.</p>
        <dl><div><dt>The work</dt><dd>Posting and claiming requests, completion confirmation, ratings, and student profiles.</dd></div><div><dt>Built with</dt><dd>FastAPI · DynamoDB · Docker</dd></div></dl>
        <a className="cosmic-text-link" href="https://github.com/Renz5678/PUP-Tulong" target="_blank" rel="noopener noreferrer">Explore the repository <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>;
}
