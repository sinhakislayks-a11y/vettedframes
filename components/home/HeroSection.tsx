"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SplineScene from "@/components/home/SplineScene";

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HeroSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    queueMicrotask(() => setPrefersReducedMotion(mq.matches));
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleCTA = () => {
    window.location.href = "/contact#contact-form";
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center h-[100dvh] w-full overflow-hidden"
    >
      {/* 3D Spline Background — fills the entire hero, sits behind everything */}
      <div className="absolute inset-0 z-0">
        <SplineScene />
      </div>

      {/* Radial gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-radial-purple pointer-events-none" />

      {/* Content Overlay — pointer-events-none so clicks pass through to Spline */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl pointer-events-auto select-none"
        initial="hidden"
        animate="visible"
        variants={prefersReducedMotion ? {} : fadeUp}
      >
        <motion.p
          variants={prefersReducedMotion ? {} : fadeUp}
          className="font-mono text-text-secondary/80 uppercase tracking-widest text-xs mb-6"
        >
          Video Editor — Colorist — Cinematographer
        </motion.p>

        <motion.h1
          variants={prefersReducedMotion ? {} : fadeUp}
          className="font-display font-bold text-4xl md:text-6xl leading-tight mb-6"
        >
          <span className="text-text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Convert your ideas into</span>
          <br />
          <span className="bg-gradient-to-r from-brand-light via-purple-400 to-brand bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(96,37,213,0.4)]">defining visuals.</span>
        </motion.h1>

        <motion.p
          variants={prefersReducedMotion ? {} : fadeUp}
          className="font-sans text-text-secondary/80 text-lg max-w-[480px] mb-10"
        >
          High-retention reels and short-form content for SaaS founders and
          YouTube creators.
        </motion.p>

        <motion.div variants={prefersReducedMotion ? {} : fadeUp} className="pointer-events-auto">
          <Button
            onClick={handleCTA}
            className="bg-gradient-to-r from-brand to-brand-dark text-white font-sans font-semibold text-sm px-8 h-12 border border-transparent shadow-[0_0_25px_rgba(96,37,213,0.4)] hover:shadow-[0_0_40px_rgba(96,37,213,0.5)] hover:brightness-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            Send me your last video
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}