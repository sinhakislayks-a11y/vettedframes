"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SplineScene from "./SplineScene";

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function HeroSection() {
  const handleCTA = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center h-screen w-full overflow-hidden"
    >
      {/* Spline 3D Background - full viewport, receives pointer events */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        <SplineScene />
      </div>

      {/* Dark overlay for text readability - z-0.5, blocks Spline color bleed */}
      <div className="fixed inset-0 w-screen h-screen z-[1] bg-bg/70 pointer-events-none" />

      {/* Content Overlay - z-10, interactive */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Label */}
        <motion.p
          variants={fadeUp}
          className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-6"
        >
          Video Editor — Colorist — Cinematographer
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-bold text-4xl md:text-6xl leading-tight mb-6"
        >
          <span className="text-text-primary">Convert your ideas into</span>
          <br />
          <span className="text-brand">defining visuals.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-text-secondary text-lg max-w-[480px] mb-10"
        >
          High-retention reels and short-form content for SaaS founders and
          YouTube creators.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={fadeUp}>
          <Button
            onClick={handleCTA}
            className="bg-brand text-bg font-sans font-medium text-sm px-6 h-10 border border-transparent hover:bg-transparent hover:border-brand hover:text-brand transition-all duration-300 cursor-pointer"
          >
            Send me your last video
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
