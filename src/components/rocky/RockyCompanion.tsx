'use client';
import { useEffect, useId, useReducer, useRef, useState, type Dispatch } from 'react';
import { useMotionPolicy } from '@/hooks/useMotionPolicy';
import { initialRockyState, rockyReducer, type RockyState, type RockyEvent } from './rocky-machine';
import { rockyDialogue, type RockySection } from '@/data/rocky-dialogue';
import RockySprite from './RockySprite';
export default function RockyCompanion({ initialMode = 'idle', externalState, externalDispatch, section = 'unveil', chatEnabled = false }: { initialMode?: RockyState['mode']; externalState?: RockyState; externalDispatch?: Dispatch<RockyEvent>; section?: RockySection; chatEnabled?: boolean }) {
  const [localState, localDispatch] = useReducer(rockyReducer, { ...initialRockyState, mode: initialMode, paused: initialMode === 'resting' });
  const state = externalState ?? localState;
  const dispatch = externalDispatch ?? localDispatch;
  const [onScreen, setOnScreen] = useState(false);
  const dialogueId = useId();
  const stage = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const { staticMotion } = useMotionPolicy();
  const active = state.mode === 'communicating' || state.mode === 'ascii';
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.1 });
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { if (state.hidden) trigger.current?.focus(); }, [state.hidden]);
  function dismiss() { dispatch({ type: 'DISMISS' }); trigger.current?.focus(); }
  return <div ref={stage} className="rocky-stage" data-mode={state.mode} data-moving={!staticMotion && !state.paused && !active && onScreen && !state.hidden}
    onKeyDown={event => { if (event.key === 'Escape' && active) { event.preventDefault(); if(chatEnabled&&state.mode==='communicating') window.dispatchEvent(new CustomEvent('rocky-chat-toggle')); else dismiss(); } }}>
    {state.hidden ? <button ref={trigger} className="cosmic-quiet-button" onClick={() => dispatch({ type: 'SHOW' })}>Bring Rocky back</button> : <>
      <div className="rocky-perch">
        {state.mode === 'ascii' ? <pre aria-hidden="true" className="rocky-ascii">{'     /\\\n  __/##\\__\n /__####__\\\n    /##\\\n   /_  _\\'}</pre> : <RockySprite animation={state.mode === 'traveling' ? 'walking' : state.mode === 'curious' ? 'crawling' : state.mode === 'excited' ? 'jumping' : 'waving'} animated={['communicating','traveling','curious','excited','waving'].includes(state.mode)} resting={state.paused || staticMotion || !onScreen} />}
      </div>
      <div className="rocky-controls">
        <button ref={trigger} className="rocky-talk" aria-expanded={chatEnabled?state.mode==='communicating':active} aria-controls={chatEnabled?'cosmic-chat-panel':dialogueId} onClick={() => chatEnabled ? window.dispatchEvent(new CustomEvent('rocky-chat-toggle')) : active ? dismiss() : dispatch({ type: 'TALK' })}>Rocky <span aria-hidden="true">{active ? '−' : '+'}</span></button>
        <button className="cosmic-quiet-button" aria-pressed={state.paused} onClick={() => dispatch({ type: 'PAUSE' })}>{state.paused ? 'Resume' : 'Pause'}</button>{chatEnabled&&<button className="cosmic-quiet-button" onClick={()=>dispatch({type:state.mode==='ascii'?'DISMISS':'ASCII'})} aria-pressed={state.mode==='ascii'}>ASCII</button>}{chatEnabled&&<button className="cosmic-quiet-button" onClick={()=>dispatch({type:'HIDE'})}>Hide</button>}
      </div>
      {active && !chatEnabled && <div id={dialogueId} className="rocky-dialogue" role="region" aria-label="A moment with Rocky">
        <p>{state.mode === 'ascii' ? 'Same friend. A few fewer pixels.' : rockyDialogue[section]}</p>
        <div className="rocky-dialogue-actions">
          <a href="#works" onClick={() => dispatch({ type: 'DISMISS' })}>Explore the work ↗</a>
          <button onClick={() => dispatch({ type: state.mode === 'ascii' ? 'TALK' : 'ASCII' })}>{state.mode === 'ascii' ? 'Back to pixels' : 'Try ASCII'}</button>
          <button onClick={dismiss}>Close</button>
          <button onClick={() => { dispatch({ type: 'HIDE' }); }}>Hide Rocky</button>
        </div>
      </div>}
    </>}
  </div>;
}
