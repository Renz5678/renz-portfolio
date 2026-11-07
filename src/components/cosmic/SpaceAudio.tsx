'use client';
import { useEffect, useRef, useState } from 'react';

export default function SpaceAudio() {
 const audio=useRef<HTMLAudioElement>(null);
 const [playing,setPlaying]=useState(false),[error,setError]=useState(false);
 useEffect(()=>{
  const stop=()=>{if(document.hidden){audio.current?.pause();setPlaying(false);}};
  document.addEventListener('visibilitychange',stop);
  return()=>document.removeEventListener('visibilitychange',stop);
 },[]);
 async function toggle(){
  const player=audio.current;if(!player)return;
  if(!player.paused){player.pause();setPlaying(false);return;}
  player.volume=.18;setError(false);
  try{await player.play();setPlaying(true);}catch{setPlaying(false);setError(true);}
 }
 return <div className="cosmic-sound"><audio ref={audio} src="/audio/deep-space.mp3" preload="none" loop onError={()=>{setError(true);setPlaying(false);}}/><button aria-label={playing?'Mute space ambience':'Play space ambience'} aria-pressed={playing} onClick={toggle}>{playing?'Sound on':'Sound off'}</button>{error&&<span role="status">Audio unavailable. Try again.</span>}</div>;
}
