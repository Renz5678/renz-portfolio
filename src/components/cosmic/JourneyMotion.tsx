'use client';
import { useEffect } from 'react';
import { useMotionPolicy } from '@/hooks/useMotionPolicy';

/** Progressive enhancement: server-rendered content is always visible. */
export default function JourneyMotion() {
 const {staticMotion}=useMotionPolicy();
 useEffect(()=>{
  if(staticMotion||!('IntersectionObserver' in window))return;
  const animations:Animation[]=[];
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    animations.push(entry.target.animate([
     {transform:'translateY(12px)',opacity:.8},
     {transform:'translateY(0)',opacity:1},
    ],{duration:420,easing:'cubic-bezier(.16,1,.3,1)'}));
    observer.unobserve(entry.target);
   }
  },{threshold:0,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.cosmic-about > div, .cosmic-hero-content, .cosmic-section-top, .cosmic-belt-heading, .cosmic-capability-list article > div:not(.cosmic-space-art), .cosmic-background ol li, .cosmic-capabilities > h2, .cosmic-background > h2, .cosmic-contact > h2, .cosmic-contact > .cosmic-email').forEach(el=>observer.observe(el));
  // Scroll position sets a single direction of travel; there is no idle wobble.
  const visible=new Set<HTMLElement>();
  let frame=0;
  const update=()=>{
   frame=0;
   const compact=window.innerWidth<=800;
   const distance=compact?.55:1;
   for(const art of visible){
    const bounds=art.parentElement!.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,(window.innerHeight-bounds.top)/(window.innerHeight+bounds.height)));
    if(art.classList.contains('space-art-0')){
     art.style.transform=`translate(${(-42+progress*96)*distance}px,${(-24+progress*56)*distance}px) rotate(-12deg)`;
    }else if(art.classList.contains('space-art-1')){
     art.style.transform=`translate(${(-20+progress*48)*distance}px,${(38-progress*90)*distance}px)`;
    }else if(art.classList.contains('space-art-2')){
     art.style.transform=`translate(${(-18+progress*56)*distance}px,${(10-progress*28)*distance}px) rotate(${8+progress*4}deg) scale(${1-progress*.06})`;
    }else{
     const assembly=Math.max(0,Math.min(1,(window.innerHeight*.95-bounds.top)/(window.innerHeight*.65)));
     art.style.setProperty('--assembly',String(assembly));
     art.dataset.assembling=String(assembly<.99);
    }
   }
  };
  const queue=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const travel=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.isIntersecting)visible.add(entry.target as HTMLElement);
    else visible.delete(entry.target as HTMLElement);
   }
   queue();
  },{rootMargin:'100px 0px'});
  const travelers=document.querySelectorAll<HTMLElement>('.cosmic-space-art, .cosmic-portrait-image');
  travelers.forEach(art=>travel.observe(art));
  window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue);
  return()=>{
   observer.disconnect();travel.disconnect();cancelAnimationFrame(frame);
   window.removeEventListener('scroll',queue);window.removeEventListener('resize',queue);
   travelers.forEach(art=>{art.style.removeProperty('transform');art.style.removeProperty('--assembly');delete art.dataset.assembling;});
   animations.forEach(animation=>animation.cancel());
  };
 },[staticMotion]);
 return null;
}
