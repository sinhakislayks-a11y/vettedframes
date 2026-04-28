"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

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

function StepCard({ step, index }: { step: Step; index: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="bg-surface border border-border-custom rounded-[4px] p-6 flex flex-col"
    >
      {/* Step number */}
      <span className="font-display font-bold text-3xl text-brand mb-4">
        {String(step.number).padStart(2, "0")}
      </span>

      {/* Title */}
      <h3 className="font-display font-semibold text-lg text-text-primary mb-3">
        {step.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-text-secondary text-sm leading-relaxed mb-5 flex-1">
        {step.description}
      </p>

      {/* Turnaround */}
      <p className="font-mono text-text-secondary text-xs">
        {step.turnaround}
      </p>
    </motion.div>
  );
}

export default function ProcessSteps() {
  return (
    <section className="w-full bg-bg pb-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Desktop: horizontal row / Mobile: vertical stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
