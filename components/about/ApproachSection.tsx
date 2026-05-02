"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  {
    number: "01",
    title: "Clarity",
    description:
      "Every project starts with understanding — not just what you want to make, but why. Clear brief, clear direction, clear communication. I don't guess. I ask.",
  },
  {
    number: "02",
    title: "Collaboration",
    description:
      "I'm not a remote freelancer you hand footage to and wait. I'm a creative partner who engages with the process. Your creative input shapes the work. My experience shapes it too.",
  },
  {
    number: "03",
    title: "Speed",
    description:
      "I know creator timelines. Fast doesn't mean sloppy — it means efficient decisions, no unnecessary back-and-forth, and delivery that fits your publishing schedule.",
  },
];

export default function ApproachSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-bg" />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-custom/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-20 flex items-center gap-4">
          <div className="w-8 h-px bg-brand" />
          <span className="font-mono text-brand/60 text-[10px] uppercase tracking-[0.25em]">
            How I work
          </span>
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-text-primary tracking-tight leading-tight mb-16 max-w-2xl"
        >
          Not a freelancer. Not an agency.
        </motion.h2>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="relative p-8 bg-surface/50 border border-border-custom rounded-[4px] hover:border-brand/30 transition-colors duration-300 group"
            >
              {/* Number */}
              <span className="font-mono text-brand/40 text-4xl font-bold">
                {pillar.number}
              </span>

              {/* Content */}
              <div className="mt-6">
                <h3 className="font-display font-semibold text-xl text-text-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="font-sans text-text-secondary text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-[4px] bg-gradient-to-br from-brand/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-display font-light text-xl md:text-2xl text-text-primary/80 leading-relaxed italic mb-12">
            If you're building something that matters and want someone who
            understands the craft behind the content — let's talk.
          </p>

          <Link
            href="/contact#contact-form"
            className="inline-flex items-center gap-2 font-sans text-sm text-brand-light hover:text-brand transition-colors duration-200 group"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
