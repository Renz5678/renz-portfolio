import type { CSSProperties } from 'react';
import { technicalSkills } from '@/data/portfolio';
import CyclicOrbit from './CyclicOrbit';
const skills=Object.entries(technicalSkills).flatMap(([group,items])=>items.map(skill=>({skill,group})));
export default function AsteroidBelt() {
 return <section className="cosmic-tech-belt" aria-label="Technical skills asteroid belt"><div className="cosmic-belt-heading"><h3>One belt. Many tools.</h3><p>Languages / frameworks / cloud & tools</p></div><CyclicOrbit dense label="Technical skills" items={skills.map(({skill,group},index)=>({label:skill,art:<span className={`cosmic-skill-world skill-${group}`} style={{'--rock-turn':`${index*47}deg`} as CSSProperties}><span className="cosmic-asteroid" aria-hidden="true"/><span>{skill}</span></span>}))}/><p className="cosmic-belt-caption">Drag the belt to explore. Hover or focus a rock to read its name.</p></section>;
}
