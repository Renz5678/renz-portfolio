import AsteroidBelt from './AsteroidBelt';
import { capabilityGroups } from '@/data/cosmic-portfolio';
export default function Capabilities() {
 return <section id="capabilities" className="cosmic-capabilities" aria-labelledby="capabilities-heading"><p className="cosmic-eyebrow">What I bring to the work</p><h2 id="capabilities-heading">From idea<br /><em>to something real.</em></h2><AsteroidBelt /><div className="cosmic-capability-list">{capabilityGroups.map((group,i)=><article key={group.title}><div className={`cosmic-space-art space-art-${i}`} role="img" aria-label={['Pixel art comet','Pixel art rocket','Pixel art Voyager 1'][i]}/><div><h3>{group.title}</h3><p>{group.description}</p><a href={group.href}>{group.evidence} ↗</a></div></article>)}</div></section>;
}
