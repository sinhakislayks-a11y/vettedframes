"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const REASONS = [
  {
    title: "Speed",
    description:
      "Creator content moves fast. Trends shift weekly. A creator's content calendar doesn't wait for a two-week turnaround. You need someone who can match that pace without dropping quality.",
  },
  {
    title: "Psychology",
    description:
      "Retention in creator content isn't about filters or effects. It's about understanding audience psychology — what makes them stop, what makes them stay, what makes them share. That's a different skill than making branded content look polished.",
  },
  {
    title: "Storytelling",
    description:
      "Creators are their own brands. They need content that reflects their voice, their perspective, their relationship with their audience. Generic corporate edits don't work. The edit has to feel personal.",
  },
  {
    title: "Trust",
    description:
      "Long-term creator content is built on consistency and trust. A creator's audience trusts THEM — and by extension, trusts the content they put out. That trust is earned through consistent quality over time. I'm playing a long game too.",
  },
];

function ReasonItem({
  reason,
  index,
}: {
  reason: (typeof REASONS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex gap-5 group cursor-pointer"
    >
      {/* Connector with animation */}
      <div className="flex flex-col items-center relative">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-brand/40 to-brand/20 group-hover:from-brand/60 group-hover:to-brand/40 transition-all duration-300"
          animate={{ width: isHovered ? 56 : 48 }}
        />
        <motion.div
          className="w-3 h-3 rounded-full border border-brand/50 bg-bg mt-2 flex items-center justify-center"
          animate={{
            borderColor: isHovered ? "rgba(123, 92, 240, 0.8)" : "rgba(96, 37, 213, 0.5)",
            backgroundColor: isHovered ? "rgba(96, 37, 213, 0.2)" : "transparent",
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-brand"
            animate={{ scale: isHovered ? 1.2 : 1 }}
          />
        </motion.div>

        {/* Vertical line to next item */}
        {index < REASONS.length - 1 && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-brand/20 to-brand/10" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-0 pb-8">
        <motion.h3
          className="font-display font-semibold text-lg text-text-primary mb-2"
        >
          {reason.title}
        </motion.h3>
        <p className="font-sans text-text-secondary text-sm leading-relaxed">
          {reason.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyCreatorsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-surface/30"
        style={{ y }}
      />

      {/* Gradient accents */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand/[0.04] to-transparent pointer-events-none hidden md:block"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-[20%] right-[15%] pointer-events-none hidden lg:block"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect
            x="10"
            y="10"
            width="60"
            height="60"
            stroke="#6025D5"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <rect
            x="20"
            y="20"
            width="40"
            height="40"
            stroke="#6025D5"
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />
        </svg>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
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
            Why creators
          </span>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Main statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-text-primary tracking-tight leading-tight mb-8">
              Creator content sits at the intersection of four things
            </h2>

            <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-6">
              Speed, psychology, storytelling, and audience trust. Most editors
              are strong in one or two of these. Working with creators daily has
              given me the fluency to work across all four.
            </p>

            <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
              I don't want to be a vendor. I want to be the person a creator
              calls when they have an idea and need it to become something that
              works.
            </p>
          </motion.div>

          {/* Right - Reasons with animated timeline */}
          <div className="flex flex-col pt-8">
            {REASONS.map((reason, index) => (
              <ReasonItem key={reason.title} reason={reason} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-brand/30" />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
