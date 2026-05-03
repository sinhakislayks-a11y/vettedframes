"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Rhythm, not just cuts",
    description:
      "Editing is musical. Every cut is a beat. Every transition is a breath. The best edits feel inevitable — you don't notice the decisions because they land exactly when they should.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Invisible but intentional",
    description:
      "Good editing is invisible. That's the goal. Not flashy transitions or Effects. Just clean, purposeful choices that serve the story. When someone watches your video and doesn't notice the editing — that's success.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Retention is not a hack",
    description:
      "There's no magic hook formula. Retention comes from clarity — knowing what you're saying, knowing who you're saying it to, and timing every beat to land right. It's craft, not tricks.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Feel matters as much as metrics",
    description:
      "I care about how content performs. But I also care about how it feels to watch. A video that gets clicks but feels hollow? That's not a win. I want to make things that work AND feel right.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-surface/30 border border-border-custom rounded-[4px] p-8 hover:border-brand/30 transition-all duration-500 cursor-pointer overflow-hidden"
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(96, 37, 213, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Icon with glow */}
      <motion.div
        animate={{
          color: isHovered ? "#7B5CF0" : "#6025D5",
          filter: isHovered ? "drop-shadow(0 0 8px rgba(96, 37, 213, 0.5))" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="relative z-10 mb-6"
      >
        {principle.icon}
      </motion.div>

      {/* Number - fades on hover */}
      <motion.span
        className="font-mono text-brand/20 text-[64px] md:text-[80px] font-bold absolute -top-2 -left-2 md:-left-4 select-none pointer-events-none leading-none transition-opacity duration-500 group-hover:opacity-0"
        animate={{ x: isHovered ? -10 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Content */}
      <div className="relative z-10 pt-12 md:pt-16">
        <h3 className="font-display font-semibold text-lg md:text-xl text-text-primary mb-3 tracking-tight">
          {principle.title}
        </h3>
        <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed">
          {principle.description}
        </p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-brand via-brand-light to-brand"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      />

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-brand/20 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-brand/20 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Background with parallax gradients */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-bg-secondary/30 via-bg to-bg-secondary/30"
        style={{ y, willChange: "transform", transform: "translateZ(0)" }}
      />

      {/* Animated background orbs - replaced infinite animation with CSS */}
      {/* These use CSS animations via Tailwind classes for better performance */}
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-brand/[0.06] to-transparent blur-[80px] pointer-events-none hidden md:block"
        style={{
          animation: "pulse-slow 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-radial from-brand-light/[0.05] to-transparent blur-[60px] pointer-events-none hidden md:block"
        style={{
          animation: "pulse-slow-delayed 8s ease-in-out infinite 2s",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-20 flex items-center gap-4"
        >
          <motion.div
            className="w-8 h-px bg-brand"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className="font-mono text-brand/60 text-[10px] uppercase tracking-[0.25em]">
            Perspective
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {PRINCIPLES.map((principle, index) => (
            <PrincipleCard
              key={principle.title}
              principle={principle}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-secondary/50 to-transparent pointer-events-none" />

      {/* CSS keyframes injected via style tag */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1) translateX(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.2) translateX(30px);
            opacity: 0.8;
          }
        }
        @keyframes pulse-slow-delayed {
          0%, 100% {
            transform: scale(1) translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3) translateY(-20px);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
}
