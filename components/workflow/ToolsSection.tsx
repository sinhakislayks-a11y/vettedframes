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
    <section className="w-full bg-surface border-t border-b border-border-custom py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display font-semibold text-2xl text-text-primary mb-10">
          Tools
        </h2>

        <div ref={ref} className="flex flex-wrap gap-3">
          {TOOLS.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="bg-surface-elevated border border-border-custom rounded-[4px] px-5 py-2.5 font-mono text-xs text-text-secondary hover:text-brand hover:border-brand/20 transition-colors duration-200"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
