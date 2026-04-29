"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

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

  return (
    <section className="w-full bg-bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand" />
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
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-border-custom" />

            <div className="grid grid-cols-7 gap-4">
              {DAILY_WORKFLOW.map((item, i) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative pt-12"
                >
                  {/* Day marker */}
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-surface border border-brand/30 flex items-center justify-center">
                    <span className="font-mono text-brand text-[10px] font-bold">
                      {item.day}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-4">
                    <h3 className="font-display font-semibold text-sm text-text-primary mb-2 tracking-tight">
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

          {/* Mobile: Vertical timeline */}
          <div className="md:hidden relative">
            {/* Connecting line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border-custom" />

            <div className="space-y-6">
              {DAILY_WORKFLOW.map((item, i) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative flex gap-5 pl-16"
                >
                  {/* Day marker */}
                  <div className="absolute left-0 w-12 h-12 rounded-[4px] bg-surface border border-brand/30 flex items-center justify-center">
                    <span className="font-mono text-brand text-[10px] font-bold">
                      {item.day}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="font-display font-semibold text-sm text-text-primary mb-1.5 tracking-tight">
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