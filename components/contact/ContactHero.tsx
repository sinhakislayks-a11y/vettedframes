"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ContactSplineBackground from "@/components/contact/ContactSplineBackground";
import AnoAI from "@/components/ui/animated-shader-background";
import RotatingWord from "@/components/ui/RotatingWord";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function ContactHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden flex items-center">
      {/* Background — shader on mobile, Spline on desktop */}
      <div className="absolute inset-0 z-0">
        {isMobile ? <AnoAI /> : <ContactSplineBackground />}
      </div>

      {/* Dark gradient for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(5,5,7,0.75) 0%, rgba(5,5,7,0.3) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pointer-events-none select-none">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-mono text-brand uppercase tracking-widest text-xs mb-4"
        >
          Work with me
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display font-bold text-3xl md:text-5xl text-text-primary mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          Got a <RotatingWord words={["reel", "project", "brand film", "campaign"]} className="text-brand-light" /> in mind?
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-sans text-text-secondary text-lg max-w-[520px] leading-relaxed"
        >
          Send me your last video and I&apos;ll give you a free 60-second edit
          audit. No pitch. No strings. If it clicks, we work together.
        </motion.p>
      </div>

      {/* Invisible clickable overlay on the Spline "Get in touch" button area → WhatsApp */}
      <a
        href="https://wa.me/919470878005?text=Hi%20Kislay%2C%20I%20want%20to%20discuss%20a%20project"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get in touch on WhatsApp"
        className="absolute z-20"
        style={{
          left: "50%",
          bottom: "18%",
          transform: "translateX(-50%)",
          width: "220px",
          height: "60px",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      />
    </section>
  );
}
