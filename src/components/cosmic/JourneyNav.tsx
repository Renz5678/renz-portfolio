'use client';
import { useRef, useState } from 'react';
const links = [{ href: '#about', label: 'About' }, { href: '#works', label: 'Work' }, { href: '#capabilities', label: 'Capabilities' }, { href: '#trajectory', label: 'Background' }, { href: '#contact', label: 'Contact' }];
export default function JourneyNav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLElement>(null);
  return <header className="cosmic-header" onKeyDown={e => { if (e.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}>
    <a className="cosmic-wordmark" href="#unveil" aria-label="Lawrenz Garcia, back to top">lawrenz garcia<span aria-hidden="true">.</span></a>
    <nav aria-label="Portfolio" className="cosmic-desktop-nav">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}<a href="/cv/lawrenz-garcia-cv.pdf" target="_blank" rel="noopener noreferrer">Résumé ↗</a></nav>
    <details className="cosmic-mobile-nav" open={open} onToggle={e => setOpen(e.currentTarget.open)}>
      <summary ref={toggle} onClick={e => { e.preventDefault(); setOpen(!open); }} aria-label="Navigation menu">Menu <span aria-hidden="true">{open ? '−' : '+'}</span></summary>
      <nav aria-label="Mobile portfolio">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}<a href="/cv/lawrenz-garcia-cv.pdf">Résumé ↗</a></nav>
    </details>
  </header>;
}
