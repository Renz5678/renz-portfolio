'use client';
import { useState, useEffect } from 'react';
import CyclicOrbit from './CyclicOrbit';
import { selectedProjects } from '@/data/cosmic-portfolio';
import Planet from './Planet';

const projects = [{id:'tulong',title:'PUP Tulong',category:'Web application',description:'A place for students to ask for a hand.',detail:'A student task marketplace with task posting, matching and management, Google OAuth, OTP verification and asynchronous notifications.',stack:'FastAPI · AWS Lambda · DynamoDB',role:'Full-stack development',href:'https://github.com/Renz5678/PUP-Tulong'},...selectedProjects];
export default function PlanetGallery() {
 const [active,setActive]=useState(0);
 const [requested,setRequested]=useState<number>();
 useEffect(()=>{
  const follow=()=>{const index=projects.findIndex(item=>`#project-${item.id}`===window.location.hash);if(index>=0){setRequested(index);document.getElementById('works')?.scrollIntoView();}};
  follow();window.addEventListener('hashchange',follow);return()=>window.removeEventListener('hashchange',follow);
 },[]);
 const project=projects[active];
 return <section id="works" className="cosmic-work cosmic-solar-system cosmic-orbital-gallery" aria-labelledby="cosmic-work-heading">
  <div className="cosmic-orbital-sticky">
   <div className="cosmic-section-top"><div><p className="cosmic-eyebrow">Selected work</p><h2 id="cosmic-work-heading">Worlds I’m building.</h2></div></div>
   <p className="cosmic-orbit-hint">Scroll sideways, drag, or choose a planet. There’s always another world.</p>
   <CyclicOrbit label="Project orbit" targetIndex={requested} onChange={setActive} items={projects.map(item=>({label:item.title,art:<Planet variant={item.id} label={item.title}/>}))}/>
   <div className="cosmic-orbital-details" aria-live="polite" aria-atomic="true">
    <article key={project.id} id={`project-${project.id}`}>
     <div><p className="cosmic-eyebrow">{String(active+1).padStart(2,'0')} / {project.category}</p><h3>{project.title}</h3><p className="cosmic-row-lede">{project.description}</p></div>
     <div><p>{project.detail}</p><p className="cosmic-orbital-stack">{project.stack}</p><div className="cosmic-project-links"><a className="cosmic-text-link" href={project.href} target="_blank" rel="noopener noreferrer">{'linkLabel' in project?project.linkLabel:'Explore the repository'} ↗</a>{'backend' in project&&<a className="cosmic-text-link" href={project.backend} target="_blank" rel="noopener noreferrer">Backend ↗</a>}</div></div>
    </article>
   </div>
  </div>
 </section>;
}
