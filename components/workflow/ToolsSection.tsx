"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const TOOLS = [
  "DaVinci Resolve",
  "Adobe Premiere Pro",
  "After Effects",
  "Spline",
  "Photoshop",
  "CapCut",
];

export default function ToolsSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="w-full bg-bg pt-8 pb-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Subtle divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-border-custom to-transparent" />
          <span className="font-mono text-text-secondary/40 text-[10px] uppercase tracking-widest">
            Stack
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-border-custom to-transparent" />
        </div>

        {/* Integration copy */}
        <div className="max-w-xl mb-12">
          <p className="font-display font-semibold text-xl text-text-primary mb-3">
            Built for the craft
          </p>
          <p className="font-sans text-text-secondary text-sm leading-relaxed">
            Industry-standard tools, optimized workflows. Every step of the process is handled in software that scales from first cut to final delivery.
          </p>
        </div>

        <div ref={ref} className="flex flex-wrap gap-3">
          {TOOLS.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="bg-surface border border-border-custom rounded-[4px] px-5 py-2.5 font-mono text-xs text-text-secondary hover:text-brand-light hover:border-brand/30 hover:shadow-[0_0_10px_rgba(139,92,246,0.15)] transition-all duration-200"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}