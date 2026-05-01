"use client";

import { useEffect, useRef, useState } from "react";

// Spline viewer URL (iframe embed method)
// Cache-bust: update this timestamp whenever you re-export from the Spline editor
const SPLINE_SCENE_URL =
  "https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/?v=20260501c";

function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(139,92,246,0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 80% 20%, rgba(109,40,217,0.20) 0%, transparent 40%),
          radial-gradient(ellipse at 50% 80%, rgba(167,139,250,0.15) 0%, transparent 45%),
          radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.12) 0%, transparent 35%),
          linear-gradient(180deg, #050507 0%, #0A0A0F 40%, #12121A 70%, #050507 100%)
        `,
      }}
    />
  );
}

export default function SplineScene() {
  const [isMobile, setIsMobile] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile: looping video fallback (lightweight, no GPU-heavy WebGL)
  if (isMobile) {
    return (
      <>
        <GradientFallback />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-mobile-poster.jpg"
          preload="metadata"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        >
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </video>
      </>
    );
  }

  return (
    <>
      <GradientFallback />
      {/* 
        Spline iframe — scaled 130% and centered to simulate object-fit: cover.
        This eliminates black bars on the sides regardless of viewport aspect ratio.
        The parent container's overflow-hidden crops the excess.
      */}
      <iframe
        ref={iframeRef}
        src={SPLINE_SCENE_URL}
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
          zIndex: 1,
        }}
        allow="autoplay; xr-spatial-tracking"
        onLoad={() => setIsLoaded(true)}
        title="3D Background Scene"
      />
    </>
  );
}