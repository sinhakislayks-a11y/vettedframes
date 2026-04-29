"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL =
  "https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/";

function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(109,40,217,0.08) 0%, transparent 50%), linear-gradient(180deg, #050507 0%, #0A0A0F 50%, #050507 100%)",
      }}
    />
  );
}

export default function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Start visible for hero section
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hero section is always visible on load, no need for lazy observer
  // Keep intersection observer for future-proofing if moved elsewhere
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Mouse tracking (desktop only, when loaded)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (iframeRef.current && isLoaded) {
        iframeRef.current.contentWindow?.postMessage(
          { type: "mousemove", x: e.clientX, y: e.clientY },
          "*"
        );
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (iframeRef.current && isLoaded) {
        iframeRef.current.contentWindow?.postMessage(
          { type: "click", x: e.clientX, y: e.clientY },
          "*"
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [isLoaded, isMobile]);

  if (hasError || isMobile) {
    return <GradientFallback />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Always show gradient as base layer */}
      <GradientFallback />

      {/* Spline iframe - always render when not mobile/error, visibility handled by CSS */}
      {!hasError && !isMobile && (
        <iframe
          ref={iframeRef}
          src={SPLINE_SCENE_URL}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "auto", // Changed from "none" - allows interaction
          }}
          className="absolute inset-0 z-10"
          allow="autoplay; xr-spatial-tracking"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          title="3D Background"
        />
      )}
    </div>
  );
}