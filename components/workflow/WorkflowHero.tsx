"use client";

import { motion } from "framer-motion";
import WorkflowSplineBackground from "@/components/workflow/WorkflowSplineBackground";
import RotatingWord from "@/components/ui/RotatingWord";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
    },
  }),
};

export default function WorkflowHero() {
  return (
    <section className="relative w-full min-h-[100dvh] pt-40 pb-32 overflow-hidden flex items-center">
      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0">
        <WorkflowSplineBackground />
      </div>

      {/* Ambient glow overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-brand/10 via-brand/5 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-20 right-1/4 w-[300px] h-[200px] bg-gradient-radial from-brand/8 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Vertical flow line */}
      <div className="absolute left-8 top-0 bottom-0 w-px z-[2] shadow-[0_0_15px_rgba(96,37,213,0.4)] bg-gradient-to-b from-brand via-brand/50 to-brand/20 pointer-events-none" />

      {/* Content — pointer-events-none so Spline receives cursor events */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pointer-events-auto select-none">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 font-mono text-brand-light uppercase tracking-[0.2em] text-[11px] mb-8"
        >
          <span className="w-5 h-px bg-brand-light" />
          How I work
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-[1.1] tracking-tight mb-8"
        >
          <RotatingWord words={["raw footage", "your brief", "rough cuts", "your idea"]} className="text-brand-light" />
          <br />
          <span className="text-brand-light">to finished reel.</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-sans text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl"
        >
          A clear 7-step process. No black boxes, no guesswork. Every decision is deliberate — from brief to final export.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 flex items-center gap-3 text-text-secondary/50"
        >
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-px h-8 bg-gradient-to-b from-brand/50 to-transparent" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}