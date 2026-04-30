"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL =
  "https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/";

function GradientFallback() {
  return (
    <div
      className="fixed inset-0 -z-10 animate-fade-in"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(139,92,246,0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 80% 20%, rgba(109,40,217,0.20) 0%, transparent 40%),
          radial-gradient(ellipse at 50% 80%, rgba(167,139,250,0.15) 0%, transparent 45%),
          radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.12) 0%, transparent 35%),
          linear-gradient(180deg, #050507 0%, #0A0A0F 40%, #12121A 70%, #050507 100%)
        `,
        animation: "fadeIn 0.3s ease-out forwards",
      }}
    />
  );
}

export default function GlobalSplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSpline, setShowSpline] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasLoadedBefore = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Check if spline loaded successfully in previous session
    if (sessionStorage.getItem("splineLoaded") === "true") {
      hasLoadedBefore.current = true;
    }

    // Delay spline loading to not block initial render
    const loadDelay = hasLoadedBefore.current ? 1000 : 2000;

    const startSplineLoad = setTimeout(() => {
      setShowSpline(true);
    }, loadDelay);

    return () => clearTimeout(startSplineLoad);
  }, [isMobile]);

  useEffect(() => {
    if (!showSpline || isMobile || hasError) return;

    loadTimeoutRef.current = setTimeout(() => {
      if (!isLoaded && !hasError) {
        setHasError(true);
      }
    }, 12000);

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [showSpline, isMobile, isLoaded, hasError]);

  // Mouse tracking - separate effect that only activates when iframe is ready
  useEffect(() => {
    if (isMobile || !showSpline) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: "mousemove", x: e.clientX, y: e.clientY },
          "*"
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, showSpline]);

  const handleLoad = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    setIsLoaded(true);
    sessionStorage.setItem("splineLoaded", "true");
  };

  return (
    <>
      <GradientFallback />
      {showSpline && !hasError && !isMobile && (
        <iframe
          ref={iframeRef}
          src={SPLINE_SCENE_URL}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            border: "none",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            pointerEvents: "none",
            zIndex: -10,
          }}
          allow="autoplay; xr-spatial-tracking"
          onLoad={handleLoad}
          onError={() => {
            if (loadTimeoutRef.current) {
              clearTimeout(loadTimeoutRef.current);
            }
            setHasError(true);
          }}
          title="3D Background"
        />
      )}
    </>
  );
}
