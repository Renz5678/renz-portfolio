// =========================================================
// PORTFOLIO CONTENT — sourced from Stitch design HTML
// =========================================================

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lawrenz.dev";

// ── HERO ─────────────────────────────────────────────────
export const hero = {
  name: "Lawrenz Matthew Garcia",
  role: "Backend / AI Engineer",
  prompt: "lawrenz:~$ whoami --role",
  promptComment: "// backend / ai engineer",
  tagline:
    "third-year computer science student at pup and backend ai engineer — building full-stack systems across web, mobile, and cloud.",
  availability: "available for internships & backend/ai roles",
  location: "Valenzuela City, Metro Manila [UTC+08:00]",
  school: "PUP BS Computer Science",
  stats: [
    { value: "3+", label: "years coding" },
    { value: "5+", label: "projects shipped" },
    { value: "6+", label: "stacks worked in" },
  ],
} as const;

// ── ABOUT ─────────────────────────────────────────────────
export const about = {
  quote:
    "engineering resilient backend architectures, intelligent ai pipelines, and seamless cross-platform interfaces with disciplined software design.",
  bio: `hi, i'm lawrenz matthew garcia. a computer science student at polytechnic university of the philippines and backend ai engineer. i build full-stack systems spanning distributed cloud services, machine learning backends, responsive web clients, and native mobile utilities.`,
  availability: "open for internships & backend/ai roles",
  location: "valenzuela city / remote / hybrid",
  coreFocus:
    "microservices architecture, serverless pipelines, generative ai systems, api design, and native mobile cross-platform state sync.",
  email: "lawrenzgarcia1202@gmail.com",
  phone: "+63 994 949 9332",
} as const;

// ── PROJECTS ──────────────────────────────────────────────
export type Project = {
  index: string;
  title: string;
  role: string;
  dateRange: string;
  description: string;
  techTags: string[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    index: "_01.",
    title: "hardinia",
    role: "full-stack developer",
    dateRange: "nov 2025 – jan 2026",
    description:
      "building full-stack application with robust spring boot backend, supabase storage/auth, and dockerized microservices.",
    techTags: ["[react/vite]", "[spring boot]", "[docker]", "[supabase]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_02.",
    title: "netforge",
    role: "full-stack developer",
    dateRange: "may 2026 – jun 2026",
    description:
      "mobile application engineering utilizing react native skia graphics, state synchronization via zustand, and cloud telemetry.",
    techTags: [
      "[react native]",
      "[expo]",
      "[skia]",
      "[zustand]",
      "[supabase]",
    ],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_03.",
    title: "ada",
    role: "full-stack developer",
    dateRange: "jun 2026 – present",
    description:
      "frontend and interactive system built with dynamic transitions, modern react patterns, and responsive tailwind layout.",
    techTags: ["[react]", "[tailwind css]", "[framer motion]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_04.",
    title: "tofu",
    role: "full-stack developer",
    dateRange: "jun 2026 – present",
    description:
      "cross-platform mobile utility leveraging expo tooling and resilient supabase cloud persistence.",
    techTags: ["[react native]", "[expo]", "[supabase]"],
    githubUrl: "https://github.com/Renz5678",
  },
  {
    index: "_05.",
    title: "pup tulong",
    role: "full-stack developer",
    dateRange: "jun 2025 – aug 2025",
    description:
      "serverless community platform powered by aws lambda, high-throughput dynamodb, docker containers, and fastapi endpoints.",
    techTags: [
      "[fastapi]",
      "[dynamodb]",
      "[aws lambda]",
      "[docker]",
    ],
    githubUrl: "https://github.com/Renz5678",
  },
];

// ── TECH STACK ────────────────────────────────────────────
export type TechItem = { name: string; label: string };
export type TechGroup = {
  id: string;
  header: string;
  badge: string;
  items: TechItem[];
};

export const techStack: TechGroup[] = [
  {
    id: "01",
    header: "[01_LANGUAGES]",
    badge: "SYNTAX",
    items: [
      { name: "python", label: "ai / backend" },
      { name: "java", label: "oop / spring" },
      { name: "c / c++", label: "systems" },
      { name: "javascript", label: "esnext" },
      { name: "sql", label: "relational" },
      { name: "html / css", label: "markup" },
    ],
  },
  {
    id: "02",
    header: "[02_FRAMEWORKS]",
    badge: "LIBS",
    items: [
      { name: "fastapi", label: "async api" },
      { name: "spring boot", label: "enterprise" },
      { name: "express.js", label: "node svc" },
      { name: "react", label: "web ui" },
      { name: "react native (expo)", label: "mobile" },
      { name: "next.js", label: "ssr/app" },
      { name: "tailwind css", label: "tokens" },
    ],
  },
  {
    id: "03",
    header: "[03_CLOUD & DATA]",
    badge: "INFRA",
    items: [
      { name: "aws lambda", label: "serverless" },
      { name: "dynamodb", label: "nosql" },
      { name: "supabase", label: "baas / psql" },
      { name: "docker", label: "containers" },
      { name: "vercel", label: "edge hosting" },
      { name: "render", label: "cloud deploys" },
      { name: "github actions", label: "ci/cd" },
    ],
  },
  {
    id: "04",
    header: "[04_TOOLS & OPS]",
    badge: "SYSTEMS",
    items: [
      { name: "git", label: "vcs" },
      { name: "vs code", label: "editor" },
      { name: "cisco packet tracer", label: "networking" },
      { name: "tinkercad", label: "circuits/sim" },
      { name: "google workspace", label: "collab" },
      { name: "ms office", label: "docs" },
    ],
  },
];

// ── EXPERIENCE ────────────────────────────────────────────
export type ExperienceEntry = {
  dateRange: string;
  meta: string;
  company: string;
  role: string;
  description: string;
  isActive: boolean;
  isPlaceholder: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    dateRange: "in progress // 2025 – 2026",
    meta: "internship role",
    company: "flyrank ai",
    role: "backend ai engineer intern",
    description:
      "engineered backend ai pipeline architectures and core predictive models. designed scalable microservice endpoints for model serving, inference synchronization, and data batch processing.",
    isActive: true,
    isPlaceholder: true,
  },
  {
    dateRange: "oct 2025 – dec 2025",
    meta: "cohort 8",
    company: "eskwelabs",
    role: "intern, education innovation fellowship",
    description:
      "collaborative innovation fellowship tackling data and educational workflows. designed data-driven tools, automated evaluation pipelines, and supported modern instructional technology delivery.",
    isActive: false,
    isPlaceholder: true,
  },
];

// ── LEADERSHIP ────────────────────────────────────────────
export type LeadershipEntry = {
  category: string;
  org: string;
  role: string;
  description: string;
};

export const leadership: LeadershipEntry[] = [
  {
    category: "// tech community",
    org: "aws student group pup",
    role: "associate technology director",
    description:
      "community tech leadership and cloud architecture workshops. fostering cloud engineering fluency and aws tool adoption for university students.",
  },
  {
    category: "// technical governance",
    org: "pup ads",
    role: "associate director for technicals",
    description:
      "technical direction, project coordination, and engineering guidance across multidisciplinary academic and developer initiatives.",
  },
  {
    category: "// executive leadership",
    org: "hardy and co.",
    role: "chief technology officer",
    description:
      "leading technical roadmap, system design, and platform infrastructure. governing technical standards and deployment cadence.",
  },
];

// ── ACHIEVEMENTS ──────────────────────────────────────────
export type Achievement = {
  title: string;
  institution: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    title: "valedictorian",
    institution: "gtdlnhs shs batch 2023–2024",
    description:
      "highest academic distinction for graduating high school cohort.",
  },
  {
    title: "dost-sei undergraduate scholarship awardee",
    institution: "department of science and technology — sei",
    description:
      "prestigious national science & technology undergraduate merit grant.",
  },
  {
    title:
      "dost-sei scholars' technopreneurship training program (sttp+)",
    institution: "national participant",
    description:
      "competitively selected from ~500 applicants nationwide for intensive tech incubation.",
  },
];

