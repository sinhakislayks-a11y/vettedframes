"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex items-center overflow-hidden">
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg-secondary" />

      {/* Subtle film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-brand/[0.06] via-brand/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Vertical accent line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand/20 to-transparent pointer-events-none hidden md:block" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-mono text-brand/60 uppercase tracking-[0.25em] text-[11px] mb-8"
        >
          About
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[1.05] tracking-tight mb-12"
        >
          I make videos that
          <br />
          <span className="text-brand-light">hold attention.</span>
        </motion.h1>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-xl"
        >
          <p className="font-sans text-text-secondary text-lg md:text-xl leading-relaxed">
            Video editor, cinematographer, and visual artist. I work with
            creators, founders, and personal brands who understand that
            content is a long game — and want someone who plays it well.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-20 flex items-center gap-3 text-text-secondary/40"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-10 bg-gradient-to-b from-brand/40 to-transparent" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Scroll to read
          </span>
        </motion.div>
      </div>
    </section>
  );
}
