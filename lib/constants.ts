// ── Navigation ──
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Workflow", href: "/workflow" },
  { label: "Contact", href: "/contact" },
] as const;

// ── Social URLs ──
export const SOCIALS = {
  instagram: "https://instagram.com/framesbykislay",
  youtube: "https://youtube.com/@framesbykislay",
  twitter: "https://x.com/framesbykislay",
  email: "hello@framesbykislay.com",
} as const;

// ── Services ──
export interface Service {
  title: string;
  description: string;
  icon: string; // emoji or lucide icon name
}

export const SERVICES: Service[] = [
  {
    title: "Video Editing",
    description:
      "Precision cuts engineered for watch time. Every transition, beat sync, and pacing decision is built to hold attention from first frame to last.",
    icon: "film",
  },
  {
    title: "Color Grading",
    description:
      "Cinematic color science that sets mood and brand tone. From LOG footage to final delivery — DaVinci Resolve powered, pixel-accurate results.",
    icon: "palette",
  },
  {
    title: "Cinematography",
    description:
      "Camera direction and visual storytelling that elevates your content from amateur to unmistakably professional. Concept to capture.",
    icon: "camera",
  },
];

// ── Testimonials ──
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Kislay turned our raw product demo into a reel that hit 2M views. The retention curve was insane — 78% watched till the end.",
    name: "Arjun Mehta",
    role: "Founder",
    company: "ShipFast.io",
  },
  {
    quote:
      "I've worked with a dozen editors. Kislay is the first one who actually understood pacing for YouTube. My average view duration jumped 40%.",
    name: "Priya Sharma",
    role: "YouTube Creator",
    company: "520K subscribers",
  },
  {
    quote:
      "The color grade alone made our brand videos feel like a Netflix promo. We now get asked who does our production.",
    name: "Ravi Kumar",
    role: "Head of Marketing",
    company: "StackBlitz",
  },
];

// ── Showreel items ──
export interface ReelItem {
  title: string;
  category: string;
  gradient: string;
}

export const REEL_ITEMS: ReelItem[] = [
  { title: "SaaS Product Launch", category: "Short-form", gradient: "from-amber-900/40 to-orange-950/40" },
  { title: "YouTube Documentary", category: "Long-form", gradient: "from-blue-900/40 to-indigo-950/40" },
  { title: "Brand Story Film", category: "Cinematography", gradient: "from-emerald-900/40 to-teal-950/40" },
  { title: "Viral Reel Series", category: "Short-form", gradient: "from-rose-900/40 to-pink-950/40" },
  { title: "Podcast Highlights", category: "Editing", gradient: "from-violet-900/40 to-purple-950/40" },
  { title: "Tech Review Edit", category: "YouTube", gradient: "from-cyan-900/40 to-sky-950/40" },
];

// ── Client logos (text-based placeholders) ──
export const CLIENT_NAMES = [
  "ShipFast",
  "StackBlitz",
  "LaunchDark",
  "PixelForge",
  "CodeCraft",
  "VelociDev",
  "NeuralHive",
  "StreamPulse",
] as const;

// ── Workflow steps ──
export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: "Send Your Footage",
    description:
      "Drop your raw clips, reference videos, and a brief. I'll review everything within 24 hours and send you a creative direction outline.",
    duration: "Day 1",
  },
  {
    step: 2,
    title: "Creative Direction",
    description:
      "I map out the edit structure — pacing, hooks, transitions, and music. You get a storyboard-style breakdown before a single cut is made.",
    duration: "Day 2",
  },
  {
    step: 3,
    title: "First Cut",
    description:
      "Full rough cut with music, pacing, and structure locked in. Color and graphics are placeholder — this is about nailing the narrative flow.",
    duration: "Day 3-4",
  },
  {
    step: 4,
    title: "Revisions & Color",
    description:
      "Your feedback shapes the final version. I dial in the color grade, sound design, motion graphics, and export in every format you need.",
    duration: "Day 5-6",
  },
  {
    step: 5,
    title: "Final Delivery",
    description:
      "Polished master file plus platform-optimized exports for YouTube, Instagram, TikTok, and LinkedIn. Thumbnail and caption suggestions included.",
    duration: "Day 7",
  },
];

// ── Tools ──
export const TOOLS = [
  "DaVinci Resolve",
  "Premiere Pro",
  "After Effects",
  "Photoshop",
  "Figma",
  "Frame.io",
  "CapCut",
  "Blender",
] as const;

// ── Deliverables ──
export const DELIVERABLES = [
  "Master file in ProRes / H.265",
  "Platform-optimized exports (YT, IG, TikTok, LinkedIn)",
  "Color-graded final + LUT file",
  "Thumbnail concepts (3 options)",
  "Caption / hook suggestions",
  "Project file backup",
] as const;

// ── Site metadata ──
export const SITE = {
  name: "VettedFrames",
  tagline: "Convert your ideas into defining visuals",
  description:
    "High-retention reels and short-form content for SaaS founders and YouTube creators.",
  url: "https://vettedframes.vercel.app",
} as const;

