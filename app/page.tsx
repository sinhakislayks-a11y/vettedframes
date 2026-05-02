import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import PositioningStrip from "@/components/home/PositioningStrip";
import ServicesSection from "@/components/home/ServicesSection";
import WhatICreateSection from "@/components/home/WhatICreateSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import ClientLogos from "@/components/home/ClientLogos";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "Video Editor & Colorist for YouTube Creators and SaaS Founders",
  description:
    "High-retention reels, YouTube edits, and cinematic content for creators and SaaS brands in India. Get scroll-stopping videos that convert.",
  keywords: [
    "video editor for YouTube India",
    "SaaS video editor",
    "reels editor India",
    "short form video editor",
    "video editor for creators",
  ],
  openGraph: {
    title: "Frames by Kislay — Video Editor & Colorist",
    description:
      "High-retention reels and short-form content for SaaS founders and YouTube creators. Transform your ideas into defining visuals.",
  },
  twitter: {
    title: "Frames by Kislay — Video Editor & Colorist",
    description:
      "High-retention reels and short-form content for SaaS founders and YouTube creators.",
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <PositioningStrip />
      <ServicesSection />
      <WhatICreateSection />
      <PortfolioSection />
      <ClientLogos />
      <Testimonials />
    </main>
  );
}
