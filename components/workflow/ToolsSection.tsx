"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-gradient-to-t from-surface via-bg to-bg pt-8 pb-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-gradient-radial from-brand/5 to-transparent blur-[80px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Subtle divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-border-custom via-brand/20 to-transparent" />
          <span className="font-mono text-text-secondary/40 text-[10px] uppercase tracking-widest">
            Stack
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-border-custom via-brand/20 to-transparent" />
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
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`cursor-pointer rounded-[4px] px-5 py-2.5 font-mono text-xs transition-all duration-500 ${
                hoveredIndex === i
                  ? 'bg-gradient-to-r from-brand/20 via-brand/10 to-brand/20 border border-brand/40 text-brand-light shadow-[0_0_15px_rgba(96,37,213,0.2)] transform -translate-y-1'
                  : 'bg-surface border border-border-custom text-text-secondary'
              }`}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}