// ── Service Tiers ──
export interface ServiceTier {
  tier: string;
  name: string;
  description: string;
  deliverables: string[];
  cta: string;
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    tier: "One-time",
    name: "Hook Surgery",
    description:
      "Your hook is the only reason someone stays. I'll rebuild it until it works.",
    deliverables: [
      "Restructured first 30 seconds",
      "Hook variant A/B options",
      "Retention-optimized cut",
    ],
    cta: "Start here →",
  },
  {
    tier: "Monthly retainer",
    name: "Retention Engine",
    description:
      "Consistent editing for creators who need output without managing an editor.",
    deliverables: [
      "Up to 12 short-form edits per month",
      "Color grading included",
      "Captions and motion graphics",
      "Dedicated turnaround SLA",
    ],
    cta: "Get a quote →",
  },
  {
    tier: "Monthly retainer",
    name: "Done-For-You",
    description:
      "Full production pipeline. You record, I handle everything else.",
    deliverables: [
      "Editing, color, captions, graphics",
      "Thumbnail direction",
      "Multi-format delivery (YouTube, Reels, Shorts)",
      "Strategy input on hook and structure",
    ],
    cta: "Let's talk →",
  },
];

// ── Portfolio Items ──
export interface PortfolioItem {
  title: string;
  role: string;
  description: string;
  link: string;
  thumbnail?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: "SHOWREEL 2025",
    role: "Director / Editor / Colorist",
    description: "Full 2025 showreel — every frame earned.",
    link: "https://drive.google.com/file/d/1nsNLidO744C96IY79heecsjgnYNMmkZl/view",
  },
  {
    title: "Abhishek Kar — YouTube",
    role: "Editor / Colorist",
    description: "Finance creator, 1.98M subscribers. Hook-driven, retention-optimized.",
    link: "https://youtu.be/0wbCelgbSXA",
    thumbnail: "https://img.youtube.com/vi/0wbCelgbSXA/maxresdefault.jpg",
  },
  {
    title: "Deepak Wadhwa — YouTube",
    role: "Editor / Colorist",
    description: "Finance creator, 1.08M subscribers. Long-form YouTube edit.",
    link: "https://youtu.be/vrj2kTIWvcA",
    thumbnail: "https://img.youtube.com/vi/vrj2kTIWvcA/maxresdefault.jpg",
  },
  {
    title: "Deepak Wadhwa — Reel",
    role: "Editor / Color Grader",
    description: "Beat-synced Instagram reel, kinetic overlay treatment.",
    link: "https://www.instagram.com/reel/DCL864txFUF/",
  },
  {
    title: "Sanjay Khaturia — Reel",
    role: "Editor",
    description: "Short-form creator reel — pacing and retention optimized.",
    link: "https://www.instagram.com/reel/DTGH1jJEqFK/",
  },
  {
    title: "Before/After Transformation",
    role: "Editor / Colorist",
    description: "Raw footage vs finished edit — full transformation demo.",
    link: "https://www.instagram.com/reel/DVa6Me2jrBc/",
  },
  {
    title: "Finance Reel",
    role: "Editor",
    description: "Finance content reel — pacing, captions, retention structure.",
    link: "https://drive.google.com/file/d/1C8t4kNsl_4bhZiAdAKsN8L4nrCg_Mjwp/view",
  },
  {
    title: "SaaS Animation — Reel",
    role: "Motion Designer / Editor",
    description: "UI product animation designed for social-first format.",
    link: "https://www.instagram.com/reel/DVL9ELrjmx8/",
  },
  {
    title: "SaaS Animation — 16:9",
    role: "Motion Designer / Animator",
    description: "Full-format SaaS product demo — clean UI motion.",
    link: "https://drive.google.com/file/d/1UHDc1OTcSOCmALUcEUs2OhQzHiYMVCXq/view",
  },
  {
    title: "Narrative Animation",
    role: "Motion Designer",
    description: "Narrative animation for digital brand — concept to final.",
    link: "https://drive.google.com/file/d/1oFGStB53KP1ivvJQqaAwk/view",
  },
  {
    title: "Italian Client — Lifestyle Reel",
    role: "Editor / Colorist",
    description: "International client — lifestyle reel, cinematic grade.",
    link: "https://drive.google.com/file/d/1wllN6wY4yFRaWfiR97cMrFcjoPQqaAwk/view",
  },
  {
    title: "Music Video Reel",
    role: "Editor / Colorist",
    description: "Beat-synced edit, cinematic color treatment.",
    link: "https://drive.google.com/file/d/1Cx3sLvTjHkDkO6eS3V6qqJfBDf1BL-9F/view",
  },
  {
    title: "Motion Graphics",
    role: "Motion Designer",
    description: "Typography and kinetic motion graphics — brand-driven design.",
    link: "https://drive.google.com/file/d/1cVoR22X0pdbD91bfFKD_H7baAfu-GAwC/view",
  },
];
