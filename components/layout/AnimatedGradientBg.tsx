"use client";

import { motion } from "framer-motion";

interface OrbConfig {
  color: string;
  opacity: number;
  size: number;
  initialX: string;
  initialY: string;
  animateX: string;
  animateY: string;
  duration: number;
  delay?: number;
}

const orbs: OrbConfig[] = [
  {
    color: "#6025D5", // brand purple
    opacity: 0.15,
    size: 800,
    initialX: "-10%",
    initialY: "-20%",
    animateX: "60%",
    animateY: "40%",
    duration: 28,
  },
  {
    color: "#3B0FA0", // deep violet
    opacity: 0.12,
    size: 1000,
    initialX: "70%",
    initialY: "60%",
    animateX: "-20%",
    animateY: "-30%",
    duration: 35,
    delay: 5,
  },
  {
    color: "#7B5CF0", // brand-light indigo
    opacity: 0.1,
    size: 700,
    initialX: "30%",
    initialY: "70%",
    animateX: "-10%",
    animateY: "-40%",
    duration: 22,
    delay: 10,
  },
  {
    color: "#1D0756", // dark indigo
    opacity: 0.08,
    size: 600,
    initialX: "-5%",
    initialY: "50%",
    animateX: "40%",
    animateY: "-20%",
    duration: 40,
    delay: 8,
  },
];

function GradientOrb({ config }: { config: OrbConfig }) {
  return (
    <motion.div
      className="absolute rounded-full will-change-transform"
      style={{
        width: config.size,
        height: config.size,
        left: config.initialX,
        top: config.initialY,
        background: `radial-gradient(circle at center, ${config.color} 0%, transparent 70%)`,
        opacity: config.opacity,
      }}
      animate={{
        x: [0, config.animateX, 0],
        y: [0, config.animateY, 0],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay || 0,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
}

export function AnimatedGradientBg() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {orbs.map((orb, index) => (
          <GradientOrb key={index} config={orb} />
        ))}
      </motion.div>
    </div>
  );
}
