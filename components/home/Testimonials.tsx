"use client";

import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/ui/testimonial-cards";
import { useEffect, useState, useCallback } from "react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [positions, setPositions] = useState<Array<"front" | "middle" | "back">>(
    ["front", "middle", "back", "back", "back"]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleShuffle = useCallback(() => {
    setPositions((prev) => {
      const newPositions = [...prev];
      newPositions.unshift(newPositions.pop()!);
      return newPositions;
    });
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleShuffle();
    }, 4000);

    return () => clearInterval(interval);
  }, [handleShuffle]);

  interface TestimonialData {
  id: number;
  quote: string;
  name: string;
  role: string;
  company?: string;
}

// Transform TESTIMONIALS to include id
const testimonials: TestimonialData[] = TESTIMONIALS.slice(0, 5).map(
  (testimonial, index) => ({
    ...testimonial,
    id: index + 1,
  })
);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-bg-secondary via-surface to-bg-secondary py-24">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-radial from-brand/[0.06] to-transparent blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="h-px w-8 bg-brand" />
            <span className="font-mono text-brand/60 text-[10px] uppercase tracking-[0.25em]">
              Testimonials
            </span>
            <div className="h-px w-8 bg-brand" />
          </div>
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-text-primary tracking-tight">
            What clients say
          </h2>
        </motion.div>

        {/* Cards container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center"
        >
          {/* Glow effect behind front card */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="h-[450px] w-[350px] rounded-full bg-gradient-radial from-brand/[0.1] to-transparent blur-[80px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Cards wrapper */}
          <div className="relative h-[420px] w-[320px] md:-ml-[100px]">
            {/* Testimonial Cards */}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${currentIndex}`}
                testimonial={testimonial}
                handleShuffle={handleShuffle}
                position={positions[index] as "front" | "middle" | "back"}
                author={testimonial.name}
              />
            ))}
          </div>
        </motion.div>

        {/* Interaction hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          {/* Drag icon */}
          <div className="flex items-center gap-2 text-text-secondary/50">
            <motion.svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" />
            </motion.svg>
            <span className="font-mono text-[10px] uppercase tracking-widest">
              Drag to explore
            </span>
          </div>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.div
                key={index}
                className="h-1.5 w-1.5 rounded-full"
                animate={{
                  backgroundColor:
                    positions[0] === "front" && index === 0
                      ? "rgba(96, 37, 213, 1)"
                      : "rgba(96, 37, 213, 0.25)",
                  scale: positions[0] === "front" && index === 0 ? 1.3 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
