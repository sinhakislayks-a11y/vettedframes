"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TestimonialCard } from "@/components/ui/testimonial-cards";
import { useEffect, useState, useCallback, useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = TESTIMONIALS.map((testimonial, index) => ({
    ...testimonial,
    id: index + 1,
  }));

  const performShuffle = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, testimonials.length]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      performShuffle();
    }, 6000);
  }, [performShuffle]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const handleShuffle = useCallback(() => {
    performShuffle();
    startInterval(); // Reset timer on manual shuffle
  }, [performShuffle, startInterval]);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

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
          className="relative flex justify-center items-center"
        >
          {/* Cards wrapper */}
          <div className="relative h-[420px] w-[320px]">
            {/* Testimonial Cards with smooth left-to-right slide */}
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((testimonial, index) => {
                const isFront = index === 0;
                const isMiddle = index === 1;

                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{
                      x: 300,
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      x: isFront ? 0 : isMiddle ? 60 : 120,
                      y: isFront ? 0 : isMiddle ? -15 : -30,
                      opacity: isFront ? 1 : isMiddle ? 0.4 : 0.15,
                      scale: isFront ? 1 : isMiddle ? 0.9 : 0.8,
                      rotate: isFront ? -6 : isMiddle ? -3 : 0,
                      zIndex: 3 - index,
                    }}
                    exit={{
                      x: -600,
                      opacity: 0,
                      rotate: -25,
                      scale: 0.9,
                      transition: { 
                        duration: 0.4,
                        ease: "easeIn" 
                      }
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 30,
                      mass: 1
                    }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                    }}
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      handleShuffle={handleShuffle}
                      position={isFront ? "front" : isMiddle ? "middle" : "back"}
                      author={testimonial.name}
                    />
                  </motion.div>
                );
              })}
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
                    index === currentIndex
                      ? "rgba(96, 37, 213, 1)"
                      : "rgba(96, 37, 213, 0.2)",
                  scale: index === currentIndex ? 1.4 : 1,
                  boxShadow:
                    index === currentIndex
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
