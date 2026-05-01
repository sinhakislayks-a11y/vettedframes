"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface ContentItem {
  number: number;
  title: string;
  description: string;
  accent: string;
  badge?: string;
  emoji: string;
}

const CONTENT_ITEMS: ContentItem[] = [
  {
    number: 1,
    title: "Promotions",
    description: "Ads, brand campaigns, and product launches built to stop the scroll.",
    accent: "bg-gradient-to-br from-amber-600/30 to-orange-900/30",
    emoji: "🎬",
  },
  {
    number: 2,
    title: "Podcasts",
    description: "Long-form conversations edited with clean pacing and visual polish.",
    accent: "bg-gradient-to-br from-violet-700/30 to-purple-950/30",
    emoji: "🎙️",
  },
  {
    number: 3,
    title: "Introduction Videos",
    description: "Channel intros and brand openers that set the tone before the content starts.",
    accent: "bg-gradient-to-br from-cyan-700/30 to-sky-950/30",
    emoji: "🎥",
  },
  {
    number: 4,
    title: "Talking Head YouTube",
    description: "Retention-driven edits for vlogs, tutorials, and commentary content.",
    accent: "bg-gradient-to-br from-emerald-700/30 to-teal-950/30",
    emoji: "👤",
  },
  {
    number: 5,
    title: "Reels / Shorts",
    description: "Platform-native short-form content optimized for Reels, Shorts, and TikTok.",
    accent: "bg-gradient-to-br from-rose-700/30 to-pink-950/30",
    emoji: "📱",
  },
  {
    number: 6,
    title: "Motion Graphics",
    description: "Typography-driven animation, kinetic text, and overlay sequences.",
    accent: "bg-gradient-to-br from-blue-700/30 to-indigo-950/30",
    emoji: "✨",
  },
  {
    number: 7,
    title: "SaaS Animations",
    description: "UI product animations and demo visuals designed for social-first formats.",
    accent: "bg-gradient-to-br from-fuchsia-700/30 to-pink-950/30",
    emoji: "🚀",
  },
  {
    number: 8,
    title: "AI-Generated Content",
    description: "Script-to-video workflows, AI avatars, and synthetic media for brands that move fast.",
    accent: "bg-gradient-to-br from-purple-700/30 to-violet-950/30",
    badge: "NEW",
    emoji: "🤖",
  },
];

export default function TableOfContents() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="w-full bg-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand" />
              <span className="font-mono text-brand uppercase tracking-[0.2em] text-[11px]">
                Capabilities
              </span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary tracking-tight mb-4">
              What I create
            </h2>
            <p className="font-sans text-text-secondary text-base leading-relaxed max-w-lg">
              End-to-end production across short-form, long-form, and motion graphics.
              Each format optimized for its platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {CONTENT_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                data-category={item.title.toLowerCase().replace(/[\s/]/g, "-")}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                className="group relative flex flex-col items-center justify-center text-center bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated border border-border-custom rounded-[4px] p-6 cursor-pointer hover:border-brand/40 hover:shadow-[0_0_25px_rgba(96,37,213,0.15)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
                style={{
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-3 right-3 font-mono text-[9px] text-brand uppercase tracking-widest bg-brand/10 px-2 py-0.5 rounded-[2px]">
                    {item.badge}
                  </span>
                )}

                {/* Number tag */}
                <span className="font-mono text-brand text-[10px] uppercase tracking-wider mb-3 block">
                  {String(item.number).padStart(2, "0")}
                </span>

                {/* Emoji */}
                <div className="text-4xl mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-3 drop-shadow-lg">
                  {item.emoji}
                </div>

                {/* Visual accent block */}
                <div className={`w-10 h-10 rounded-[3px] ${item.accent} mb-4 border border-white/5 shadow-lg`} />

                {/* Title */}
                <h3 className="font-display font-semibold text-base text-text-primary mb-2 group-hover:text-brand transition-colors duration-300 tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-brand" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-brand/5 via-transparent to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
