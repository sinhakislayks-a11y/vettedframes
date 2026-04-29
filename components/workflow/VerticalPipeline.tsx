"use client";

import { motion } from "framer-motion";

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
            className="w-[2px] h-12 bg-brand/40 origin-top"
          />
        )}

        {/* Node circle on the line */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="w-3 h-3 rounded-full bg-brand flex-shrink-0 z-10"
        />

        {/* Vertical connector line (below node, hidden on last) */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
            className="w-[2px] flex-1 bg-brand/40 origin-top"
          />
        )}
      </div>

      {/* Right: step card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="flex-1 md:pl-8 pl-4 pb-12"
      >
        <div className="bg-surface-elevated border border-border-custom rounded-[4px] p-6">
          {/* Mobile: inline number tag */}
          <div className="flex items-center gap-3 mb-4 md:hidden">
            <span className="font-mono text-brand text-xs uppercase tracking-wider">
              {String(step.number).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-brand/30 to-transparent" />
          </div>

          <h3 className="font-display font-semibold text-lg md:text-xl text-text-primary mb-2 tracking-tight">
            {step.title}
          </h3>
          <p className="font-sans text-text-secondary text-sm leading-relaxed mb-4">
            {step.description}
          </p>

          <div className="inline-flex items-center gap-2 font-mono text-brand text-[11px] uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            {step.turnaround}
          </div>
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
