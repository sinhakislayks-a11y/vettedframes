"use client";

import { useRef } from "react"; // eslint-disable-line no-unused-vars
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface ContentItem {
  title: string;
  description: string;
  accent: string;
}

const CONTENT_ITEMS: ContentItem[] = [
  {
    title: "Promotions",
    description: "Ads, brand campaigns, and product launches built to stop the scroll.",
    accent: "bg-gradient-to-br from-purple-700/30 to-violet-950/30",
  },
  {
    title: "Podcasts",
    description: "Long-form conversations edited with clean pacing and visual polish.",
    accent: "bg-gradient-to-br from-violet-700/30 to-purple-950/30",
  },
  {
    title: "Introduction Videos",
    description: "Channel intros and brand openers that set the tone before the content starts.",
    accent: "bg-gradient-to-br from-cyan-700/30 to-sky-950/30",
  },
  {
    title: "Talking Head YouTube",
    description: "Retention-driven edits for vlogs, tutorials, and commentary content.",
    accent: "bg-gradient-to-br from-emerald-700/30 to-teal-950/30",
  },
  {
    title: "Reels / Shorts",
    description: "Platform-native short-form content optimized for Reels, Shorts, and TikTok.",
    accent: "bg-gradient-to-br from-rose-700/30 to-pink-950/30",
  },
  {
    title: "Motion Graphics",
    description: "Typography-driven animation, kinetic text, and overlay sequences.",
    accent: "bg-gradient-to-br from-blue-700/30 to-indigo-950/30",
  },
  {
    title: "SaaS Animations",
    description: "UI product animations and demo visuals designed for social-first formats.",
    accent: "bg-gradient-to-br from-fuchsia-700/30 to-pink-950/30",
  },
];

export default function TableOfContents() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="w-full bg-bg py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
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
            className="bg-surface border border-border-custom rounded-[4px] overflow-hidden"
          >
            {CONTENT_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
                className="group relative flex items-start gap-5 py-5 border-b border-border-custom last:border-b-0 cursor-pointer"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-[4px] ${item.accent} border border-white/5 flex items-center justify-center`}>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-base md:text-lg text-text-primary mb-1 group-hover:text-brand transition-colors duration-200 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg className="w-4 h-4 text-brand" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
