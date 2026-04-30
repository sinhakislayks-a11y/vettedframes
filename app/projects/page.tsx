"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/constants";
import Image from "next/image";

const CATEGORIES = [
  "All",
  "YouTube Edits",
  "Reels & Short-form",
  "Motion Graphics",
  "Cinematography & Color",
] as const;

type Category = (typeof CATEGORIES)[number];

// Category assignments
const getCategory = (item: PortfolioItem): Category | null => {
  switch (item.title) {
    case "SHOWREEL 2025":
      return null; // Showreel is featured separately
    case "Abhishek Kar — YouTube":
    case "Deepak Wadhwa — YouTube":
      return "YouTube Edits";
    case "Deepak Wadhwa — Reel":
    case "Sanjay Khaturia — Reel":
    case "Before/After Transformation":
    case "Finance Reel":
      return "Reels & Short-form";
    case "SaaS Animation — Reel":
    case "SaaS Animation — 16:9":
    case "Narrative Animation":
    case "Motion Graphics":
      return "Motion Graphics";
    case "Italian Client — Lifestyle Reel":
    case "Music Video Reel":
      return "Cinematography & Color";
    default:
      return null;
  }
};

// Find showreel
const SHOWREEL = PORTFOLIO_ITEMS.find((item) => item.title === "SHOWREEL 2025");

// Filter items for grid (exclude showreel)
const GRID_ITEMS = PORTFOLIO_ITEMS.filter((item) => item.title !== "SHOWREEL 2025");

function PortfolioCard({
  item,
}: {
  item: (typeof GRID_ITEMS)[number];
}) {
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !item.thumbnail || imgError;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="bg-surface-elevated border border-border-custom rounded-[4px] p-4 flex flex-col hover:border-brand/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-[4px] overflow-hidden mb-4 bg-bg">
        {showPlaceholder ? (
          <div className="absolute inset-0 flex items-center justify-center bg-bg">
            <span className="font-mono text-text-secondary/40 text-xs text-center px-4 uppercase tracking-wider">
              {item.title}
            </span>
          </div>
        ) : (
          <Image
            src={item.thumbnail!}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Role tag */}
      <span className="font-mono text-brand text-xs uppercase tracking-widest mb-2">
        {item.role}
      </span>

      {/* Client name */}
      <h3 className="font-display text-text-primary text-base font-medium mb-1.5">
        {item.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-text-secondary text-sm leading-relaxed mb-4 flex-1">
        {item.description}
      </p>

      {/* Watch link */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans text-sm text-brand hover:text-brand-light transition-colors duration-200"
      >
        Watch →
      </a>
    </motion.div>
  );
}

function ShowreelCard({ item }: { item: typeof SHOWREEL }) {
  if (!item) return null;

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative w-full h-64 md:h-80 rounded-[4px] overflow-hidden mb-12 bg-gradient-to-br from-purple-900/60 to-violet-950/60 border border-border-custom hover:border-brand/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 cursor-pointer"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Play indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
          <svg className="w-6 h-6 text-brand-light ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent">
        <span className="font-mono text-brand-light text-xs uppercase tracking-widest mb-2 block">
          Featured Work
        </span>
        <h3 className="font-display font-semibold text-2xl md:text-3xl text-white mb-2">
          {item.title}
        </h3>
        <p className="font-sans text-text-secondary text-sm">
          {item.role}
        </p>
      </div>
    </motion.a>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filteredItems =
    activeFilter === "All"
      ? GRID_ITEMS
      : GRID_ITEMS.filter((item) => getCategory(item) === activeFilter);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-bg">
        <div className="mx-auto max-w-6xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-brand uppercase tracking-widest text-xs mb-4"
          >
            All work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display font-semibold text-4xl md:text-5xl text-text-primary tracking-tight"
          >
            Every project. Every category.
          </motion.h1>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-14 z-40 bg-bg-secondary/80 backdrop-blur-md border-b border-border-custom py-4">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-[4px] text-sm font-sans transition-all duration-200 cursor-pointer ${
                  activeFilter === category
                    ? "bg-brand text-bg shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    : "bg-surface border border-border-custom text-text-secondary hover:text-text-primary hover:border-brand/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Showreel - only show when "All" is selected */}
      {activeFilter === "All" && <ShowreelCard item={SHOWREEL} />}

      {/* Projects Grid */}
      <section className="flex-1 bg-bg py-16">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item) => (
                <PortfolioCard key={item.title} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-text-secondary">
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}