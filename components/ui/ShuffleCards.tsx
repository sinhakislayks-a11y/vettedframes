"use client";

import { TestimonialCard } from "@/components/ui/testimonial-cards";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

function ShuffleCards() {
  const [positions, setPositions] = useState<
    Array<"front" | "middle" | "back">
  >(["front", "middle", "back", "back", "back"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleShuffle();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleShuffle = useCallback(() => {
    setPositions((prev) => {
      const newPositions = [...prev];
      newPositions.unshift(newPositions.pop()!);
      return newPositions;
    });

    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  // Get current testimonials based on rotation
  const getCurrentTestimonials = useCallback(() => {
    return TESTIMONIALS.slice(0, 5).map((testimonial, index) => ({
      ...testimonial,
      id: index + 1,
    }));
  }, []);

  const testimonials = getCurrentTestimonials();

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden py-16">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex items-center gap-4"
      >
        <div className="h-px w-8 bg-brand" />
        <span className="font-mono text-brand/60 text-[10px] uppercase tracking-[0.25em]">
          What clients say
        </span>
      </motion.div>

      {/* Cards container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative h-[420px] w-[320px] md:-ml-[100px]"
      >
        {/* Glow effect behind front card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-[400px] w-[300px] rounded-full bg-gradient-radial from-brand/[0.08] to-transparent blur-[60px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* Testimonial Cards */}
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${currentIndex}`}
            testimonial={testimonial}
            handleShuffle={handleShuffle}
            position={positions[index] as "front" | "middle" | "back"}
            author={testimonial.name}
          />
        ))}
      </motion.div>

      {/* Drag hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex items-center gap-2 text-text-secondary/40"
      >
        <svg
          className="w-4 h-4 animate-pulse"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-widest">
          Swipe to explore
        </span>
      </motion.div>

      {/* Dots indicator */}
      <div className="mt-6 flex gap-2">
        {testimonials.map((_, index) => (
          <motion.div
            key={index}
            className="h-1.5 w-1.5 rounded-full"
            animate={{
              backgroundColor:
                positions[0] === "front" && index === 0
                  ? "rgba(96, 37, 213, 1)"
                  : "rgba(96, 37, 213, 0.2)",
              scale: positions[0] === "front" && index === 0 ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

export { ShuffleCards };
