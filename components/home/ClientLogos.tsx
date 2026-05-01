"use client";

import { motion } from "framer-motion";
import { CLIENT_NAMES } from "@/lib/constants";
import { useState } from "react";

export default function ClientLogos() {
  // Triple the names for seamless infinite loop
  const items = [...CLIENT_NAMES, ...CLIENT_NAMES, ...CLIENT_NAMES];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-gradient-to-r from-surface via-bg to-surface border-t border-b border-border-custom py-14 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[100px] bg-gradient-radial from-brand/5 to-transparent blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[100px] bg-gradient-radial from-brand/5 to-transparent blur-[60px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 mb-10 relative z-10">
        <p className="font-mono text-text-secondary uppercase tracking-widest text-xs text-center">
          Trusted by creators and startups
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-surface via-surface/80 to-transparent" />

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
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex-shrink-0 font-display text-xl md:text-2xl select-none whitespace-nowrap transition-all duration-500 ${
                hoveredIndex === i
                  ? 'text-brand-light scale-110 drop-shadow-[0_0_10px_rgba(96,37,213,0.3)]'
                  : 'text-text-secondary/40 hover:text-text-secondary/70'
              }`}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
