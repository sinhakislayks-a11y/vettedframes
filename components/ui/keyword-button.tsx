"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KeywordButtonProps {
  label: string;
  tooltip: string;
  className?: string;
}

export function KeywordButton({ label, tooltip, className = "" }: KeywordButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const triggerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      setPosition(spaceBelow < 80 ? "top" : "bottom");
    }
    setIsVisible(true);
  }, []);

  return (
    <span className={`relative inline ${className}`}>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="cursor-pointer border-b border-dotted border-brand hover:border-brand/70 transition-colors duration-200"
        tabIndex={0}
        role="button"
        aria-describedby="keyword-tooltip"
      >
        {label}
      </span>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id="keyword-tooltip"
            initial={{ opacity: 0, y: position === "bottom" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === "bottom" ? 4 : -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 z-50 pointer-events-none"
            style={{
              top: position === "bottom" ? "100%" : "auto",
              bottom: position === "top" ? "100%" : "auto",
              marginTop: position === "bottom" ? "8px" : 0,
              marginBottom: position === "top" ? "8px" : 0,
            }}
          >
            <div
              className="bg-surface-elevated border rounded-[4px] p-3 max-w-[200px] shadow-lg"
              style={{
                borderColor: "rgba(96,37,213,0.3)",
              }}
            >
              <p className="font-sans text-[13px] text-text-secondary leading-relaxed">
                {tooltip}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
