import Planet from './Planet';
import { selectedProjects } from '@/data/cosmic-portfolio';
export default function MoreWork() {
  return <>
    {selectedProjects.map((project, index) => <article id={`project-${project.id}`} className="cosmic-project-row" key={project.id}>
      <a className="cosmic-planet-link" href={`#details-${project.id}`} aria-label={`Discover ${project.title}`}><Planet variant={project.id} label={String(index+2).padStart(2,'0')+' / '+project.title}/></a>
      <div className="cosmic-row-copy" id={`details-${project.id}`}><p className="cosmic-eyebrow">{project.category}</p><h3>{project.title}</h3><p className="cosmic-row-lede">{project.description}</p><p>{project.detail}</p><dl><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>Built with</dt><dd>{project.stack}</dd></div></dl><div className="cosmic-project-links"><a href={project.href} target="_blank" rel="noopener noreferrer" className="cosmic-text-link">{'linkLabel' in project ? project.linkLabel : 'Repository'} ↗</a>{'backend' in project && <a href={project.backend} target="_blank" rel="noopener noreferrer" className="cosmic-text-link">Backend ↗</a>}</div></div>
    </article>)}
  </>;
}
