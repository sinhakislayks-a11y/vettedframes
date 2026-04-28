"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function WorkflowHero() {
  return (
    <section className="w-full bg-bg pt-30 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-mono text-brand uppercase tracking-widest text-xs mb-4"
        >
          How I work
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display font-bold text-3xl md:text-5xl text-text-primary mb-6"
        >
          From raw footage to finished reel.
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-sans text-text-secondary text-lg max-w-[560px] leading-relaxed"
        >
          A clear process means fewer revisions, faster delivery, and work that actually performs.
        </motion.p>
      </div>
    </section>
  );
}
