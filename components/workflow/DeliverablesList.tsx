"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { DELIVERABLES } from "@/lib/constants";
import { Check } from "lucide-react";
import { useState } from "react";

export default function DeliverablesList() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-gradient-to-b from-bg via-surface to-bg py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-brand/5 to-transparent blur-[80px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        <div className="mb-10">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            Deliverables
          </p>
          <h2 className="font-display font-semibold text-2xl text-text-primary">
            What you get
          </h2>
        </div>

        <div ref={ref} className="flex flex-col gap-3">
          {DELIVERABLES.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -16 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }
              }
              transition={{
                duration: 0.4,
                delay: i * 0.08,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex items-center gap-3 rounded-[4px] px-4 py-3 transition-all duration-500 ${
                hoveredIndex === i
                  ? 'bg-gradient-to-r from-brand/15 via-surface-elevated to-brand/15 border border-brand/30 shadow-[0_0_20px_rgba(96,37,213,0.1)] transform -translate-x-1'
                  : 'bg-surface-elevated border border-border-custom'
              }`}
            >
              <div className={`w-5 h-5 rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                hoveredIndex === i
                  ? 'bg-gradient-to-br from-brand to-brand-light shadow-[0_0_10px_rgba(96,37,213,0.3)]'
                  : 'bg-brand/20'
              }`}>
                <Check className={`w-3 h-3 transition-colors duration-300 ${hoveredIndex === i ? 'text-white' : 'text-brand'}`} />
              </div>
              <span className={`font-sans text-sm transition-colors duration-300 ${
                hoveredIndex === i ? 'text-brand-light' : 'text-text-primary'
              }`}>
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
