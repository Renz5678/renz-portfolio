'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotionPolicy } from '@/hooks/useMotionPolicy';

/** A native horizontal scroll rail drives a repeating elliptical scene. */
export default function CyclicOrbit({items,label,onChange,targetIndex,dense=false}:{items:{label:string;art:ReactNode}[];label:string;onChange?:(index:number)=>void;targetIndex?:number;dense?:boolean}) {
 const stage=useRef<HTMLDivElement>(null),rail=useRef<HTMLDivElement>(null);
 const playback=useRef({staticMotion:true,paused:false});
 const interactionUntil=useRef(0);
 const [paused,setPaused]=useState(false);
 const drag=useRef<{x:number;scroll:number}|null>(null);
 const [active,setActive]=useState(0);
 const {staticMotion}=useMotionPolicy();
 const count=items.length,unit=180,cycle=count*unit;
 useEffect(()=>{playback.current={staticMotion,paused};},[staticMotion,paused]);
 useEffect(()=>{
  const el=rail.current,scene=stage.current;if(!el||!scene)return;
  const nodes=[...scene.querySelectorAll<HTMLElement>('.cosmic-cycle-item')];
  let frame=0,lastTime=0,visible=false,target=cycle,position=cycle,written=cycle,lastIndex=-1;
  let width=scene.clientWidth,height=scene.clientHeight;
  let itemWidth=Math.max(...nodes.map(node=>node.clientWidth));
  const draw=()=>{
   const radius=Math.max(0,Math.min(width*.39,(width-itemWidth*1.12)/2-8));
   const ellipse=scene.querySelector<HTMLElement>('.cosmic-orbit-ellipse');
   if(ellipse){ellipse.style.width=`${radius*2}px`;ellipse.style.left=`${width/2-radius}px`;}
   const phase=(position-cycle)/unit;
   const index=((Math.round(phase)%count)+count)%count;
   if(index!==lastIndex){lastIndex=index;setActive(index);onChange?.(index);}
   nodes.forEach((node,i)=>{
    const angle=Math.PI/2+(i-phase)*Math.PI*2/count,depth=(Math.sin(angle)+1)/2;
    const spread=dense?.82+(i%5)*.09:1;
    const size=dense?.5+depth*.35+(i%3)*.08:.5+depth*.5;
    node.dataset.front=String(depth>.8);
    node.style.transform=`translate(-50%,-50%) translate(${Math.cos(angle)*radius*spread/(dense?1.18:1)}px,${Math.sin(angle)*height*.23*spread}px) scale(${size})`;
    node.style.opacity=String(.45+depth*.55);node.style.zIndex=String(1+Math.round(depth*10));
   });
  };
  const tick=(time:number)=>{
   const dt=lastTime?Math.min(time-lastTime,50):0;lastTime=time;
   const policy=playback.current;
   const auto=!policy.staticMotion&&!policy.paused&&!drag.current&&performance.now()>=interactionUntil.current&&!scene.closest('.cosmic-cycle')?.matches(':hover, :focus-within');
   if(auto){
    target+=20*dt/1000;
    if(target>cycle*1.5){target-=cycle;position-=cycle;}
    el.scrollLeft=target;written=el.scrollLeft;
   }
   // Exponential easing gives the same response on 60 Hz and high refresh displays.
   position=policy.staticMotion?target:position+(target-position)*(1-Math.exp(-dt/85));
   if(Math.abs(target-position)<.001)position=target;
   draw();
   frame=visible?requestAnimationFrame(tick):0;
  };
  const scroll=()=>{
   if(Math.abs(el.scrollLeft-written)<.01)return;
   target=el.scrollLeft;
   if(target<cycle*.5){target+=cycle;position+=cycle;el.scrollLeft=target;}
   if(target>cycle*1.5){target-=cycle;position-=cycle;el.scrollLeft=target;}
   written=el.scrollLeft;
  };
  el.scrollLeft=cycle;written=el.scrollLeft;draw();
  el.addEventListener('scroll',scroll,{passive:true});
  const resize=new ResizeObserver(()=>{width=scene.clientWidth;height=scene.clientHeight;itemWidth=Math.max(...nodes.map(node=>node.clientWidth));draw();});resize.observe(scene);
  const visibility=new IntersectionObserver(([entry])=>{
   visible=entry.isIntersecting;lastTime=0;
   if(visible&&!frame)frame=requestAnimationFrame(tick);
   if(!visible){cancelAnimationFrame(frame);frame=0;}
  });visibility.observe(scene);
  const wheel=(event:WheelEvent)=>{interactionUntil.current=performance.now()+3000;event.preventDefault();el.scrollLeft+=event.deltaX||event.deltaY;};
  scene.addEventListener('wheel',wheel,{passive:false});
  return()=>{cancelAnimationFrame(frame);resize.disconnect();visibility.disconnect();el.removeEventListener('scroll',scroll);scene.removeEventListener('wheel',wheel);};
 },[count,cycle,onChange,dense]);
 useEffect(()=>{if(targetIndex!==undefined&&rail.current)rail.current.scrollLeft=cycle+targetIndex*unit;},[targetIndex,cycle]);
 const move=(steps:number)=>{rail.current?.scrollBy({left:steps*unit,behavior:staticMotion?'instant':'smooth'});};
 const choose=(index:number)=>{
  const delta=((index-active+count+count/2)%count)-count/2;
  move(delta);
 };
 return <div className={`cosmic-cycle${dense?' cosmic-dense-belt':''}`} aria-label={label}>
  <div ref={stage} className="cosmic-shared-orbit" role="group" aria-label={`${label}: swipe or scroll horizontally`} tabIndex={0}
   onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}}}
   onPointerDown={e=>{if(e.pointerType==='mouse'&&e.button!==0)return;drag.current={x:e.clientX,scroll:rail.current?.scrollLeft??0};}}
   onPointerMove={e=>{if(!drag.current||!rail.current)return;const delta=drag.current.x-e.clientX;if(Math.abs(delta)>6)e.currentTarget.setPointerCapture(e.pointerId);rail.current.scrollLeft=drag.current.scroll+delta;}}
   onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}>
   <div className="cosmic-orbit-ellipse" aria-hidden="true"/>
   {items.map((item,index)=><button className="cosmic-cycle-item" key={item.label} aria-label={`Explore ${item.label}`} aria-pressed={index===active} onClick={()=>choose(index)}>{item.art}</button>)}
  </div>
  <div className="cosmic-cycle-navigation"><button className="cosmic-orbit-playback" aria-label={`${paused?'Resume':'Pause'} ${label} rotation`} aria-pressed={paused} disabled={staticMotion} onClick={()=>setPaused(value=>!value)}>{paused?'Play':'Pause'}</button><button aria-label={`Previous in ${label}`} onClick={()=>move(-1)}>←</button><div ref={rail} className="cosmic-cycle-rail" tabIndex={0} role="region" aria-label={`${label} horizontal scroll`}><div style={{width:cycle*3+320,height:1}}/></div><button aria-label={`Next in ${label}`} onClick={()=>move(1)}>→</button></div>
 </div>;
}
