"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";

function PortfolioCard({
  item,
  index,
  isInView,
}: {
  item: (typeof PORTFOLIO_ITEMS)[number];
  index: number;
  isInView: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !item.thumbnail || imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
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
        className="font-sans text-sm text-brand hover:text-brand/80 transition-colors duration-200"
      >
        Watch →
      </a>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="w-full bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            Selected work
          </p>
          <h2 className="font-display font-bold text-3xl text-text-primary">
            Edits that perform.
          </h2>
        </div>

        {/* Portfolio grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            <PortfolioCard
              key={item.title}
              item={item}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
