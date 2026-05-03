"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { KeywordButton } from "@/components/ui/keyword-button";

// Keywords with their tooltips
const KEYWORDS: Record<string, { tooltip: string }> = {
  hooks: { tooltip: "The first 3 seconds that decide everything." },
};

// Helper to render text with keyword tooltips
function TextWithKeywords({ text }: { text: string }) {
  const pattern = /\b(hooks)\b/gi;
  const parts = text.split(pattern);

  return (
    <span>
      {parts.map((part, i) => {
        const keyword = Object.keys(KEYWORDS).find(k => k.toLowerCase() === part.toLowerCase());
        if (keyword && KEYWORDS[keyword]) {
          return (
            <KeywordButton key={i} label={part} tooltip={KEYWORDS[keyword].tooltip} />
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

interface PipelineStep {
  number: number;
  title: string;
  description: string;
  turnaround: string;
}

const STEPS: PipelineStep[] = [
  {
    number: 1,
    title: "Brief & Creative Direction",
    description:
      "You share your vision, references, and goals. I map out the edit structure — pacing, hooks, transitions — before a single cut is made.",
    turnaround: "Day 1–2",
  },
  {
    number: 2,
    title: "Raw Footage Review",
    description:
      "I review every clip, flag issues, and build an organized bin structure. No surprises mid-project.",
    turnaround: "Within 24h",
  },
  {
    number: 3,
    title: "Non-Linear Editing",
    description:
      "Precision cuts in Premiere Pro. Beat syncing, J-cuts, L-cuts — every transition engineered for watch time.",
    turnaround: "Day 3–4",
  },
  {
    number: 4,
    title: "Motion Graphics",
    description:
      "Kinetic text, kinetic typography, lower thirds, and overlay sequences that elevate the production value.",
    turnaround: "Day 4–5",
  },
  {
    number: 5,
    title: "Color Grading",
    description:
      "Cinematic color science in DaVinci Resolve. From LOG footage to final delivery — pixel-accurate, mood-driven.",
    turnaround: "Day 5–6",
  },
  {
    number: 6,
    title: "Mixing & Mastering",
    description:
      "Audio cleanup, sound design, and compression. Every element sits correctly in the mix before export.",
    turnaround: "Day 6",
  },
  {
    number: 7,
    title: "Final Export & Delivery",
    description:
      "Master file plus platform-optimized exports for YouTube, Instagram, TikTok, and LinkedIn. Thumbnails included.",
    turnaround: "Day 7",
  },
];

function PipelineNode({ step, index }: { step: PipelineStep; index: number }) {
  const isLast = index === STEPS.length - 1;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-start gap-0">
      {/* Left ghosted number */}
      <div className="flex-1 hidden md:block">
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 0.15, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="font-display font-bold text-[120px] leading-none text-brand select-none"
        >
          {String(step.number).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Center: line + node circle */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        {/* Vertical connector line (above node, hidden on first) */}
        {index > 0 && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 - 0.05 }}
            className="w-[2px] h-12 bg-gradient-to-b from-brand/40 to-brand/20 origin-top"
          />
        )}

        {/* Node circle on the line */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="w-3 h-3 rounded-full bg-gradient-to-br from-brand to-brand-light flex-shrink-0 z-10 shadow-[0_0_10px_rgba(96,37,213,0.4)]"
        />

        {/* Vertical connector line (below node, hidden on last) */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
            className="w-[2px] flex-1 bg-gradient-to-b from-brand/20 to-brand/40 origin-top"
          />
        )}
      </div>

      {/* Right: step card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex-1 min-w-0 md:pl-8 pl-4 pb-12 cursor-pointer transition-all duration-500 ${
          isHovered ? 'transform translate-x-2' : ''
        }`}
      >
        <div className={`relative bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated border rounded-[4px] p-6 transition-all duration-500 ${
          isHovered
            ? 'border-brand/40 shadow-[0_0_30px_rgba(96,37,213,0.15)] -translate-y-2'
            : 'border-border-custom'
        }`}>
          {/* Mobile: inline number tag */}
          <div className="flex items-center gap-3 mb-4 md:hidden">
            <span className="font-mono text-brand text-xs uppercase tracking-wider">
              {String(step.number).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-brand/30 to-transparent" />
          </div>

          <div className="w-full min-w-0">
          <h3 className={`font-display font-semibold text-lg md:text-xl mb-2 tracking-tight transition-colors duration-300 ${
            isHovered ? 'text-brand-light' : 'text-text-primary'
          }`}>
            {step.title}
          </h3>
          <p className="font-sans text-text-secondary text-sm leading-relaxed mb-4 w-full min-w-0">
            <TextWithKeywords text={step.description} />
          </p>

          <div className="inline-flex items-center gap-2 font-mono text-brand-light text-[11px] uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand to-brand-light shadow-[0_0_8px_rgba(96,37,213,0.5)] animate-pulse" />
            {step.turnaround}
          </div>
          </div>

          {/* Hover glow effect */}
          {isHovered && (
            <div className="absolute -inset-px rounded-[4px] bg-gradient-to-r from-brand/10 via-transparent to-brand/10 pointer-events-none" />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function VerticalPipeline() {
  return (
    <section className="w-full bg-bg py-16 overflow-hidden">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <div className="h-px w-8 bg-brand" />
          <span className="font-mono text-brand uppercase tracking-[0.2em] text-[11px]">
            The process
          </span>
        </div>

        {/* Pipeline nodes */}
        <div>
          {STEPS.map((step, i) => (
            <PipelineNode key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
