"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function StoryBlock({
  eyebrow,
  title,
  content,
  align = "left",
  index,
}: {
  eyebrow: string;
  title: string;
  content: string;
  align?: "left" | "right";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col gap-6 ${
        align === "right" ? "md:items-end md:text-right" : ""
      }`}
    >
      {/* Animated accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        className={`h-px bg-gradient-to-r from-brand to-brand-light origin-left ${
          align === "right" ? "md:origin-right" : ""
        }`}
      />

      <motion.span
        initial={{ opacity: 0, x: align === "right" ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        className="font-mono text-brand/50 text-[10px] uppercase tracking-[0.3em]"
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
        className="font-display font-semibold text-2xl md:text-3xl text-text-primary tracking-tight leading-tight"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        className="font-sans text-text-secondary text-base md:text-lg leading-relaxed max-w-lg"
      >
        {content}
      </motion.p>
    </motion.div>
  );
}

export default function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parallax for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Background with animated gradient */}
      <motion.div
        className="absolute inset-0 bg-bg-secondary/30"
        style={{ y: y1 }}
      />

      {/* Animated mesh gradient layers */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-brand/[0.05] to-transparent blur-[100px] pointer-events-none"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-brand-light/[0.04] to-transparent blur-[80px] pointer-events-none"
        style={{ y: y1 }}
      />

      {/* Decorative line with glow */}
      <div className="absolute left-8 top-0 bottom-0 hidden md:block">
        <motion.div
          className="w-px h-full bg-gradient-to-b from-transparent via-brand/20 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand/30 shadow-[0_0_20px_rgba(96,37,213,0.5)]" />
        <div className="absolute top-2/4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand/20" />
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand/30" />
      </div>

      {/* Floating film strip decoration */}
      <motion.div
        className="absolute right-0 top-1/4 pointer-events-none hidden lg:block"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <svg width="40" height="300" viewBox="0 0 40 300" fill="none" className="opacity-20">
          <rect x="4" y="4" width="32" height="292" rx="2" stroke="#6025D5" strokeWidth="1" />
          <circle cx="8" cy="20" r="4" fill="#6025D5" />
          <circle cx="8" cy="60" r="4" fill="#6025D5" />
          <circle cx="8" cy="100" r="4" fill="#6025D5" />
          <circle cx="8" cy="140" r="4" fill="#6025D5" />
          <circle cx="8" cy="180" r="4" fill="#6025D5" />
          <circle cx="8" cy="220" r="4" fill="#6025D5" />
          <circle cx="8" cy="260" r="4" fill="#6025D5" />
          <circle cx="32" cy="20" r="4" fill="#6025D5" />
          <circle cx="32" cy="60" r="4" fill="#6025D5" />
          <circle cx="32" cy="100" r="4" fill="#6025D5" />
          <circle cx="32" cy="140" r="4" fill="#6025D5" />
          <circle cx="32" cy="180" r="4" fill="#6025D5" />
          <circle cx="32" cy="220" r="4" fill="#6025D5" />
          <circle cx="32" cy="260" r="4" fill="#6025D5" />
        </svg>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 flex items-center gap-4"
        >
          <motion.div
            className="w-8 h-px bg-brand"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6 }}
          />
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
            index={0}
          />

          <StoryBlock
            eyebrow="What stayed"
            title="The instinct for retention"
            content="Working at that speed, you develop something more valuable than speed itself — an instinct for what holds attention and what loses it. I learned to feel when pacing is off, when a cut breaks flow, when the hook dies before it starts. That's not something you learn. It's something you earn."
            align="right"
            index={1}
          />
        </div>

        {/* Full-width quote with animated decoration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-24 md:mt-32 text-center max-w-3xl mx-auto relative"
        >
          {/* Quote marks */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[80px] text-brand/10 select-none">
            "
          </span>

          <blockquote className="font-display font-light text-xl md:text-3xl text-text-primary/90 leading-snug italic px-8">
            "But I don't see editing as execution. I see it as the invisible
            architecture that controls how content feels."
          </blockquote>

          {/* Animated underline */}
          <motion.div
            className="mt-8 h-px mx-auto bg-gradient-to-r from-transparent via-brand to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>
    </section>
  );
}
