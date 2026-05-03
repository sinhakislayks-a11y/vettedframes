"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  handleShuffle: () => void;
  position: "front" | "middle" | "back";
  author: string;
}

export function TestimonialCard({
  testimonial,
  handleShuffle,
  position,
  author,
}: TestimonialCardProps) {
  const isFront = position === "front";

  return (
    <motion.div
      drag={isFront ? "x" : false}
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -100) {
          handleShuffle();
        }
      }}
      className={`absolute left-0 top-0 grid h-[420px] w-[320px] select-none place-content-center space-y-5 rounded-xl border border-border-custom bg-surface/80 p-6 backdrop-blur-md ${
        isFront
          ? "cursor-grab active:cursor-grabbing border-brand/30 shadow-[0_0_50px_rgba(96,37,213,0.2)]"
          : "border-border-custom/50 shadow-xl"
      }`}
    >
      {/* Quote icon */}
      <div className="flex justify-center">
        <svg
          className="w-8 h-8 text-brand/40"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Quote text */}
      <span className="text-center text-base leading-relaxed italic text-text-secondary">
        "{testimonial.quote}"
      </span>

      {/* Author info */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium text-brand-light">
          {testimonial.name}
        </span>
        <span className="text-xs text-text-muted">
          {testimonial.role}
          {testimonial.company && ` @ ${testimonial.company}`}
        </span>
      </div>
    </motion.div>
  );
}
