"use client";

import { motion } from "framer-motion";
import { CLIENT_NAMES } from "@/lib/constants";

export default function ClientLogos() {
  // Triple the names for seamless infinite loop
  const items = [...CLIENT_NAMES, ...CLIENT_NAMES, ...CLIENT_NAMES];

  return (
    <section className="w-full bg-surface border-t border-b border-border-custom py-14 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-10">
        <p className="font-mono text-text-secondary uppercase tracking-widest text-xs text-center">
          Trusted by creators and startups
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-surface to-transparent" />

        <motion.div
          className="flex items-center gap-16"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex-shrink-0 font-display text-xl md:text-2xl text-text-secondary/40 select-none whitespace-nowrap hover:text-text-secondary/70 transition-colors duration-300"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
