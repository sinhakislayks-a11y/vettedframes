"use client";

import { WORKFLOW_STEPS } from "@/lib/constants";
import TimelineStep from "./TimelineStep";

export default function WorkflowTimeline() {
  return (
    <section className="w-full bg-bg py-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            How It Works
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
            Footage in, content out.
          </h2>
          <p className="font-sans text-text-secondary text-base mt-4 max-w-lg">
            A streamlined 7-day process from raw clips to platform-ready deliverables.
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          {WORKFLOW_STEPS.map((step, i) => (
            <TimelineStep
              key={step.step}
              step={step}
              index={i}
              isLast={i === WORKFLOW_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
