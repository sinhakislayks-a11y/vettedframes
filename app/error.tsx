"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Metadata } from "next";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Application error:", error);
  }, [error]);

  return (
    <>
      {/* Film strip borders */}
      <div className="film-strip film-strip-top" />
      <div className="film-strip film-strip-bottom" />

      {/* Scanline animation */}
      <div className="scanline" />

      {/* Film grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center max-w-lg animate-fade-in">
          {/* Large glitching ERROR */}
          <div className="relative mb-8">
            <h1
              className="glitch-text font-heading text-[10rem] md:text-[12rem] leading-none text-text-primary select-none"
              data-text="ERROR"
              style={{ letterSpacing: "-0.02em" }}
            >
              ERROR
            </h1>
          </div>

          {/* Monospace timecode label */}
          <p className="font-mono text-brand uppercase tracking-[0.25em] text-xs mb-8">
            RENDER_FAILED · UNEXPECTED_EOF
          </p>

          {/* Heading */}
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary mb-4 tracking-tight">
            Something broke in the pipeline.
          </h2>

          {/* Subtext */}
          <p className="text-text-secondary font-sans text-sm leading-relaxed mb-10 max-w-md mx-auto">
            A critical error interrupted the render. Don&apos;t worry — our team
            has been notified. Try resetting, or head back home.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium font-sans px-6 py-3 rounded-[4px] hover:bg-brand/90 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300 min-w-[160px] cursor-pointer"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-brand/50 text-brand-light text-sm font-medium font-sans px-6 py-3 rounded-[4px] hover:bg-brand/10 hover:border-brand transition-all duration-300 min-w-[160px]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
