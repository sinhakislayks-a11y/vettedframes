"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import type { WorkflowStep } from "@/lib/constants";

interface TimelineStepProps {
  step: WorkflowStep;
  index: number;
  isLast: boolean;
}

export default function TimelineStep({ step, index, isLast }: TimelineStepProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline rail */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Node */}
        <div className="w-8 h-8 rounded-[4px] bg-brand-dim border border-brand/30 flex items-center justify-center">
          <span className="font-mono text-brand text-xs font-bold">
            {String(step.step).padStart(2, "0")}
          </span>
        </div>
        {/* Connector line */}
        {!isLast && (
          <div className="w-px flex-1 bg-border-custom mt-2" />
        )}
      </div>

      {/* Content */}
      <div className={`pb-12 ${isLast ? "pb-0" : ""}`}>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-display font-semibold text-lg text-text-primary">
            {step.title}
          </h3>
          <span className="font-mono text-xs text-brand bg-brand-dim px-2 py-0.5 rounded-[4px]">
            {step.duration}
          </span>
        </div>
        <p className="font-sans text-text-secondary text-sm leading-relaxed max-w-lg">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
