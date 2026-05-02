"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Rhythm, not just cuts",
    description:
      "Editing is musical. Every cut is a beat. Every transition is a breath. The best edits feel inevitable — you don't notice the decisions because they land exactly when they should.",
  },
  {
    title: "Invisible but intentional",
    description:
      "Good editing is invisible. That's the goal. Not flashy transitions or Effects. Just clean, purposeful choices that serve the story. When someone watches your video and doesn't notice the editing — that's success.",
  },
  {
    title: "Retention is not a hack",
    description:
      "There's no magic hook formula. Retention comes from clarity — knowing what you're saying, knowing who you're saying it to, and timing every beat to land right. It's craft, not tricks.",
  },
  {
    title: "Feel matters as much as metrics",
    description:
      "I care about how content performs. But I also care about how it feels to watch. A video that gets clicks but feels hollow? That's not a win. I want to make things that work AND feel right.",
  },
];

function PrincipleCard({
  principle,
  index,
}: {
  principle: (typeof PRINCIPLES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Number */}
      <span className="font-mono text-brand/30 text-[64px] md:text-[80px] font-bold absolute -top-4 -left-2 md:-left-4 select-none pointer-events-none leading-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="relative pt-16 md:pt-20 pl-2">
        <h3 className="font-display font-semibold text-lg md:text-xl text-text-primary mb-3 tracking-tight">
          {principle.title}
        </h3>
        <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed">
          {principle.description}
        </p>
      </div>

      {/* Hover line */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-brand to-brand-light group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

export default function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/30 via-bg to-bg-secondary/30" />

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-gradient-radial from-brand/[0.05] to-transparent rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-20 flex items-center gap-4">
          <div className="w-8 h-px bg-brand" />
          <span className="font-mono text-brand/60 text-[10px] uppercase tracking-[0.25em]">
            Perspective
          </span>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-text-primary tracking-tight leading-tight mb-6">
            How I think about editing
          </h2>
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
            Not just the technical execution. The philosophy behind it.
          </p>
        </motion.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {PRINCIPLES.map((principle, index) => (
            <PrincipleCard
              key={principle.title}
              principle={principle}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
