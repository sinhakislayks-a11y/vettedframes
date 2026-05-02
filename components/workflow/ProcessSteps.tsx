"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

// ── Step data with annotations ──────────────────────────────────────────────
interface StepData {
  number: number;
  title: string;
  description: string;
  turnaround: string;
  annotation?: string;
  annotationSide?: "left" | "right";
}

const STEPS: StepData[] = [
  {
    number: 1,
    title: "Send Your Footage",
    description:
      "Drop your raw clips, reference videos, and a brief. I'll review everything within 24 hours and send you a creative direction outline.",
    turnaround: "Day 1",
    annotation: "depends on project scope",
    annotationSide: "right",
  },
  {
    number: 2,
    title: "Creative Direction",
    description:
      "I map out the edit structure — pacing, hooks, transitions, and music. You get a storyboard-style breakdown before a single cut is made.",
    turnaround: "Day 2",
    annotation: "helps structure the narrative",
    annotationSide: "left",
  },
  {
    number: 3,
    title: "First Cut",
    description:
      "Full rough cut with music, pacing, and structure locked in. Color and graphics are placeholder — this is about nailing the narrative flow.",
    turnaround: "Day 3–4",
    annotation: "not a rough draft — a real cut",
    annotationSide: "right",
  },
  {
    number: 4,
    title: "Revisions & Color",
    description:
      "Your feedback shapes the final version. I dial in the color grade, sound design, motion graphics, and export in every format you need.",
    turnaround: "Day 5–6",
    annotation: "improves retention",
    annotationSide: "left",
  },
  {
    number: 5,
    title: "Final Delivery",
    description:
      "Polished master file plus platform-optimized exports for YouTube, Instagram, TikTok, and LinkedIn. Thumbnail and caption suggestions included.",
    turnaround: "Day 7",
    annotation: "shipped, labeled, ready",
    annotationSide: "right",
  },
];

// ── SVG Path from reference image ────────────────────────────────────────────
// A serpentine path that winds down with alternating left/right curves
const PATH_D =
  "M 50% 40 C 35% 80, 65% 120, 50% 160 C 35% 200, 65% 240, 50% 280 C 35% 320, 65% 360, 50% 400 C 35% 440, 65% 480, 50% 520 C 35% 560, 65% 600, 50% 640";

