// Authoritative biographical source: public/cv/lawrenz-garcia-cv.pdf (6 November 2026).
export const technicalSkills = {
  languages: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
  frameworks: ["React", "React Native (Expo)", "Next.js", "Express.js", "FastAPI", "Spring Boot", "Tailwind CSS"],
  tools: ["AWS Lambda", "DynamoDB", "Supabase", "Docker", "Git/GitHub", "Vercel", "Render", "Cisco Packet Tracer"],
};
export const certifications = [
  "Cisco Networking Academy — Networking Devices and Initial Configuration",
  "Cisco Networking Academy — Endpoint Security (Jul 2025)",
  "Cisco Networking Academy — JavaScript Essentials 1 (Aug 2025)",
  "BPI DATA Wave 2025 — Human-Centered Market Research & Ideation (Module 1)",
  "BPI DATA Wave 2025 — Solution Blueprint & AI Architecture (Module 2)",
];
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
  tagline: "computer science student at pup.",
  availability: "contact me for current availability",
  stats: [
    { value: "2028", label: "expected graduation" },
    { value: "5", label: "selected projects" },
    { value: "1.165", label: "cumulative GWA" },
  ],
};

export const about = {
  quote: "engineering resilient systems.",
  bio: "i study computer science at pup and build web, mobile, and cloud systems. at hardy and co., i lead architecture and engineering, from backend services to deployment.",
  coreFocus: [
    "web and mobile development",
    "backend services and cloud deployment",
    "algorithms and automation",
  ],
};

export const projects = [
  {
    index: "_01.",
    title: "hardinia",
    role: "full-stack developer",
    dateRange: "nov 2025 – jan 2026",
    description: "plant-care platform with scheduled care tasks, monitoring, and automated pest-alert emails.",
    techTags: ["[react/vite]", "[spring boot]", "[docker]", "[supabase]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_02.",
    title: "netforge",
    role: "full-stack developer",
    dateRange: "may – jun 2026",
    description: "mobile network topology designer and Layer 2/3 routing simulator.",
    techTags: ["[react native]", "[expo]", "[skia]", "[zustand]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_03.",
    title: "ada",
    role: "application developer",
    dateRange: "jun 2026 – present",
    description: "business management tools for orders, expenses, inventory, and scheduling.",
    techTags: ["[react]", "[express]", "[sequelize]", "[postgresql]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_04.",
    title: "tofu",
    role: "mobile developer",
    dateRange: "jun 2026 – present",
    description: "mobile reading tracker with aggregated Google Books/Open Library search and caching.",
    techTags: ["[react native]", "[expo]", "[supabase]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_05.",
    title: "pup tulong",
    role: "full-stack developer",
    dateRange: "jun 2025 – aug 2025",
    description: "serverless student task platform with task posting, matching, Google OAuth, OTP verification, and asynchronous notifications.",
    techTags: ["[fastapi]", "[aws lambda]", "[dynamodb]"],
    githubUrl: "https://github.com/Renz5678",
  },
];

export const experience = [
  {
    dateRange: "sep 2026 – present",
    company: "hardy and co. ph, ltd",
    role: "chief technology officer",
    description: "lead architecture and engineering of web, mobile, and AI-integrated systems; implement Docker deployments, CI/CD, monitoring, and serverless infrastructure; coordinate engineering delivery and code review.",
    isActive: true,
  },
  {
    dateRange: "oct – dec 2025",
    company: "eskwelabs",
    role: "education innovation fellowship, cohort 8 (intern)",
    description: "built n8n workflows for participant processing and personalized emails, reducing manual operations by over 90%; integrated webhooks and APIs for event updates and participant tracking.",
    isActive: false,
  },
];

export const leadership = [
  {
    org: "aws student builder group — pup manila",
    role: "associate technology director (skill builder department)",
    dateRange: "sep 2026 – present",
    description: "coordinate five technical learning tracks across web, AI/ML, cloud, data analytics, and networking/security; support workshops, collaboration, recruitment, and department operations.",
  },
  {
    org: "aws cloud club pup",
    role: "programs committee member",
    dateRange: "apr 2025 – sep 2026",
    description: "organized technical learning events and supported audiovisual and program operations.",
  },
  {
    org: "jbecp pup",
    role: "membership committee member",
    dateRange: "aug 2025 – present",
    description: "maintain membership and activity records and represent the organization in inter-organization meetings.",
  },
];

export const achievements = [
  { title: "DOST-SEI Undergraduate Scholarship Awardee" },
  { title: "STTP+ — National Participant (2026)" },
  { title: "President’s Lister — 1st and 2nd year" },
  { title: "SHS Valedictorian — Batch 2023–2024" },
  { title: "Senator Win Gatchalian Academic Excellence Award" },
  { title: "UPCAT Passer — AY 2025–2026" },
  { title: "26th Philippine Mathematical Olympiad — Participant" },
  { title: "KPMG/Microsoft Academic Innovation Challenge (2025)" },
];

export const education = {
  institution: "polytechnic university of the philippines",
  degree: "bs computer science",
  expectedGrad: "expected 2028",
  gwa: "1.165",
  honors: ["president's lister — 1st and 2nd year", "DOST-SEI Undergraduate Scholarship Awardee"],
};

export const contact = {
  email: "lawrenzgarcia1202@gmail.com",
  location: "valenzuela city, metro manila",
  github: "https://github.com/Renz5678",
  linkedin: "https://linkedin.com/in/lawrenz-matthew-garcia-a84018222",
};

// === SEO & Infrastructure Constants ===

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.renzgarcia.site";

export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Lawrenz Matthew Garcia",
  alternateName: "Lawrenz Garcia",
  description: "Full-stack developer building web and mobile applications in the Philippines.",
  knowsAbout: ["Web development", "Mobile development", "React", "React Native", "FastAPI", "AWS"],
  jobTitle: "Full-Stack Developer",
  url: SITE_URL,
  sameAs: [
    contact.github,
    contact.linkedin
  ]
};
