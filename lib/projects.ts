export type Project = {
  id: string;
  title: string;
  client: string;
  role: string;
  description: string;
  link: string;
  thumbnail: string;
  category: "youtube" | "reels" | "motion" | "color" | "animation" | "ai";
  featured: boolean;
};

export const ALL_PROJECTS: Project[] = [
  {
    id: "showreel-2025",
    title: "Showreel 2025",
    client: "Frames by Kislay",
    role: "Director / Editor / Colorist",
    description: "Full 2025 showreel — every frame earned.",
    link: "https://youtube.com/shorts/GfWhtolVgxw",
    thumbnail: "https://img.youtube.com/vi/GfWhtolVgxw/hqdefault.jpg",
    category: "youtube",
    featured: true,
  },
  {
    id: "abhishek-kar",
    title: "Abhishek Kar — YouTube",
    client: "Abhishek Kar",
    role: "Editor / Colorist",
    description:
      "Finance creator, 1.98M subscribers. Hook-driven, retention-optimized.",
    link: "https://youtu.be/0wbCelgbSXA",
    thumbnail: "https://img.youtube.com/vi/0wbCelgbSXA/maxresdefault.jpg",
    category: "youtube",
    featured: true,
  },
  {
    id: "deepak-wadhwa-yt",
    title: "Deepak Wadhwa — YouTube",
    client: "Deepak Wadhwa",
    role: "Editor / Colorist",
    description:
      "Finance creator, 1.08M subscribers. Long-form YouTube edit.",
    link: "https://youtu.be/vrj2kTIWvcA",
    thumbnail: "https://img.youtube.com/vi/vrj2kTIWvcA/maxresdefault.jpg",
    category: "youtube",
    featured: false,
  },
  {
    id: "deepak-wadhwa-reel",
    title: "Deepak Wadhwa — Reel",
    client: "Deepak Wadhwa",
    role: "Editor / Color Grader",
    description:
      "Beat-synced Instagram reel, kinetic overlay treatment.",
    link: "https://www.instagram.com/reel/DCL864txFUF/",
    thumbnail:
      "https://scontent.cdninstagram.com/v/t51.71878-15/504257149_3966144323603770_673006115372647374_n.jpg",
    category: "reels",
    featured: false,
  },
  {
    id: "sanjay-khaturia",
    title: "Sanjay Khaturia — Reel",
    client: "Sanjay Khaturia",
    role: "Editor",
    description:
      "Short-form creator reel — pacing and retention optimized.",
    link: "https://www.instagram.com/reel/DTGH1jJEqFK/",
    thumbnail:
      "https://scontent.cdninstagram.com/v/t51.82787-15/611645481_18550565569048375_8106106252294646690_n.jpg",
    category: "reels",
    featured: false,
  },
  {
    id: "before-after",
    title: "Before / After Transformation",
    client: "Internal",
    role: "Editor / Colorist",
    description:
      "Raw footage vs finished edit — full transformation demo.",
    link: "https://www.instagram.com/reel/DVa6Me2jrBc/",
    thumbnail:
      "https://scontent.cdninstagram.com/v/t51.82787-15/640431557_17866662027584695_8198633278286112835_n.jpg",
    category: "reels",
    featured: true,
  },
  {
    id: "finance-reel",
    title: "Finance Reel",
    client: "Finance Creator",
    role: "Editor",
    description:
      "Finance content reel — pacing, captions, retention structure.",
    link: "https://youtube.com/shorts/OYX-wRCzF0Y",
    thumbnail: "https://img.youtube.com/vi/OYX-wRCzF0Y/hqdefault.jpg",
    category: "reels",
    featured: false,
  },
  {
    id: "saas-animation-reel",
    title: "SaaS Animation — Reel",
    client: "SaaS Client",
    role: "Motion Designer / Editor",
    description:
      "UI product animation designed for social-first format.",
    link: "https://www.instagram.com/reel/DVL9ELrjmx8/",
    thumbnail:
      "https://scontent.cdninstagram.com/v/t51.82787-15/641762747_17865594045584695_1273860970457377996_n.jpg",
    category: "animation",
    featured: false,
  },
  {
    id: "saas-animation-16x9",
    title: "SaaS Animation — 16:9",
    client: "SaaS Client",
    role: "Motion Designer / Animator",
    description:
      "Full-format SaaS product demo — clean UI motion.",
    link: "https://youtu.be/0zUVwJraRds",
    thumbnail: "https://img.youtube.com/vi/0zUVwJraRds/maxresdefault.jpg",
    category: "animation",
    featured: true,
  },
  {
    id: "narrative-animation",
    title: "Narrative Animation",
    client: "Digital Brand",
    role: "Motion Designer",
    description:
      "Narrative animation for digital brand — concept to final.",
    link: "https://youtube.com/shorts/NWnDEocc3iw",
    thumbnail: "https://img.youtube.com/vi/NWnDEocc3iw/hqdefault.jpg",
    category: "animation",
    featured: false,
  },
  {
    id: "italian-client",
    title: "Italian Client — Lifestyle Reel",
    client: "International Client",
    role: "Editor / Colorist",
    description:
      "International client — lifestyle reel, cinematic grade.",
    link: "https://youtube.com/shorts/7cPMkFu44pE",
    thumbnail: "https://img.youtube.com/vi/7cPMkFu44pE/hqdefault.jpg",
    category: "color",
    featured: false,
  },
  {
    id: "music-video",
    title: "Music Video Reel",
    client: "Music Artist",
    role: "Editor / Colorist",
    description:
      "Beat-synced edit, cinematic color treatment.",
    link: "https://www.instagram.com/reel/DKw1V1qzJxZ/",
    thumbnail:
      "https://scontent.cdninstagram.com/v/t51.71878-15/503600266_3486379241496396_3287374871895568902_n.jpg",
    category: "color",
    featured: false,
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    client: "Brand Client",
    role: "Motion Designer",
    description:
      "Typography and kinetic motion graphics — brand-driven design.",
    link: "https://youtube.com/shorts/F4rOhuoFic0",
    thumbnail: "https://img.youtube.com/vi/F4rOhuoFic0/hqdefault.jpg",
    category: "motion",
    featured: false,
  },
  {
    id: "youtube-ad",
    title: "YouTube Ad",
    client: "Brand Client",
    role: "Editor / Motion Designer",
    description:
      "YouTube pre-roll ad — hook-first format, 15-second cut-down.",
    link: "https://youtu.be/JcaAKdm3WJc",
    thumbnail: "https://img.youtube.com/vi/JcaAKdm3WJc/maxresdefault.jpg",
    category: "motion",
    featured: false,
  },
  {
    id: "faceless-youtube",
    title: "Faceless YouTube",
    client: "YouTube Creator",
    role: "Editor / Motion Designer",
    description:
      "Faceless YouTube format — visual storytelling without on-camera presence.",
    link: "https://youtu.be/bUiUUlQ83ig",
    thumbnail: "https://img.youtube.com/vi/bUiUUlQ83ig/maxresdefault.jpg",
    category: "youtube",
    featured: false,
  },
  {
    id: "talking-head",
    title: "YouTube Talking Head",
    client: "YouTube Creator",
    role: "Editor / Colorist",
    description:
      "Retention-optimized talking head edit — pacing, captions, b-roll.",
    link: "https://youtu.be/wTDpjgk1fpI",
    thumbnail: "https://img.youtube.com/vi/wTDpjgk1fpI/maxresdefault.jpg",
    category: "youtube",
    featured: true,
  },
  {
    id: "finance-reel-grow",
    title: "Finance Reel — Grow",
    client: "Finance Creator",
    role: "Editor",
    description:
      "Finance short-form content — growth-optimized structure.",
    link: "https://youtube.com/shorts/2DuVAZaUFqw",
    thumbnail: "https://img.youtube.com/vi/2DuVAZaUFqw/hqdefault.jpg",
    category: "reels",
    featured: false,
  },
  {
    id: "ugc-ad",
    title: "UGC Ad Reel",
    client: "Brand Client",
    role: "Editor",
    description:
      "User-generated content ad — native feel, scroll-stopping hook.",
    link: "https://youtube.com/shorts/eVoM1gBBCtY",
    thumbnail: "https://img.youtube.com/vi/eVoM1gBBCtY/hqdefault.jpg",
    category: "reels",
    featured: false,
  },
];

export const FEATURED_PROJECTS = ALL_PROJECTS.filter((p) => p.featured);

export const PROJECTS_BY_CATEGORY = (cat: Project["category"]) =>
  ALL_PROJECTS.filter((p) => p.category === cat);
