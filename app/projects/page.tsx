import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Portfolio — Frames by Kislay",
  description:
    "View all video editing projects: YouTube edits, reels, motion graphics, animation, and cinematography work by Frames by Kislay.",
  keywords: [
    "video editor portfolio",
    "YouTube editor samples",
    "reels portfolio",
    "video editing work",
  ],
  openGraph: {
    title: "Portfolio — Frames by Kislay",
    description:
      "View all video editing projects: YouTube edits, reels, motion graphics, animation, and cinematography work.",
  },
  twitter: {
    title: "Portfolio — Frames by Kislay",
    description:
      "Video editing projects for creators and SaaS brands.",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}