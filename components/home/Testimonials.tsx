"use client";

import { motion, AnimatePresence } from "framer-motion";
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

  // Auto-rotate every 6 seconds - slower pace
  useEffect(() => {
    const interval = setInterval(() => {
      handleShuffle();
    }, 6000);

    return () => clearInterval(interval);
  }, [handleShuffle]);

  interface TestimonialData {
    id: number;
    quote: string;
    name: string;
    role: string;
    company?: string;
  }

  const testimonials: TestimonialData[] = TESTIMONIALS.slice(0, 5).map(
    (testimonial, index) => ({
      ...testimonial,
      id: index + 1,
    })
  );

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-bg-secondary via-surface to-bg-secondary py-24">
      {/* Large breathing glow gradient - circular */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary breathing glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          animate={{
            background: [
              "radial-gradient(circle, rgba(96, 37, 213, 0.25) 0%, rgba(123, 92, 240, 0.15) 30%, transparent 70%)",
              "radial-gradient(circle, rgba(123, 92, 240, 0.3) 0%, rgba(96, 37, 213, 0.2) 30%, transparent 70%)",
              "radial-gradient(circle, rgba(96, 37, 213, 0.25) 0%, rgba(123, 92, 240, 0.15) 30%, transparent 70%)",
            ],
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary slower glow layer */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          animate={{
            background: [
              "radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 60%)",
              "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 60%)",
              "radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 60%)",
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Outer subtle ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          animate={{
            borderRadius: ["50%", "48%", "52%", "50%"],
            opacity: [0.3, 0.5, 0.3],
          }}
          style={{
            border: "1px solid rgba(96, 37, 213, 0.1)",
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
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
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative flex justify-center"
        >
          {/* Cards wrapper */}
          <div className="relative h-[420px] w-[320px] md:-ml-[100px]">
            {/* Testimonial Cards with smooth transitions */}
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${currentIndex}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate:
                      positions[index] === "front"
                        ? "-6deg"
                        : positions[index] === "middle"
                        ? "0deg"
                        : "6deg",
                    x:
                      positions[index] === "front"
                        ? "0%"
                        : positions[index] === "middle"
                        ? "33%"
                        : "66%",
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex:
                      positions[index] === "front"
                        ? 2
                        : positions[index] === "middle"
                        ? 1
                        : 0,
                  }}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    handleShuffle={handleShuffle}
                    position={positions[index] as "front" | "middle" | "back"}
                    author={testimonial.name}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Interaction hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
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
              animate={{ x: [-8, 8, -8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" />
            </motion.svg>
            <span className="font-mono text-[10px] uppercase tracking-widest">
              Drag to explore
            </span>
          </div>

          {/* Dots indicator */}
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <motion.div
                key={index}
                className="h-2 w-2 rounded-full"
                animate={{
                  backgroundColor:
                    positions[0] === "front" && index === 0
                      ? "rgba(96, 37, 213, 1)"
                      : "rgba(96, 37, 213, 0.2)",
                  scale: positions[0] === "front" && index === 0 ? 1.4 : 1,
                  boxShadow:
                    positions[0] === "front" && index === 0
                      ? "0 0 12px rgba(96, 37, 213, 0.6)"
                      : "none",
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
