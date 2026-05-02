import HeroSection from "@/components/home/HeroSection";
import PositioningStrip from "@/components/home/PositioningStrip";
import ServicesSection from "@/components/home/ServicesSection";
import WhatICreateSection from "@/components/home/WhatICreateSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import ClientLogos from "@/components/home/ClientLogos";
import Testimonials from "@/components/home/Testimonials";

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
