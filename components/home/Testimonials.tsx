"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="w-full bg-gradient-to-b from-bg-secondary via-surface to-bg-secondary py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-radial from-brand/5 to-transparent blur-[100px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            Kind Words
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
            What clients say
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="relative min-h-[240px] flex flex-col items-center">
          <div className="w-8 h-8 mb-6 text-brand/30">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <blockquote className="font-sans text-text-primary text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-1">
                <p className="font-display font-semibold text-text-primary text-sm">
                  {testimonial.name}
                </p>
                <p className="font-sans text-text-secondary text-xs">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`w-2 h-2 rounded-[4px] transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "bg-brand-light w-6 shadow-[0_0_10px_rgba(96,37,213,0.4)]"
                    : "bg-border-custom hover:bg-brand/50"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
