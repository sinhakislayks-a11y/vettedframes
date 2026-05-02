// ── Navigation ──
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Workflow", href: "/workflow" },
  { label: "Contact", href: "/contact" },
] as const;

// ── Social URLs ──
export const SOCIALS = {
  instagram: "https://instagram.com/framesbykislay",
  youtube: "https://youtube.com/@framesbykislay",
  twitter: "https://x.com/framesbykislay",
  email: "sinhakislayks@gmail.com",
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
      "Working with someone this sharp is rare. Turnaround was fast, communication was seamless, and he nailed the brief without hand-holding. When we needed adjustments, he moved quickly and got it right. This is what professional looks like.",
    name: "Muffer",
    role: "Video Editing Agency",
    company: "",
  },
  {
    quote:
      "We throw a lot of different content types at our editors — international briefs, varied formats, tight deadlines. Kislay always adapted every single time without skipping a beat. Genuinely one of the most flexible creatives we've collaborated with.",
    name: "CKS Motion",
    role: "Creative Agency",
    company: "Noida",
  },
  {
    quote:
      "In the finance content space, quality and consistency aren't optional they're everything. Kislay showed up prepared, delivered clean edits, and actually kept us in the loop throughout. Would recommend without hesitation.",
    name: "Ono Creators",
    role: "Finance Content",
    company: "",
  },
  {
    quote:
      "bro just gets it. didn't have to over-explain the vibe or the vision he felt it and brought it to life. the visuals matched the energy of the music perfectly. that's hard to find fr.",
    name: "Mizaaj",
    role: "Hip Hop Artist",
    company: "Jammu",
  },
  {
    quote:
      "We engaged them as a freelancer for a project requiring precision and a clear creative eye. The result exceeded our expectations delivered in a single pass, with zero revisions needed. Exceptional standard of work.",
    name: "Ekore Metre Plus",
    role: "Client",
    company: "Italy",
  },
];

// ── Showreel items ──
export interface ReelItem {
  title: string;
  category: string;
  gradient: string;
}

export const REEL_ITEMS: ReelItem[] = [
  { title: "SaaS Product Launch", category: "Short-form", gradient: "from-purple-900/40 to-violet-950/40" },
  { title: "YouTube Documentary", category: "Long-form", gradient: "from-indigo-900/40 to-blue-950/40" },
  { title: "Brand Story Film", category: "Cinematography", gradient: "from-violet-900/40 to-purple-950/40" },
  { title: "Viral Reel Series", category: "Short-form", gradient: "from-fuchsia-900/40 to-pink-950/40" },
  { title: "Podcast Highlights", category: "Editing", gradient: "from-purple-900/40 to-indigo-950/40" },
  { title: "Tech Review Edit", category: "YouTube", gradient: "from-violet-900/40 to-slate-950/40" },
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
// All portfolio data is now centralized in /lib/projects.ts
// Import from there: import { ALL_PROJECTS, FEATURED_PROJECTS } from "@/lib/projects";
