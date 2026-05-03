"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  {
    number: "01",
    title: "Clarity",
    description:
      "Every project starts with understanding — not just what you want to make, but why. Clear brief, clear direction, clear communication. I don't guess. I ask.",
  },
  {
    number: "02",
    title: "Collaboration",
    description:
      "I'm not a remote freelancer you hand footage to and wait. I'm a creative partner who engages with the process. Your creative input shapes the work. My experience shapes it too.",
  },
  {
    number: "03",
    title: "Speed",
    description:
      "I know creator timelines. Fast doesn't mean sloppy — it means efficient decisions, no unnecessary back-and-forth, and delivery that fits your publishing schedule.",
  },
];

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[number];
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
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-8 bg-surface/50 border border-border-custom rounded-[4px] group overflow-hidden"
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, rgba(96, 37, 213, 0.08) 0%, transparent 50%, rgba(123, 92, 240, 0.05) 100%)`,
        }}
      />

      {/* Animated border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-[4px]"
        style={{
          background: "transparent",
          boxShadow: isHovered
            ? "inset 0 0 30px rgba(96, 37, 213, 0.1), 0 0 40px rgba(96, 37, 213, 0.1)"
            : "none",
          border: "1px solid transparent",
        }}
        animate={{
          borderColor: isHovered ? "rgba(96, 37, 213, 0.3)" : "transparent",
        }}
      />

      {/* Number with glow effect */}
      <motion.div
        className="relative z-10 mb-4"
        animate={{
          color: isHovered ? "#7B5CF0" : "#6025D5",
          filter: isHovered ? "drop-shadow(0 0 10px rgba(96, 37, 213, 0.4))" : "none",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-4xl font-bold">{pillar.number}</span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-display font-semibold text-xl text-text-primary mb-3">
          {pillar.title}
        </h3>
        <p className="font-sans text-text-secondary text-sm leading-relaxed">
          {pillar.description}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-brand/30 to-transparent"
          animate={{ width: isHovered ? 32 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute top-0 right-0 h-8 w-px bg-gradient-to-b from-brand/30 to-transparent"
          animate={{ height: isHovered ? 32 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Bottom hover line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-brand via-brand-light to-brand"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}

export default function ApproachSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-bg"
        style={{ y, willChange: "transform", transform: "translateZ(0)" }}
      />

      {/* Top fade line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-custom/50 to-transparent" />

      {/* Animated background elements - CSS-based for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-brand/[0.04] to-transparent blur-[80px] hidden md:block"
          style={{
            animation: "pulse-scale 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-radial from-brand-light/[0.03] to-transparent blur-[60px] hidden md:block"
          style={{
            animation: "pulse-scale-delayed 10s ease-in-out infinite 2s",
          }}
        />
      </div>

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
            How I work
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-text-primary tracking-tight leading-tight mb-16 max-w-2xl"
        >
          Not a freelancer. Not an agency.
        </motion.h2>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24">
          {PILLARS.map((pillar, index) => (
            <PillarCard key={pillar.number} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto relative"
        >
          {/* Decorative quote marks */}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 font-display text-[100px] text-brand/[0.05] select-none leading-none">
            "
          </span>

          <p className="font-display font-light text-xl md:text-2xl text-text-primary/80 leading-relaxed italic mb-12 px-8">
            If you're building something that matters and want someone who
            understands the craft behind the content — let's talk.
          </p>

          <Link
            href="/contact#contact-form"
            className="inline-flex items-center gap-2 font-sans text-sm text-brand-light hover:text-brand transition-colors duration-200 group"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-secondary/30 to-transparent pointer-events-none" />

      {/* CSS keyframes for background animations */}
      <style jsx>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
        @keyframes pulse-scale-delayed {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
