'use client';
import { useEffect, useReducer, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useMotionPolicy } from '@/hooks/useMotionPolicy';
import { initialRockyState, rockyReducer } from './rocky-machine';
import RockySprite from './RockySprite';
import { rockyAnimations, rockyAtlas } from './rocky-frames';
import CosmicChat from '@/components/cosmic/CosmicChat';

export default function JourneyRocky() {
 const [state,dispatch]=useReducer(rockyReducer,initialRockyState);
 const [greeting,setGreeting]=useState(false);
 const latest=useRef(state);
 const {staticMotion}=useMotionPolicy();
 const x=useMotionValue(0),y=useMotionValue(0);
 useEffect(()=>{latest.current=state;},[state]);
 useEffect(()=>{
  const listen=(event:Event)=>{
   setGreeting(false);
   dispatch({type:(event as CustomEvent<boolean>).detail?'TALK':'DISMISS'});
  };
  window.addEventListener('cosmic-chat',listen);
  return()=>window.removeEventListener('cosmic-chat',listen);
 },[]);
 useEffect(()=>{
  let frame=0,stop:ReturnType<typeof setTimeout>,rest:ReturnType<typeof setTimeout>;
  let lastScroll=window.scrollY;
  const place=()=>{
   const w=window.innerWidth,h=window.innerHeight,size=w<=480?56:w<=800?72:112;
   const right=Math.max(8,w-size-10),bottom=Math.max(8,h-size-16);
   const range=document.documentElement.scrollHeight-h;
   const progress=range>0?Math.max(0,Math.min(1,window.scrollY/range)):0;
   const top=Math.min(bottom,w<=800?104:96);
   x.set(right);y.set(top+progress*(bottom-top));
  };
  const update=()=>{
   frame=0;
   if(staticMotion||latest.current.mode==='communicating')return;
   if(window.scrollY!==lastScroll){
    lastScroll=window.scrollY;clearTimeout(rest);dispatch({type:'TRAVEL'});place();
    clearTimeout(stop);
    stop=setTimeout(()=>{
     dispatch({type:'WAVE'});
     rest=setTimeout(()=>dispatch({type:'SETTLE'}),1100);
    },180);
   }
  };
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const resize=()=>place();
  place();
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',resize);
  return()=>{cancelAnimationFrame(frame);clearTimeout(stop);clearTimeout(rest);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',resize);};
 },[staticMotion,x,y]);
 useEffect(()=>{
  if(staticMotion||state.paused||state.hidden||greeting)return;
  let timer:ReturnType<typeof setTimeout>;
  if(state.mode==='idle'){
   timer=setTimeout(()=>dispatch({type:'EXCITED'}),3000+Math.random()*7000);
  }else if(state.mode==='excited'){
   timer=setTimeout(()=>dispatch({type:'SETTLE'}),rockyAnimations.jumping.frameMs*rockyAtlas.columns);
  }else return;
  return()=>clearTimeout(timer);
 },[staticMotion,state.mode,state.paused,state.hidden,greeting]);
 return <aside className="cosmic-free-companion" aria-label="Rocky companion">
  <motion.div className="cosmic-flight cosmic-rocky-only" data-jumping={state.mode==='excited'&&!greeting} data-greeting={greeting} data-walking={state.mode==='traveling'&&!greeting} style={{x,y}}>
   <button className="cosmic-rocky-trigger" onPointerEnter={()=>{if(latest.current.mode!=='communicating'){setGreeting(true);dispatch({type:'WAVE'});}}} onPointerLeave={()=>{setGreeting(false);dispatch({type:'SETTLE'});}} onFocus={()=>{if(latest.current.mode!=='communicating'){setGreeting(true);dispatch({type:'WAVE'});}}} onBlur={()=>{setGreeting(false);dispatch({type:'SETTLE'});}} aria-label="Chat with Rocky" aria-expanded={state.mode==='communicating'} aria-controls={state.mode==='communicating'?'cosmic-chat-panel':undefined} onClick={()=>window.dispatchEvent(new CustomEvent('rocky-chat-toggle'))}>
    <RockySprite key={state.mode} animation={state.mode==='excited'?'jumping':state.mode==='waving'||greeting?'waving':'walking'} animated={state.mode==='traveling'||state.mode==='waving'||state.mode==='excited'} loop={state.mode==='traveling'&&!greeting} resting={staticMotion} />
   </button>
   {greeting&&<div className="cosmic-rocky-bubble" role="status">Amaze amaze, you ask me, question</div>}
  </motion.div>
  <div className="cosmic-rocky-chat"><CosmicChat hideTrigger /></div>
 </aside>;
}
