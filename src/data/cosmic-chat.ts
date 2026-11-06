import type { BotReply, IntentId } from './chatbot-intents';
import { selectedProjects, capabilityGroups } from './cosmic-portfolio';
import { contact, education, leadership, experience, achievements } from './portfolio';
export function getCosmicReply(intent: IntentId): BotReply {
 switch(intent) {
  case 'greeting': return {text:'Hello, friend. I’m Rocky. I travel with you here. Ask me about Lawrenz’s projects, skills, background, or how to reach him.'};
  case 'who_are_you': return {text:'Lawrenz Garcia is a computer science student at PUP who builds web and mobile tools.'};
  case 'projects': return {text:'PUP Tulong connects students around help requests.\n\n'+selectedProjects.map(p=>`${p.title}: ${p.detail}`).join('\n\n'),links:[{label:'PUP Tulong',href:'https://github.com/Renz5678/PUP-Tulong'},...selectedProjects.map(p=>({label:p.title,href:p.href}))]};
  case 'skills': return {text:capabilityGroups.map(g=>`${g.title}\n${g.description}`).join('\n\n')};
  case 'experience': return {text:experience.map(e=>`${e.company} — ${e.role}\n${e.dateRange}\n${e.description}`).join('\n\n')+'\n\n'+leadership.map(l=>`${l.org} — ${l.role}\n${l.dateRange}`).join('\n\n'),links:[{label:'Résumé',href:'/cv/lawrenz-garcia-cv.pdf'}]};
  case 'education': return {text:`${education.institution}\n${education.degree}\n${education.expectedGrad}`};
  case 'contact': case 'socials': return {text:`Email: ${contact.email}`,links:[{label:'Email',href:`mailto:${contact.email}`},{label:'GitHub',href:contact.github},{label:'LinkedIn',href:contact.linkedin}]};
  case 'cv': return {text:'You can read the résumé here.',links:[{label:'Résumé',href:'/cv/lawrenz-garcia-cv.pdf'}]};
  case 'location': return {text:contact.location};
  case 'availability': return {text:'For current availability, please contact Lawrenz directly.',links:[{label:'Email',href:`mailto:${contact.email}`}]};
  case 'achievements': return {text:achievements.map(a=>a.title).join('\n'),links:[{label:'Background',href:'#trajectory'}]};
  default: return {text:'Question, friend? Try projects, skills, experience, education, or contact. I answer from Lawrenz’s portfolio and résumé.'};
 }
}
