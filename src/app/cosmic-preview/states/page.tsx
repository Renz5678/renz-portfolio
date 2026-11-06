import type { Metadata } from 'next';
import RockyCompanion from '@/components/rocky/RockyCompanion';
import ProjectFeature from '@/components/cosmic/ProjectFeature';
import type { RockyState } from '@/components/rocky/rocky-machine';
import '../cosmic.css';
export const metadata: Metadata = { title: 'Cosmic component studies', robots: { index: false, follow: false } };
export default function States() {
 return <main className="cosmic-experience"><div className="cosmic-gallery"><a href="/cosmic-preview">← Portfolio study</a><h1>Component studies</h1><p>Interactive isolated states. Change your system motion preference to inspect the static treatment.</p><div className="cosmic-gallery-list">{(['idle','communicating','resting','ascii'] as RockyState['mode'][]).map(mode=><article key={mode}><h2>{mode}</h2><RockyCompanion initialMode={mode}/></article>)}</div><ProjectFeature/></div></main>;
}
