"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface Capability {
  emoji: string;
  title: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    emoji: "📢",
    title: "Promotions",
    description: "Scroll-stopping promo edits that drive action. Built for retention, designed for conversions.",
  },
  {
    emoji: "🎙️",
    title: "Podcasts",
    description: "Clean podcast edits with visual overlays, chapter markers, and audiophile-grade sound.",
  },
  {
    emoji: "🎬",
    title: "Introduction Videos",
    description: "Brand-ready intros that hook viewers in the first 3 seconds. Your channel starts here.",
  },
  {
    emoji: "🎥",
    title: "Talking Head YouTube",
    description: "Retention-optimized talking head edits — tight pacing, captions, b-roll integration.",
  },
  {
    emoji: "📱",
    title: "Reels / Shorts",
    description: "Native-format short-form content built for algorithmic performance. Every frame earns its place.",
  },
  {
    emoji: "✨",
    title: "Motion Graphics",
    description: "Kinetic type, lower thirds, and overlay sequences that add production value without distraction.",
  },
  {
    emoji: "💻",
    title: "SaaS Animations",
    description: "Product demos and UI animations that make your SaaS feel like a premium brand.",
  },
  {
    emoji: "🤖",
    title: "AI-Generated Content",
    description: "Synthetic footage and AI-enhanced visuals integrated seamlessly with real footage.",
  },
];

function CapabilityCard({ cap, index }: { cap: Capability; index: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="h-full"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4,
          delay: index * 0.2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="bg-[#12121A] border border-white/5 rounded-[6px] p-6 h-full shadow-lg hover:shadow-brand/10 hover:border-brand/30 transition-colors"
      >
        {/* Emoji */}
        <div className="text-3xl mb-4">
          {cap.emoji}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
          {cap.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-text-secondary text-sm leading-relaxed">
          {cap.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function WhatICreateSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="w-full bg-bg py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-brand/5 to-transparent blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section header */}
        <div ref={ref} className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-brand uppercase tracking-widest text-xs mb-3"
          >
            What I Create
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl text-text-primary"
          >
            From short-form to full production.
          </motion.h2>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}