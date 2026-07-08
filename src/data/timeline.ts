export type TimelineKind = "education" | "project" | "practice" | "tooling" | "milestone";

export type TimelineMeta = {
  slug: string;
  year: number;
  kind: TimelineKind;
  tags: string[];
  featured?: boolean;
  media?: Array<{
    type: "image" | "video";
    src: string;
    title: string;
    caption?: string;
    alt?: string;
  }>;
  links?: Array<{
    label: string;
    href: string;
    type: "repo" | "demo" | "document" | "certificate" | "external";
  }>;
};

export const timelineMeta = [
  {
    slug: "2026-current-moment",
    year: 2026,
    kind: "education",
    tags: ["Metropolia", "140/240 credits", "Site update"],
    featured: true,
  },
  {
    slug: "2026-dailyhero-chatgpt-app",
    year: 2026,
    kind: "project",
    tags: ["DailyHero", "ChatGPT", "Apps SDK", "MCP", "Connector", "AI workflows"],
    featured: true,
    links: [
      {
        label: "DailyHero in ChatGPT",
        href: "https://chatgpt.com/apps/dailyhero/asdk_app_6a40dcfefd3c8191a2692b60bedada82",
        type: "demo",
      },
    ],
  },
  {
    slug: "2026-naistaxi-frontend",
    year: 2026,
    kind: "practice",
    tags: ["Naistaxi", "Part-time", "Front-end", "React Native", "TypeScript", "iOS", "Android", "Maps", "Verification"],
    featured: true,
  },
  {
    slug: "2026-current-focus",
    year: 2026,
    kind: "project",
    tags: ["Next.js", "Codex", "PRD", "Localization"],
    featured: true,
  },
  {
    slug: "2026-dailyhero",
    year: 2026,
    kind: "project",
    tags: ["iOS", "SwiftUI", "Firebase", "Cloud Functions", "Firestore", "Auth", "MCP", "OAuth", "AI workflows"],
    featured: true,
  },
  {
    slug: "2026-freelance-nda",
    year: 2026,
    kind: "practice",
    tags: ["Freelance", "NDA", "Flutter", "Figma", "Firebase", "GraphQL", "Cursor", "Codex"],
    featured: true,
  },
  {
    slug: "2025-moodie-practice",
    year: 2025,
    kind: "practice",
    tags: [
      "Full-stack",
      "Flutter",
      "Dart",
      "Firebase",
      "Firebase Auth",
      "OpenAI API",
      "GDPR",
      "TestFlight",
      "Android testing",
    ],
    featured: true,
    media: [
      {
        type: "video",
        src: "/media/timeline/2025-moodie-practice/moodie-demo.mp4",
        title: "Moodie app demo",
      },
    ],
  },
  {
    slug: "2025-metropolia-start",
    year: 2025,
    kind: "education",
    tags: ["Metropolia", "University of Applied Sciences", "Software engineering"],
    featured: true,
  },
  {
    slug: "2024-omnia-diploma",
    year: 2024,
    kind: "education",
    tags: ["Omnia", "Software Developer", "180 credits", "5/5"],
    media: [
      {
        type: "image",
        src: "/media/timeline/2024-omnia-diploma/omnia-diploma.png",
        title: "Omnia diploma",
        alt: "Omnia diploma for the Information and Communication Technology vocational qualification, Software Developer, 180 osp.",
      },
    ],
  },
  {
    slug: "2024-practice-project",
    year: 2024,
    kind: "practice",
    tags: ["Espoon Biljardikerho ry", "Tournament logic", "PHP/MySQL", "Bootstrap"],
    media: [
      {
        type: "video",
        src: "/media/timeline/2024-practice-project/bilissali-tablet-demo.mp4",
        title: "Tablet match flow demo",
        caption: "Screen recording of the tablet-facing match workflow prototype.",
      },
    ],
  },
  {
    slug: "2023-chatgpt-development",
    year: 2023,
    kind: "tooling",
    tags: ["ChatGPT", "GPT-3.5", "AI context"],
    featured: true,
  },
  {
    slug: "2022-omnia-start",
    year: 2022,
    kind: "education",
    tags: ["Omnia", "Finnish education", "Programming basics"],
  },
  {
    slug: "2007-photography-career",
    year: 2007,
    kind: "practice",
    tags: ["Photography", "Freelance", "Client work"],
  },
] satisfies TimelineMeta[];
