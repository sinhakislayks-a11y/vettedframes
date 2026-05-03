"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRandomErrorMessage, interactionConfig, ErrorMessage } from "@/lib/error-messages";

interface ErrorScreenProps {
  errorCode?: "404" | "ERROR";
  onReset?: () => void;
}

export function ErrorScreen({ errorCode = "404", onReset }: ErrorScreenProps) {
  const [message, setMessage] = useState<ErrorMessage | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMessage(getRandomErrorMessage());
  }, []);

  if (!mounted || !message) {
    return null;
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Full-screen animated GIF background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ imageRendering: "auto" }}
        />
      </div>

      {/* Film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Text backdrop for readability */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-bg/30 via-bg/50 to-bg/70" />

      {/* Centered content overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="text-center max-w-xl w-full relative">
          {/* Large glitching error number */}
          <div className="relative mb-4">
            <h1
              className="relative font-display font-bold text-[5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none text-text-primary select-none drop-shadow-md"
              data-text={errorCode}
              style={{ letterSpacing: "-0.03em" }}
            >
              {errorCode}
            </h1>
          </div>

          {/* Headline */}
          <h2
            className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-text-primary mb-2 tracking-tight drop-shadow-sm"
            style={{ animation: "fadeInUp 0.6s ease-out 0.15s forwards", opacity: 0 }}
          >
            {message.headline}
          </h2>

          {/* Subtext */}
          <p
            className="text-text-secondary font-sans text-sm sm:text-base leading-relaxed mb-1 max-w-md mx-auto drop-shadow-sm"
            style={{ animation: "fadeInUp 0.6s ease-out 0.2s forwards", opacity: 0 }}
          >
            {message.subtext}
          </p>

          {/* Micro line (if exists) */}
          {message.microLine && (
            <p
              className="text-text-muted font-sans text-sm mb-2 drop-shadow-sm"
              style={{ animation: "fadeInUp 0.6s ease-out 0.25s forwards", opacity: 0 }}
            >
              {message.microLine}
            </p>
          )}

          {/* Quote (if exists) */}
          {message.quote && (
            <blockquote
              className="mt-4 mb-6"
              style={{ animation: "fadeInUp 0.6s ease-out 0.3s forwards", opacity: 0 }}
            >
              <p className="text-brand-dark font-sans text-sm italic mb-0.5 drop-shadow-sm">
                &ldquo;{message.quote.text}&rdquo;
              </p>
              <cite className="text-brand font-mono text-xs not-italic drop-shadow-sm">
                — {message.quote.attribution}
              </cite>
            </blockquote>
          )}

          {/* CTA line (if exists) */}
          {message.ctaText && (
            <p
              className="text-brand font-mono text-xs uppercase tracking-widest mb-4 drop-shadow-sm"
              style={{ animation: "fadeInUp 0.6s ease-out 0.32s forwards", opacity: 0 }}
            >
              {message.ctaText}
            </p>
          )}

          {/* Action buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
            style={{ animation: "fadeInUp 0.6s ease-out 0.38s forwards", opacity: 0 }}
          >
            {onReset ? (
              <button
                onClick={onReset}
                className="group inline-flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium font-sans px-8 py-3 rounded-lg transition-all duration-300 min-w-[180px] cursor-pointer hover:shadow-[0_0_25px_rgba(96,37,213,0.5)]"
              >
                <span className="group-hover:hidden">Try Again</span>
                <span className="hidden group-hover:inline">{interactionConfig.ctaHoverText}</span>
              </button>
            ) : (
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium font-sans px-8 py-3 rounded-lg transition-all duration-300 min-w-[180px] hover:shadow-[0_0_25px_rgba(96,37,213,0.5)]"
              >
                <span className="group-hover:hidden">Back to Home</span>
                <span className="hidden group-hover:inline">{interactionConfig.ctaHoverText}</span>
              </Link>
            )}
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand/40 text-text-primary text-sm font-medium font-sans px-8 py-3 rounded-lg hover:border-brand hover:bg-brand/10 transition-all duration-300 min-w-[180px] backdrop-blur-sm"
            >
              View My Work
            </Link>
          </div>

          {/* Email contact line */}
          <p
            className="mt-12 text-text-secondary font-sans text-xs drop-shadow-sm"
            style={{ animation: "fadeInUp 0.6s ease-out 0.45s forwards", opacity: 0 }}
          >
            Or report this if it shouldn&apos;t be broken{" "}
            <a
              href="mailto:sinhakislayks@gmail.com"
              className="text-brand hover:text-brand/80 transition-colors duration-200 underline underline-offset-2"
            >
              sinhakislayks@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
