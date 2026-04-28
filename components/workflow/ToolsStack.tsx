"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { TOOLS } from "@/lib/constants";

export default function ToolsStack() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="w-full bg-surface border-t border-b border-border-custom py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            Tools
          </p>
          <h2 className="font-display font-semibold text-2xl text-text-primary">
            Software I work with
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.35,
                delay: i * 0.06,
              }}
              className="bg-surface-elevated border border-border-custom rounded-[4px] px-4 py-3 text-center font-mono text-sm text-text-secondary hover:text-brand hover:border-brand/20 transition-colors duration-200"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
