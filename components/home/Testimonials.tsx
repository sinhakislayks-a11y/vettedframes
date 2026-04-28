"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="w-full bg-bg py-20">
      <div className="mx-auto max-w-3xl px-6">
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
          <Quote className="w-8 h-8 text-brand/30 mb-6" />

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
                className={`w-2 h-2 rounded-[4px] transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "bg-brand w-6"
                    : "bg-border-custom hover:bg-text-secondary"
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
