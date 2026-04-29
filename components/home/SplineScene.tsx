"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SPLINE_SCENE_URL =
  "https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/";

function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(135deg, #0A0A0A 0%, #141414 50%, #0A0A0A 100%)",
      }}
    />
  );
}

export default function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lazy load: only start loading when near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Disable iframe when scrolled past
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolledPast = rect.bottom < 0;
        if (scrolledPast && iframeRef.current) {
          iframeRef.current.style.visibility = "hidden";
        } else if (iframeRef.current) {
          iframeRef.current.style.visibility = "visible";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking (desktop only, when visible)
  useEffect(() => {
    if (isMobile || !isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (iframeRef.current && isLoaded) {
        iframeRef.current.contentWindow?.postMessage(
          { type: "mousemove", x: e.clientX, y: e.clientY },
          "*"
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLoaded, isVisible, isMobile]);

  if (hasError || isMobile) {
    return <GradientFallback />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {!isLoaded && <GradientFallback />}

      {/* Only render iframe when visible */}
      {isVisible && (
        <iframe
          ref={iframeRef}
          src={SPLINE_SCENE_URL}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
          className="absolute inset-0"
          allow="autoplay; xr-spatial-tracking"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          title="3D Background"
        />
      )}

      {/* Always show gradient when not loaded (and not visible means hidden anyway) */}
      {!isVisible && <GradientFallback />}
    </div>
  );
}
