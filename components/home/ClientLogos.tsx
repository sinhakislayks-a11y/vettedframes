"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const logos = [
  { name: "blinkit", src: "/logos/blinkit.png" },
  { name: "nobroker", src: "/logos/nobroker.png" },
  { name: "guru", src: "/logos/guru.png" },
  { name: "internal-bhakti", src: "/logos/internal-bhakti.png" },
  { name: "muffer", src: "/logos/muffer.png" },
  { name: "ekore", src: "/logos/ekore.png" },
  { name: "nca-hub", src: "/logos/nca-hub.png" },
];

export default function ClientLogos() {
  const items = [...logos, ...logos, ...logos];
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
          {items.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex-shrink-0 h-10 w-auto transition-all duration-500 ${
                hoveredIndex === i ? 'scale-110' : ''
              }`}
              style={{ width: "auto" }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}