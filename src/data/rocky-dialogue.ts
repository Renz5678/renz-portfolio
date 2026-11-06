export const rockyDialogue = {
 unveil: 'A little company for the journey. Shall we see what Lawrenz has been building?',
 about: 'That’s the human behind the work. Curious about the things he makes?',
 works: 'A way to ask for help, a network to explore, a business to keep moving. Small worlds, useful ideas.',
 capabilities: 'The tools change. The habit of figuring things out stays.',
 trajectory: 'A few places to learn, a few people to build alongside.',
 contact: 'We made it. If you have something in mind, this is a good place to say hello.',
} as const;
export type RockySection = keyof typeof rockyDialogue;
