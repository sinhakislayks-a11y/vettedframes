"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const REASONS = [
  {
    title: "Speed",
    description:
      "Creator content moves fast. Trends shift weekly. A creator's content calendar doesn't wait for a two-week turnaround. You need someone who can match that pace without dropping quality.",
  },
  {
    title: "Psychology",
    description:
      "Retention in creator content isn't about filters or effects. It's about understanding audience psychology — what makes them stop, what makes them stay, what makes them share. That's a different skill than making branded content look polished.",
  },
  {
    title: "Storytelling",
    description:
      "Creators are their own brands. They need content that reflects their voice, their perspective, their relationship with their audience. Generic corporate edits don't work. The edit has to feel personal.",
  },
  {
    title: "Trust",
    description:
      "Long-term creator content is built on consistency and trust. A creator's audience trusts THEM — and by extension, trusts the content they put out. That trust is earned through consistent quality over time. I'm playing a long game too.",
  },
];

export default function WhyCreatorsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface/30" />

      {/* Gradient accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand/[0.03] to-transparent pointer-events-none hidden md:block" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-20 flex items-center gap-4">
          <div className="w-8 h-px bg-brand" />
          <span className="font-mono text-brand/60 text-[10px] uppercase tracking-[0.25em]">
            Why creators
          </span>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Main statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-text-primary tracking-tight leading-tight mb-8">
              Creator content sits at the intersection of four things
            </h2>

            <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
              Speed, psychology, storytelling, and audience trust. Most editors
              are strong in one or two of these. Working with creators daily has
              given me the fluency to work across all four.
            </p>

            <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed mt-6">
              I don't want to be a vendor. I want to be the person a creator
              calls when they have an idea and need it to become something that
              works.
            </p>
          </motion.div>

          {/* Right - Reasons */}
          <div className="flex flex-col gap-10">
            {REASONS.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="flex gap-5 group"
              >
                {/* Connector */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-px bg-gradient-to-r from-brand/40 to-brand/20 group-hover:bg-brand/60 transition-colors duration-300" />
                  <div className="w-2 h-2 rounded-full bg-brand/50 mt-2 group-hover:bg-brand transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-0">
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                    {reason.title}
                  </h3>
                  <p className="font-sans text-text-secondary text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
