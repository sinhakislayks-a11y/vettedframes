"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function StoryBlock({
  eyebrow,
  title,
  content,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  content: string;
  align?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-6 ${
        align === "right" ? "md:items-end md:text-right" : ""
      }`}
    >
      <motion.span
        initial={{ opacity: 0, x: align === "right" ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-mono text-brand/50 text-[10px] uppercase tracking-[0.3em]"
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-display font-semibold text-2xl md:text-3xl text-text-primary tracking-tight leading-tight"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-sans text-text-secondary text-base md:text-lg leading-relaxed max-w-lg"
      >
        {content}
      </motion.p>
    </div>
  );
}

export default function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-secondary/50" />

      {/* Decorative line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-custom/50 to-transparent hidden md:block" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 flex items-center gap-4"
        >
          <div className="w-8 h-px bg-brand" />
          <span className="font-mono text-brand/60 text-[10px] uppercase tracking-[0.25em]">
            Background
          </span>
        </motion.div>

        {/* Story blocks - split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <StoryBlock
            eyebrow="The agency years"
            title="Speed without compromise"
            content="I worked in an influencer marketing agency handling high-volume creator content — reels, podcasts, YouTube videos. Finance creators, lifestyle creators, tech creators. The pace was relentless and the standards were high. That environment taught me how to think fast and deliver faster, without letting quality slip."
            align="left"
          />

          <StoryBlock
            eyebrow="What stayed"
            title="The instinct for retention"
            content="Working at that speed, you develop something more valuable than speed itself — an instinct for what holds attention and what loses it. I learned to feel when pacing is off, when a cut breaks flow, when the hook dies before it starts. That's not something you learn. It's something you earn."
            align="right"
          />
        </div>

        {/* Full-width quote */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 md:mt-32 text-center max-w-3xl mx-auto"
        >
          <blockquote className="font-display font-light text-xl md:text-3xl text-text-primary/90 leading-snug italic">
            "But I don't see editing as execution. I see it as the invisible
            architecture that controls how content feels."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
