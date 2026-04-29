"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export default function WorkflowCTA() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className="w-full bg-bg pt-16 pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="border-t border-border-custom pt-16"
        >
          <p className="font-sans text-text-secondary text-lg mb-6">
            Ready to start your project?
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand text-bg font-sans font-medium text-sm px-6 py-3 rounded-[4px] hover:bg-brand/90 transition-colors duration-200"
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