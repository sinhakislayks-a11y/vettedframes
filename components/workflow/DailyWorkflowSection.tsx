"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useState, useCallback } from "react";

interface DayItem {
  day: string;
  title: string;
  description: string;
}

const DAILY_WORKFLOW: DayItem[] = [
  {
    day: "Day 0",
    title: "Brief received",
    description: "Creative direction call or async brief reviewed.",
  },
  {
    day: "Day 1",
    title: "Footage review",
    description: "Raw footage review. Flagging issues. Confirming delivery format.",
  },
  {
    day: "Day 2-3",
    title: "Assembly cut",
    description: "Structure, pacing, rough captions.",
  },
  {
    day: "Day 4",
    title: "Color pass",
    description: "Color grade pass 1. Motion graphics added where scoped.",
  },
  {
    day: "Day 5",
    title: "Audio cleanup",
    description: "Sound design. Full cut locked.",
  },
  {
    day: "Day 6",
    title: "First delivery",
    description: "First cut delivered. Feedback window opens (24 hours).",
  },
  {
    day: "Day 7",
    title: "Final handoff",
    description: "Revision pass. Final export in all formats. Handoff.",
  },
];

export default function DailyWorkflowSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-gradient-to-b from-bg via-bg-secondary to-bg py-24 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-brand/5 via-transparent to-transparent blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section header */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-brand to-brand-light" />
              <span className="font-mono text-brand uppercase tracking-[0.2em] text-[11px]">
                Day to day
              </span>
            </div>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-text-primary tracking-tight">
              How a regular project actually runs.
            </h2>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop: Horizontal timeline */}
          <div className="hidden md:block">
            {/* Connecting line with gradient */}
            <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-border-custom via-brand/30 to-border-custom" />

            <div className="grid grid-cols-7 gap-4">
              {DAILY_WORKFLOW.map((item, i) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative pt-12 cursor-pointer group transition-all duration-500 ${
                    hoveredIndex === i ? 'transform -translate-y-3' : ''
                  }`}
                >
                  {/* Day marker */}
                  <div className={`absolute top-0 left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    hoveredIndex === i
                      ? 'bg-gradient-to-br from-brand to-brand-light shadow-[0_0_20px_rgba(96,37,213,0.4)] border-brand'
                      : 'bg-surface border border-brand/30'
                  }`}>
                    <span className={`font-mono text-[10px] font-bold transition-colors duration-300 ${
                      hoveredIndex === i ? 'text-white' : 'text-brand'
                    }`}>
                      {item.day}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-4 text-center">
                    <h3 className={`font-display font-semibold text-sm mb-2 tracking-tight transition-all duration-300 ${
                      hoveredIndex === i ? 'text-brand-light' : 'text-text-primary'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="font-sans text-text-secondary text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover glow effect */}
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-brand/50 to-transparent blur-sm"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical timeline */}
          <div className="md:hidden relative">
            {/* Connecting line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-brand/30 via-border-custom to-brand/30" />

            <div className="space-y-6">
              {DAILY_WORKFLOW.map((item, i) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative flex gap-5 pl-16 transition-all duration-500 ${
                    hoveredIndex === i ? 'transform translate-x-2' : ''
                  }`}
                >
                  {/* Day marker */}
                  <div className={`absolute left-0 w-12 h-12 rounded-[4px] flex items-center justify-center transition-all duration-500 ${
                    hoveredIndex === i
                      ? 'bg-gradient-to-br from-brand to-brand-light shadow-[0_0_20px_rgba(96,37,213,0.4)] border-brand'
                      : 'bg-surface border border-brand/30'
                  }`}>
                    <span className={`font-mono text-[10px] font-bold transition-colors duration-300 ${
                      hoveredIndex === i ? 'text-white' : 'text-brand'
                    }`}>
                      {item.day}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className={`font-display font-semibold text-sm mb-1.5 tracking-tight transition-all duration-300 ${
                      hoveredIndex === i ? 'text-brand-light' : 'text-text-primary'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="font-sans text-text-secondary text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}