'use client';
import { useEffect, useId, useReducer, useRef, useState } from 'react';
import { useMotionPolicy } from '@/hooks/useMotionPolicy';
import { initialRockyState, rockyReducer, type RockyState } from './rocky-machine';
import RockySprite from './RockySprite';
export default function RockyCompanion({ initialMode = 'idle' }: { initialMode?: RockyState['mode'] }) {
  const [state, dispatch] = useReducer(rockyReducer, { ...initialRockyState, mode: initialMode, paused: initialMode === 'resting' });
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
    onKeyDown={event => { if (event.key === 'Escape' && active) { event.preventDefault(); dismiss(); } }}>
    {state.hidden ? <button ref={trigger} className="cosmic-quiet-button" onClick={() => dispatch({ type: 'SHOW' })}>Bring Rocky back</button> : <>
      <div className="rocky-perch">
        {state.mode === 'ascii' ? <pre aria-hidden="true" className="rocky-ascii">{'     /\\\n  __/##\\__\n /__####__\\\n    /##\\\n   /_  _\\'}</pre> : <RockySprite resting={state.paused || staticMotion} />}
      </div>
      <div className="rocky-controls">
        <button ref={trigger} className="rocky-talk" aria-expanded={active} aria-controls={dialogueId} onClick={() => active ? dismiss() : dispatch({ type: 'TALK' })}>Rocky <span aria-hidden="true">{active ? '−' : '+'}</span></button>
        <button className="cosmic-quiet-button" aria-pressed={state.paused} onClick={() => dispatch({ type: 'PAUSE' })}>{state.paused ? 'Resume' : 'Pause'}</button>
      </div>
      {active && <div id={dialogueId} className="rocky-dialogue" role="region" aria-label="A moment with Rocky">
        <p>{state.mode === 'ascii' ? 'Same friend. A few fewer pixels.' : 'A little company for the journey. Shall we see what Lawrenz has been building?'}</p>
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
