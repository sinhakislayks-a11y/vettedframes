"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { DELIVERABLES } from "@/lib/constants";
import { Check } from "lucide-react";

export default function DeliverablesList() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="w-full bg-bg py-20">
      <div className="mx-auto max-w-3xl px-6">
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
              className="flex items-center gap-3 bg-surface border border-border-custom rounded-[4px] px-4 py-3"
            >
              <div className="w-5 h-5 rounded-[4px] bg-brand-dim flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-brand" />
              </div>
              <span className="font-sans text-sm text-text-primary">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
