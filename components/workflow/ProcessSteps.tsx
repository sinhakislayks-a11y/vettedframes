"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import StepVisual from "./StepVisual";

interface Step {
  number: number;
  title: string;
  description: string;
  turnaround: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Brief",
    description:
      "You fill out a short intake form. Project type, references, deadline, platform. Takes 5 minutes. Saves 3 rounds of back-and-forth.",
    turnaround: "Same day response",
  },
  {
    number: 2,
    title: "Footage Review",
    description:
      "I review your raw files and flag any issues before editing starts. No surprises mid-project.",
    turnaround: "Within 24 hours of receiving files",
  },
  {
    number: 3,
    title: "First Cut",
    description:
      "Full edit delivered — structure, pacing, color, captions. Not a rough draft. A real cut.",
    turnaround: "2 to 4 business days",
  },
  {
    number: 4,
    title: "Feedback Round",
    description:
      "One structured revision round. Specific timestamps, specific notes. I do not guess what you want.",
    turnaround: "Revisions delivered within 48 hours",
  },
  {
    number: 5,
    title: "Final Delivery",
    description:
      "All final files delivered in your required formats. Organized, labeled, ready to upload.",
    turnaround: "Same day as revision approval",
  },
];

function StepSection({ step, index }: { step: Step; index: number }) {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Faded background step number */}
      <div
        className="absolute select-none pointer-events-none font-display font-bold text-[20vw] md:text-[16vw] leading-none text-brand/[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        {String(step.number).padStart(2, "0")}
      </div>

      {/* Vertical connector line */}
      {index > 0 && (
        <div className="absolute left-8 md:left-[calc(50%-320px)] top-0 w-px h-24 bg-gradient-to-b from-border-custom to-transparent" />
      )}

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.35,
          }}
          className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
            isEven ? "" : "md:grid-flow-dense"
          }`}
        >
          {/* Text block */}
          <div className={`${isEven ? "md:order-1" : "md:order-2"} flex flex-col`}>
            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand/30 bg-brand/5">
                <span className="font-mono text-brand text-sm font-medium">
                  {String(step.number).padStart(2, "0")}
                </span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-brand/30 to-transparent" />
            </div>

            <h3 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-4 tracking-tight">
              {step.title}
            </h3>

            <p className="font-sans text-text-secondary text-base leading-relaxed mb-6 max-w-md">
              {step.description}
            </p>

            <div className="inline-flex items-center gap-2 font-mono text-brand text-xs">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {step.turnaround}
            </div>
          </div>

          {/* Visual block */}
          <div className={`${isEven ? "md:order-2" : "md:order-1"}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.15,
              }}
              className="relative"
            >
              <StepVisual step={step.number} className="w-full" />
              {/* Glow edge */}
              <div className="absolute -inset-px rounded-[4px] bg-gradient-to-br from-brand/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ProcessSteps() {
  return (
    <section className="w-full bg-bg pb-16">
      {STEPS.map((step, i) => (
        <StepSection key={step.number} step={step} index={i} />
      ))}

      {/* Bottom glow */}
      <div className="h-24 bg-gradient-to-b from-transparent to-bg/50" />
    </section>
  );
}