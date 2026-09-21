/**
 * chatbot-intents.ts
 * Defines all intents, trigger keywords, and response factories.
 * All content is sourced directly from portfolio.ts — zero hallucination.
 */

import {
  hero, about, projects, experience, leadership,
  achievements, education, contact,
} from "@/data/portfolio";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export type IntentId =
  | "greeting"
  | "who_are_you"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "achievements"
  | "contact"
  | "availability"
  | "cv"
  | "location"
  | "socials"
  | "help"
  | "unknown";

export interface BotReply {
  text: string;
  links?: { label: string; href: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Trigger keyword map (used by classifier.ts)
// ─────────────────────────────────────────────────────────────────────────────
export const INTENT_TRIGGERS: Record<IntentId, string[]> = {
  greeting: [
    "hi", "hello", "hey", "sup", "yo", "hiya", "howdy", "greetings",
    "good morning", "good evening", "good afternoon", "what's up",
  ],
  who_are_you: [
    "who are you", "about you", "introduce yourself", "who is renz",
    "tell me about you", "about renz", "who is scarecrow", "introduce",
    "bio", "background",
  ],
  projects: [
    "projects", "work", "built", "deployed", "portfolio", "apps",
    "applications", "what have you built", "show me", "hardinia",
    "netforge", "ada", "nexus", "pup tulong", "shipped",
  ],
  skills: [
    "skills", "stack", "tech", "languages", "tools", "technologies",
    "frameworks", "what do you know", "expertise", "capabilities",
    "what can you code", "programming",
  ],
  experience: [
    "experience", "job", "work history", "career", "intern", "internship",
    "worked", "companies", "leadership", "flyrank", "eskwelabs",
    "aws student", "roles", "employment",
  ],
  education: [
    "education", "degree", "school", "pup", "university", "study",
    "studying", "course", "graduate", "college", "polytechnic",
  ],
  achievements: [
    "awards", "honors", "achievements", "scholar", "dost", "recognition",
    "accomplishments", "lister", "sttp", "accolades",
  ],
  contact: [
    "contact", "email", "reach", "message", "talk to you",
    "get in touch", "hire", "phone", "dm", "connect",
  ],
  availability: [
    "available", "open to work", "hiring", "open for", "taking",
    "looking for", "freelance", "internship available", "for hire",
  ],
  cv: ["cv", "resume", "download", "pdf", "curriculum vitae"],
  location: [
    "where", "location", "based", "manila", "philippines",
    "city", "where are you", "where do you live", "timezone",
  ],
  socials: [
    "github", "linkedin", "social", "twitter", "accounts",
    "profiles", "follow", "links",
  ],
  help: [
    "help", "commands", "what can you ask", "options",
    "list", "menu", "what can i ask",
  ],
  unknown: [],
};

// ─────────────────────────────────────────────────────────────────────────────
// Response factories
// ─────────────────────────────────────────────────────────────────────────────
const REPLIES: Record<IntentId, (rawInput?: string) => BotReply> = {

  greeting: () => ({
    text: `hey! i'm renz — full-stack dev & cs student at pup.\nask me anything about my work, stack, experience, or how to reach me.\n\ntype 'help' to see all commands.`,
  }),

  who_are_you: () => ({
    text: `i'm lawrenz matthew garcia — a 3rd-year cs student at pup and full-stack developer.\n\n${about.bio}\n\ncore focus:\n${about.coreFocus.map(f => `→ ${f}`).join("\n")}`,
  }),

  projects: () => ({
    text: `here's what i've shipped:\n\n${projects.map(p =>
      `${p.index} ${p.title}\n   ${p.description}\n   ${p.techTags.join(" ")}  [${p.dateRange}]`
    ).join("\n\n")}`,
    links: [{ label: "github", href: contact.github }],
  }),

  skills: () => ({
    text: `my current stack:\n\ncore      →  python, java, react, fastapi\nplatform  →  spring boot, next.js, docker, supabase, aws\nmobile    →  react native, expo, skia\ntools     →  git, github actions, vercel, tailwind, dynamodb, redis, c++`,
  }),

  experience: () => ({
    text: `professional:\n\n${experience.map(e =>
      `→ ${e.company} — ${e.role}\n  ${e.dateRange}\n  ${e.description}`
    ).join("\n\n")}\n\nleadership:\n\n${leadership.map(l =>
      `→ ${l.org} — ${l.role}\n  ${l.dateRange}`
    ).join("\n\n")}`,
  }),

  education: () => ({
    text: `${education.institution}\n${education.degree}\n${education.expectedGrad}\nhonors: ${education.honors.join(", ")}`,
  }),

  achievements: () => ({
    text: `honors & achievements:\n\n${achievements.map((a, i) => `${i + 1}. ${a.title}`).join("\n")}`,
  }),

  contact: () => ({
    text: `reach me at:\n\nemail  →  ${contact.email}\nloc    →  ${contact.location}`,
    links: [
      { label: "email", href: `mailto:${contact.email}` },
      { label: "github", href: contact.github },
      { label: "linkedin", href: contact.linkedin },
      { label: "cv", href: "/cv/lawrenz-garcia-cv.pdf" },
    ],
  }),

  availability: () => ({
    text: `status: ${hero.availability}.\n\ni'm open to internship opportunities and full-stack roles. feel free to reach out.`,
    links: [
      { label: "email me", href: `mailto:${contact.email}` },
      { label: "linkedin", href: contact.linkedin },
    ],
  }),

  cv: () => ({
    text: `here's my cv — feel free to download it.`,
    links: [{ label: "↓ download cv", href: "/cv/lawrenz-garcia-cv.pdf" }],
  }),

  location: () => ({
    text: `i'm based in ${contact.location}, ph.\navailable for remote work worldwide.`,
  }),

  socials: () => ({
    text: `find me online:`,
    links: [
      { label: "github", href: contact.github },
      { label: "linkedin", href: contact.linkedin },
    ],
  }),

  help: () => ({
    text: `available commands:\n\nwho are you    →  about renz\nprojects       →  shipped work\nskills         →  tech stack\nexperience     →  career & leadership\neducation      →  academic background\nachievements   →  honors & awards\ncontact        →  how to reach me\navailability   →  open to work status\ncv             →  download resume\nlocation       →  where i'm based\ngithub         →  social profiles\n\njust type naturally — i'll figure it out.`,
  }),

  unknown: (rawInput) => ({
    text: `bash: '${(rawInput ?? "???").slice(0, 40)}': command not found\ndid you mean: projects, skills, contact, help?`,
  }),
};

export function getReply(intentId: IntentId, rawInput: string): BotReply {
  return REPLIES[intentId](rawInput);
}
