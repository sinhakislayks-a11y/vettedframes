"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface ExplainerItem {
  title: string;
  accentWord: string;
  description: string;
  philosophy: string;
  visual: "timeline" | "color" | "motion" | "audio";
}

const EXPLAINERS: ExplainerItem[] = [
  {
    title: "Non-Linear Editing",
    accentWord: "Editing",
    description:
      "Assembly is where the story either comes together or falls apart. I start with a rough structure — hooks, retention peaks, and moments of payoff — then build the narrative around those anchors.",
    philosophy:
      "Every cut either advances the story or kills momentum. No filler frames. No vanity transitions. If a cut doesn't earn its place, it doesn't exist in the final.",
    visual: "timeline",
  },
  {
    title: "Color Grading",
    accentWord: "Color",
    description:
      "Color isn't aesthetic — it's emotional. A crushed black adds weight. Lifted shadows feel hopeful. Warm highlights in skin tones feel alive. Every slider move is a mood decision.",
    philosophy:
      "Natural contrast over crushed blacks. Skin tones that feel real, not filtered. Brand-grade consistency so your content looks like a production, not a project file.",
    visual: "color",
  },
  {
    title: "Motion Graphics",
    accentWord: "Motion",
    description:
      "Kinetic type, lower thirds, and overlay sequences that add production value without distracting from the content. Motion should reinforce the message, not compete with it.",
    philosophy:
      "Clean, purposeful motion that elevates without overwhelming. Text that animates with intent. Graphics that feel native to your brand, not borrowed from a template library.",
    visual: "motion",
  },
  {
    title: "Audio Mixing & Mastering",
    accentWord: "Audio",
    description:
      "Dialogue cleanup, sound design, and dynamic compression. Every element sits correctly in the mix — nothing peaks, nothing gets lost. The edit should feel loud even at low volumes.",
    philosophy:
      "Audio is 50% of the viewing experience. A great cut with bad audio will always underperform. I treat audio with the same precision as the picture.",
    visual: "audio",
  },
];

function VisualPlaceholder({ type }: { type: ExplainerItem["visual"] }) {
  const gradients = {
    timeline: "from-brand/20 via-brand/10 to-transparent",
    color: "from-emerald-500/20 via-brand/10 to-transparent",
    motion: "from-purple-500/20 via-brand/10 to-transparent",
    audio: "from-cyan-500/20 via-brand/10 to-transparent",
  };

  const icons = {
    timeline: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="24" width="48" height="4" rx="2" fill="currentColor" opacity="0.3" />
        <rect x="8" y="32" width="32" height="4" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="8" y="40" width="40" height="4" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="8" y="16" width="12" height="4" rx="2" fill="#6025D5" />
        <rect x="24" y="16" width="8" height="4" rx="2" fill="#6025D5" opacity="0.6" />
      </svg>
    ),
    color: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <circle cx="20" cy="20" r="10" fill="#10B981" opacity="0.6" />
        <circle cx="44" cy="20" r="10" fill="#8B5CF6" opacity="0.6" />
        <circle cx="32" cy="44" r="10" fill="#F59E0B" opacity="0.6" />
      </svg>
    ),
    motion: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <text x="8" y="28" fill="currentColor" fontSize="14" fontWeight="bold" opacity="0.5">ABC</text>
        <path d="M8 36 L24 36 L32 28 L40 44 L48 32 L56 36" stroke="#6025D5" strokeWidth="2" fill="none" opacity="0.6" />
      </svg>
    ),
    audio: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="20" width="3" height="24" rx="1.5" fill="currentColor" opacity="0.4" />
        <rect x="14" y="16" width="3" height="32" rx="1.5" fill="currentColor" opacity="0.6" />
        <rect x="20" y="24" width="3" height="16" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="26" y="12" width="3" height="40" rx="1.5" fill="#6025D5" opacity="0.8" />
        <rect x="32" y="20" width="3" height="24" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="38" y="14" width="3" height="36" rx="1.5" fill="#6025D5" opacity="0.7" />
        <rect x="44" y="22" width="3" height="20" rx="1.5" fill="currentColor" opacity="0.4" />
        <rect x="50" y="18" width="3" height="28" rx="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  };

  return (
    <div
      className={`relative w-full aspect-video rounded-[6px] bg-gradient-to-br ${gradients[type]} border border-border-custom overflow-hidden flex items-center justify-center`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-text-secondary/60">{icons[type]}</div>
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] text-text-secondary/40 uppercase tracking-widest">
        {type} process
      </div>
    </div>
  );
}

function ExplainerSection({ item, index, isEven }: { item: ExplainerItem; index: number; isEven: boolean }) {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="w-full py-20 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-1/2"
          >
            <VisualPlaceholder type={item.visual} />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <h3 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4 tracking-tight">
              {item.title.replace(item.accentWord, "")}
              <span className="text-brand-light"> {item.accentWord}</span>
            </h3>
            <p className="font-sans text-text-secondary text-base leading-relaxed mb-6">
              {item.description}
            </p>
            <div className="border-l-2 border-brand/30 pl-5">
              <p className="font-sans text-text-secondary/80 text-sm leading-relaxed italic">
                &ldquo;{item.philosophy}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ProcessExplainers() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="w-full bg-gradient-to-b from-bg via-surface to-bg relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-brand/5 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div ref={ref} className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-brand to-brand-light" />
              <span className="font-mono text-brand uppercase tracking-[0.2em] text-[11px]">
                How I work
              </span>
            </div>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-text-primary tracking-tight">
              The process behind the cuts.
            </h2>
          </motion.div>
        </div>

        {/* Explainer sections */}
        {EXPLAINERS.map((item, i) => (
          <ExplainerSection
            key={item.title}
            item={item}
            index={i}
            isEven={i % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}