// ── Single workflow node ──────────────────────────────────────────────────────
function WorkflowNode({ step, index }: { step: StepData; index: number }) {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.12 });
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ minHeight: "60vh" }}
    >
      {/* Large ghosted step number (depth layer) */}
      <div
        className="absolute select-none pointer-events-none font-display font-bold text-[22vw] md:text-[14vw] leading-none text-brand/[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        {String(step.number).padStart(2, "0")}
      </div>

      {/* Gradient backdrop for each section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[100px] ${
          isEven ? 'bg-gradient-to-r from-brand/3 to-transparent' : 'bg-gradient-to-l from-brand/3 to-transparent'
        }`} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Node + path layout */}
        <div className="relative flex items-center justify-center">
          {/* SVG serpentine path */}
          <svg
            className="absolute left-1/2 top-0 w-full h-full -translate-x-1/2 pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 640"
            style={{ width: "100%", height: "100%" }}
            aria-hidden
          >
            {/* Subtle glow behind path */}
            <path
              d={PATH_D}
              fill="none"
              stroke="#6025D5"
              strokeWidth="1"
              strokeOpacity="0.08"
              strokeLinecap="round"
            />
            {/* Main thin path line */}
            <motion.path
              d={PATH_D}
              fill="none"
              stroke="#6025D5"
              strokeWidth="0.8"
              strokeOpacity="0.25"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
          </svg>

          {/* Node circle (only on desktop) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute top-[40px] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex"
          >
            <div className="relative group cursor-pointer">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-brand/20 blur-md scale-150 shadow-[0_0_30px_rgba(96, 37, 213,0.2)] group-hover:shadow-[0_0_40px_rgba(96, 37, 213,0.35)] transition-all duration-500" />
              {/* Node circle */}
              <div className="relative w-12 h-12 rounded-full border border-brand/50 bg-bg flex items-center justify-center group-hover:border-brand group-hover:shadow-[0_0_25px_rgba(96, 37, 213,0.4)] transition-all duration-500 group-hover:scale-110">
                <span className="font-mono text-brand-light text-sm font-medium group-hover:text-text-primary transition-colors duration-300">
                  {String(step.number).padStart(2, "0")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content block — alternates left/right */}
          <div
            className={`relative w-full md:w-[42%] ${isEven ? "md:pr-[54%]" : "md:pl-[54%]"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative group"
            >
              {/* Gradient backdrop for card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-brand/5 via-transparent to-brand/5 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

              {/* Card with gradient */}
              <div className="relative bg-gradient-to-br from-surface via-surface-elevated to-surface border border-border-custom rounded-[6px] p-6 group-hover:border-brand/30 group-hover:shadow-[0_0_30px_rgba(96, 37, 213,0.1)] group-hover:-translate-y-2 transition-all duration-500">
                {/* Mobile: inline step number */}
                <div className="flex items-center gap-3 mb-6 md:hidden">
                  <div className="w-9 h-9 rounded-full border border-brand/30 bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(96, 37, 213,0.2)]">
                    <span className="font-mono text-brand-light text-xs">
                      {String(step.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-brand/20 to-transparent" />
                </div>

                {/* Connector line above content (mobile only) */}
                <div className="absolute left-4 -top-10 w-px h-10 bg-gradient-to-b from-brand/30 to-transparent md:hidden" />

                {/* Annotation (offset to opposite side) */}
                {step.annotation && (
                  <div
                    className={`hidden md:block absolute top-6 ${
                      isEven ? "left-[calc(100%+24px)] text-left" : "right-[calc(100%+24px)] text-right"
                    }`}
                    style={{ maxWidth: "140px" }}
                  >
                    <span
                      className="font-sans italic text-[11px] text-text-secondary/60 leading-relaxed"
                      style={{ fontStyle: "italic" }}
                    >
                      {step.annotation}
                    </span>
                  </div>
                )}

                {/* Step title */}
                <div className="w-full min-w-0">
                <h3 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-4 tracking-tight leading-tight group-hover:text-brand-light transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed mb-6 max-w-full">
                  {step.description}
                </p>

                {/* Turnaround badge */}
                <div className="inline-flex items-center gap-2 font-mono text-brand-light text-[11px] uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand to-brand-light shadow-[0_0_8px_rgba(96, 37, 213,0.5)] animate-pulse" />
                  {step.turnaround}
                </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Entry label ──────────────────────────────────────────────────────────────
export default function ProcessSteps() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="w-full bg-bg relative">
      {/* Ambient glow behind the path */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full pointer-events-none hidden md:block"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(96, 37, 213,0.05) 20%, rgba(96, 37, 213,0.08) 50%, rgba(96, 37, 213,0.05) 80%, transparent 100%)",
            filter: "blur(20px)",
            width: "1px",
          }}
        />
      </div>

      {/* Entry point */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center pt-16 pb-8"
      >
        <div className="w-px h-12 bg-gradient-to-b from-brand/30 to-transparent mb-3" />
        <span className="font-mono text-brand/50 text-[10px] uppercase tracking-[0.3em]">
          The process
        </span>
      </motion.div>

      {/* Steps */}
      {STEPS.map((step, i) => (
        <WorkflowNode key={step.number} step={step} index={i} />
      ))}

      {/* End point */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-col items-center py-16"
      >
        <div className="w-3 h-3 rounded-full border border-brand/30 bg-brand-dim flex items-center justify-center mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-light" />
        </div>
        <span className="font-mono text-brand/30 text-[10px] uppercase tracking-[0.3em]">
          End of pipeline
        </span>
      </motion.div>

      {/* Bottom fade */}
      <div className="h-16 bg-gradient-to-b from-transparent to-bg/50" />
    </section>
  );
}