"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface FormSuccessProps {
  onReset: () => void;
}

export default function FormSuccess({ onReset }: FormSuccessProps) {
  return (
    <section className="w-full bg-surface border-t border-border-custom py-24">
      <div className="mx-auto max-w-[640px] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center py-12"
        >
          <div className="w-14 h-14 rounded-[4px] bg-brand/10 flex items-center justify-center mb-6">
            <CheckCircle className="w-7 h-7 text-brand" />
          </div>

          <h3 className="font-display font-semibold text-xl text-brand mb-2">
            Got it.
          </h3>
          <p className="font-sans text-text-secondary text-sm max-w-sm mb-8">
            I&apos;ll review your project and get back to you within 24 hours.
          </p>

          <button
            onClick={onReset}
            className="font-sans text-sm text-brand hover:text-brand/80 transition-colors cursor-pointer"
          >
            Send another message →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