// ── EDUCATION ─────────────────────────────────────────────
export const education = {
  institution: "polytechnic university of the philippines",
  location: "sta. mesa, manila",
  degree: "bs computer science",
  expectedGrad: "2028",
  year: "currently 3rd year",
  honors: ["president's lister (1st year, 2nd year)"],
} as const;

// ── CONTACT ───────────────────────────────────────────────
export const contact = {
  email: "lawrenzgarcia1202@gmail.com",
  phone: "+63 994 949 9332",
  location: "valenzuela city, metro manila",
  github: "https://github.com/Renz5678",
  githubHandle: "github.com/renz5678",
  linkedin:
    "https://linkedin.com/in/lawrenz-matthew-garcia-a84018222",
  linkedinHandle: "linkedin/in/lawrenz-matthew-garcia",
} as const;

// ── NAV ───────────────────────────────────────────────────
export const navLinks = [
  { label: "01. about", href: "#about" },
  { label: "02. projects", href: "#works" },
  { label: "03. stack", href: "#capabilities" },
  { label: "04. trajectory", href: "#trajectory" },
  { label: "05. leadership", href: "#leadership" },
  { label: "06. honors", href: "#honors" },
  { label: "07. transmit", href: "#contact" },
] as const;

// ── JSON-LD PERSON SCHEMA ─────────────────────────────────
export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lawrenz Matthew Garcia",
  jobTitle: "Backend / AI Engineer",
  url: SITE_URL,
  email: "lawrenzgarcia1202@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Valenzuela City",
    addressRegion: "Metro Manila",
    addressCountry: "PH",
  },
  sameAs: [
    "https://github.com/Renz5678",
    "https://linkedin.com/in/lawrenz-matthew-garcia-a84018222",
  ],
};
