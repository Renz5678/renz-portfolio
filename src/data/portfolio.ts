export const navLinks = [
  { name: "about", href: "#about" },
  { name: "projects", href: "#works" },
  { name: "tech stack", href: "#capabilities" },
  { name: "experience", href: "#trajectory" },
  { name: "contact", href: "#contact" },
];

export const hero = {
  name: "renz",
  role: "full-stack developer",
  tagline: "third-year computer science student at pup.",
  availability: "available for internships & full-stack roles",
  stats: [
    { value: "3+", label: "years coding" },
    { value: "5+", label: "projects shipped" },
    { value: "6+", label: "stacks worked in" },
  ],
};

export const about = {
  quote: "engineering resilient systems.",
  bio: "i specialize in full-stack development, artificial intelligence, and cloud infrastructure. i build robust systems with a focus on clean code and scalable architecture. driven by the pursuit of technical excellence.",
  coreFocus: [
    "api design & microservices",
    "database optimization",
    "machine learning integration",
  ],
};

export const projects = [
  {
    index: "_01.",
    title: "hardinia",
    role: "full-stack developer",
    dateRange: "aug 2026 – present",
    description: "enterprise e-commerce platform with microservices architecture.",
    techTags: ["[react/vite]", "[spring boot]", "[docker]", "[supabase]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_02.",
    title: "netforge",
    role: "full-stack developer",
    dateRange: "nov 2025 – jan 2026",
    description: "high-performance real-time chat application with websocket integration.",
    techTags: ["[react native]", "[expo]", "[skia]", "[zustand]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_03.",
    title: "ada",
    role: "backend engineer",
    dateRange: "may 2026 – jun 2026",
    description: "ai-powered internal tooling automating code reviews.",
    techTags: ["[python]", "[fastapi]", "[openai]", "[redis]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_04.",
    title: "nexus",
    role: "mobile developer",
    dateRange: "feb 2026 – apr 2026",
    description: "cross-platform mobile application utilizing react native and skia.",
    techTags: ["[react native]", "[expo]", "[supabase]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_05.",
    title: "pup tulong",
    role: "full-stack developer",
    dateRange: "jun 2025 – aug 2025",
    description: "platform connecting student volunteers with local community initiatives.",
    techTags: ["[fastapi]", "[dynamodb]", "[docker]"],
    githubUrl: "https://github.com/Renz5678",
  },
];

export const experience = [
  {
    dateRange: "feb 2027 – present",
    company: "flyrank ai",
    role: "backend ai engineer intern",
    description: "engineered backend ai pipeline architectures and core predictive models.",
    isActive: true,
  },
  {
    dateRange: "aug 2026 – dec 2026",
    company: "eskwelabs",
    role: "intern, education innovation fellowship",
    description: "collaborative innovation fellowship tackling data and educational workflows.",
    isActive: false,
  },
];

export const leadership = [
  {
    org: "aws student group pup",
    role: "director for web development",
    dateRange: "nov 2026 – present",
    description: "leading technical initiatives and cloud architecture workshops for students.",
  },
  {
    org: "pup ads",
    role: "lead frontend developer",
    dateRange: "may 2026 – present",
    description: "architecting user interfaces and component libraries for university platforms.",
  },
  {
    org: "hardy and co.",
    role: "frontend developer",
    dateRange: "jan 2026 – dec 2026",
    description: "developed responsive marketing sites and interactive digital campaigns.",
  },
];

export const achievements = [
  { title: "dost-sei merit scholar" },
  { title: "sttp+ cohort 3 participant" },
  { title: "pup president's lister" },
];

export const education = {
  institution: "polytechnic university of the philippines",
  degree: "bs computer science",
  expectedGrad: "expected 2028",
  honors: ["president's lister"],
};

export const contact = {
  email: "lawrenzgarcia1202@gmail.com",
  location: "valenzuela city, metro manila",
  github: "https://github.com/Renz5678",
  linkedin: "https://linkedin.com/in/lawrenz-matthew-garcia-3b2664319/",
};

// === SEO & Infrastructure Constants ===

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lawrenz Matthew Garcia", // Kept proper case for SEO schema only
  jobTitle: "Full-Stack Developer",
  url: SITE_URL,
  sameAs: [
    contact.github,
    contact.linkedin
  ]
};
