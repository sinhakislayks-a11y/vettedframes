"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export default function WorkflowCTA() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className="w-full bg-gradient-to-t from-surface via-bg to-bg pt-16 pb-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-radial from-brand/8 to-transparent blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="border-t border-border-custom pt-16 text-center"
        >
          <p className="font-sans text-text-secondary text-lg mb-6">
            Ready to start your project?
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand to-brand-dark text-white font-sans font-medium text-sm px-7 py-3 rounded-[4px] hover:shadow-[0_0_40px_rgba(96,37,213,0.5)] hover:brightness-110 hover:-translate-y-1 transition-all duration-300"
          >
            Send me your footage
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}