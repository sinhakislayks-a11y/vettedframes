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
  const hasLoadedRef = useRef(false);

  // Check if we've successfully loaded before (persists during session)
  useEffect(() => {
    // Check if spline was previously loaded in this session
    if (sessionStorage.getItem("splineLoaded") === "true") {
      hasLoadedRef.current = true;
      setShowSpline(true);
      setIsLoaded(true);
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Delay spline loading to not block initial render
    const loadDelay = hasLoadedRef.current ? 1000 : 2000;

    const startSplineLoad = setTimeout(() => {
      // Set spline to show (it will fade in when loaded)
      setShowSpline(true);
    }, loadDelay);

    return () => clearTimeout(startSplineLoad);
  }, [isMobile]);

  useEffect(() => {
    if (!showSpline || isMobile || hasError) return;

    // Timeout fallback
    loadTimeoutRef.current = setTimeout(() => {
      if (!isLoaded && !hasError) {
        setHasError(true);
      }
    }, 10000);

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [showSpline, isMobile, isLoaded, hasError]);

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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLoaded, isMobile]);

  const handleLoad = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    setIsLoaded(true);
    // Remember that spline loaded successfully
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
