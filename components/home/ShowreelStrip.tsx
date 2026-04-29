"use client";

import { motion } from "framer-motion";
import { REEL_ITEMS } from "@/lib/constants";
import { Film, Play } from "lucide-react";

export default function ShowreelStrip() {
  // Duplicate items for seamless infinite scroll
  const items = [...REEL_ITEMS, ...REEL_ITEMS];

  return (
    <section className="w-full bg-bg-secondary py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-12">
        <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
          Selected Work
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
          Recent projects
        </h2>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg-secondary to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg-secondary to-transparent" />

        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {items.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className={`group relative flex-shrink-0 w-72 h-44 rounded-[4px] bg-gradient-to-br ${item.gradient} border border-border-custom/50 overflow-hidden cursor-pointer hover:border-brand/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] transition-all duration-300`}
            >
              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-[4px] bg-brand/20 border border-brand/30 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <Play className="w-4 h-4 text-brand-light fill-brand-light" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-2 mb-1">
                  <Film className="w-3 h-3 text-brand-light" />
                  <span className="text-xs font-mono text-brand-light uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm font-sans text-white font-medium">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
