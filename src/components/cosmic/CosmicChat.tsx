'use client';
import { useEffect, useRef, useState } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { getCosmicReply } from '@/data/cosmic-chat';
export default function CosmicChat({onOpenChange,hideTrigger=false}:{onOpenChange?:(open:boolean)=>void;hideTrigger?:boolean}) {
 const [open,setOpen]=useState(false);
 const [text,setText]=useState('');
 const trigger=useRef<HTMLButtonElement>(null);
 const input=useRef<HTMLInputElement>(null);
 const log=useRef<HTMLDivElement>(null);
 const {messages,isTyping,send,clear}=useChatbot({reply:getCosmicReply,storageKey:'rocky-chat-v2'});
 useEffect(()=>{window.dispatchEvent(new CustomEvent('cosmic-chat',{detail:open}));if(open) input.current?.focus();return ()=>{window.dispatchEvent(new CustomEvent('cosmic-chat',{detail:false}));};},[open]);
 useEffect(()=>{const toggle=()=>setOpen(value=>!value);window.addEventListener('rocky-chat-toggle',toggle);return()=>window.removeEventListener('rocky-chat-toggle',toggle);},[]);
 useEffect(()=>{if(open && log.current)log.current.scrollTop=log.current.scrollHeight;},[open,messages,isTyping]);
 function close(){setOpen(false);onOpenChange?.(false);if(hideTrigger)document.querySelector<HTMLButtonElement>('.cosmic-rocky-trigger')?.focus();else trigger.current?.focus();}
 return <div className="cosmic-chat" onKeyDown={e=>{if(e.key==='Escape'&&open){e.preventDefault();close();}}}>
  {(!hideTrigger||open)&&<button ref={trigger} className="cosmic-text-link" aria-expanded={open} aria-controls="cosmic-chat-panel" onClick={()=>open?close():(setOpen(true),onOpenChange?.(true))}>{open?'Close conversation':'Ask Rocky'} <span aria-hidden="true">{open?'−':'+'}</span></button>}
  {open&&<section id="cosmic-chat-panel" className="cosmic-chat-panel" aria-label="Ask Rocky about Lawrenz"><div className="cosmic-chat-heading"><p>Rocky answers <span>Portfolio facts · scripted replies</span></p><button onClick={clear}>Clear history</button></div><div ref={log} className="cosmic-chat-log" role="log" aria-live="polite" aria-relevant="additions">{messages.map(message=><div className="cosmic-chat-message" key={message.id}><span>{message.role==='user'?'You':'Rocky'}</span><p>{message.content}</p>{message.links&&<ul>{message.links.map(link=><li key={link.href}><a href={link.href}>{link.label} ↗</a></li>)}</ul>}</div>)}{isTyping&&<p>Rocky is thinking…</p>}</div><form onSubmit={e=>{e.preventDefault();if(text.trim()&&!isTyping){send(text);setText('');}}}><label htmlFor="cosmic-question">Your question</label><div><input ref={input} id="cosmic-question" value={text} maxLength={500} onChange={e=>setText(e.target.value)} placeholder="Projects, skills, contact…"/><button type="submit" disabled={isTyping||!text.trim()}>Send ↗</button></div></form></section>}
 </div>;
}
