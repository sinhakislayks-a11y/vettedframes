"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Cache-bust timestamp: update when the scene is re-exported in Spline Editor
const ABOUT_SPLINE_URL =
  "https://my.spline.design/distortingtypography-FZZGSzd1DOcI2dBCHY8XaW7d/?v=20260512";

function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 40% 40%, rgba(96, 37, 213, 0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 60%, rgba(123, 92, 240, 0.2) 0%, transparent 45%),
          linear-gradient(180deg, #050507 0%, #0A0A0F 50%, #050507 100%)
        `,
      }}
    />
  );
}

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center z-[2]"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin"
          style={{ boxShadow: "0 0 20px rgba(96, 37, 213, 0.4)" }}
        />
        <span className="font-mono text-purple-500/50 text-[10px] uppercase tracking-widest">
          Loading
        </span>
      </div>
    </motion.div>
  );
}

export default function AboutSplineBackground() {
  const [isMobile, setIsMobile] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile: gradient fallback only
  if (isMobile) {
    return <GradientFallback />;
  }

  return (
    <>
      {/* Gradient shown underneath while iframe loads */}
      <GradientFallback />

      {/* Loading spinner */}
      {!isLoaded && <LoadingSpinner />}

      {/* Interactive Spline iframe — pointerEvents: auto is critical for cursor tracking */}
      <iframe
        ref={iframeRef}
        src={ABOUT_SPLINE_URL}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "130%",
          height: "130%",
          transform: "translate(-50%, -50%)",
          border: "none",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
          pointerEvents: "auto",
          zIndex: 5,
        }}
        allow="autoplay; xr-spatial-tracking"
        onLoad={() => setIsLoaded(true)}
        title="About 3D Background — Interactive"
      />
    </>
  );
}
