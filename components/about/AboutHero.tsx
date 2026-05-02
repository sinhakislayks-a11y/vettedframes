"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

// Floating geometric elements
function FloatingElement({
  type,
  className,
  delay = 0,
}: {
  type: "circle" | "square" | "line";
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.15, 0.15, 0],
        scale: 1,
        y: [0, -20, 0],
        rotate: type === "line" ? [0, 5, 0, -5, 0] : [0, 3, 0],
      }}
      transition={{
        opacity: { duration: 8, repeat: Infinity, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {type === "circle" && (
        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-brand/20" />
      )}
      {type === "square" && (
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-[4px] border border-brand-light/15 rotate-45" />
      )}
      {type === "line" && (
        <div className="w-px h-24 md:h-32 bg-gradient-to-b from-brand/30 to-transparent" />
      )}
    </motion.div>
  );
}

// Film frame motif
function FilmFrame({ className }: { className: string }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <svg
        width="60"
        height="80"
        viewBox="0 0 60 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-20"
      >
        <rect
          x="2"
          y="2"
          width="56"
          height="76"
          rx="2"
          stroke="#6025D5"
          strokeWidth="1"
        />
        <rect x="6" y="8" width="48" height="32" fill="#6025D5" fillOpacity="0.1" />
        <rect x="6" y="44" width="48" height="28" fill="#6025D5" fillOpacity="0.1" />
        <circle cx="10" cy="6" r="2" fill="#6025D5" />
        <circle cx="50" cy="6" r="2" fill="#6025D5" />
        <circle cx="10" cy="74" r="2" fill="#6025D5" />
        <circle cx="50" cy="74" r="2" fill="#6025D5" />
      </svg>
    </motion.div>
  );
}

// Cursor spotlight effect
function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[5] hidden md:block"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(96, 37, 213, 0.04), transparent 50%)`,
      }}
    />
  );
}

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg-secondary" />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(96, 37, 213, 0.4) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 70%, rgba(123, 92, 240, 0.4) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 50%, rgba(96, 37, 213, 0.4) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 30%, rgba(96, 37, 213, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating geometric elements */}
      <FloatingElement type="circle" className="top-[15%] left-[10%]" delay={0} />
      <FloatingElement type="square" className="top-[25%] right-[15%]" delay={0.5} />
      <FloatingElement type="line" className="bottom-[20%] left-[20%]" delay={1} />
      <FloatingElement type="circle" className="bottom-[30%] right-[10%]" delay={1.5} />
      <FloatingElement type="square" className="top-[60%] left-[5%]" delay={2} />

      {/* Film frame motifs */}
      <FilmFrame className="top-[20%] right-[5%] rotate-12" />
      <FilmFrame className="bottom-[25%] left-[8%] -rotate-6" />

      {/* Large decorative text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: smoothY }}
      >
        <span
          className="font-display text-[20vw] md:text-[15vw] font-bold text-brand/[0.02] whitespace-nowrap"
          aria-hidden
        >
          KISLAY
        </span>
      </motion.div>

      {/* Horizontal scan lines (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-brand"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>

      {/* Cursor spotlight */}
      <CursorSpotlight />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 py-32"
        style={{ y, opacity, scale }}
      >
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-brand" />
          <motion.span
            className="font-mono text-brand/60 uppercase tracking-[0.25em] text-[11px]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            About
          </motion.span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[1.05] tracking-tight mb-12"
        >
          I make videos that
          <br />
          <span className="bg-gradient-to-r from-brand via-brand-light to-purple-400 bg-clip-text text-transparent">
            hold attention.
          </span>
        </motion.h1>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-xl"
        >
          <p className="font-sans text-text-secondary text-lg md:text-xl leading-relaxed">
            Video editor, cinematographer, and visual artist. I work with
            creators, founders, and personal brands who understand that
            content is a long game — and want someone who plays it well.
          </p>
        </motion.div>

        {/* Scroll indicator with pulse */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-20 flex items-center gap-3 text-text-secondary/40"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-brand/40 to-transparent"
              animate={{ scaleY: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-brand/50"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Scroll to read
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-secondary/80 to-transparent pointer-events-none" />
    </section>
  );
}
