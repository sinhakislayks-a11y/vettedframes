import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import StorySection from "@/components/about/StorySection";
import PhilosophySection from "@/components/about/PhilosophySection";
import WhyCreatorsSection from "@/components/about/WhyCreatorsSection";
import ApproachSection from "@/components/about/ApproachSection";

export const metadata: Metadata = {
  title: "About — The editor behind Frames by Kislay",
  description:
    "Video editor, cinematographer, and visual artist with deep experience in creator content and influencer marketing. Not a freelancer — a creative partner who understands storytelling and performance.",
  openGraph: {
    title: "About — Frames by Kislay",
    description:
      "Video editor and colorist who works with creators, founders, and personal brands building long-term authority.",
  },
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <AboutHero />
      <StorySection />
      <PhilosophySection />
      <WhyCreatorsSection />
      <ApproachSection />
    </main>
  );
}
