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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasLoadedBefore = useRef(false);

  useEffect(() => {
    // Check if spline loaded successfully in previous session
    if (sessionStorage.getItem("splineLoaded") === "true") {
      hasLoadedBefore.current = true;
    }

    // Delay spline loading to not block initial render
    // Shorter delay for returning visitors
    const loadDelay = hasLoadedBefore.current ? 500 : 1500;

    const startSplineLoad = setTimeout(() => {
      setShowSpline(true);
    }, loadDelay);

    return () => clearTimeout(startSplineLoad);
  }, []);

  useEffect(() => {
    if (!showSpline || hasError) return;

    // 12 second timeout - if spline hasn't loaded, show gradient
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
  }, [showSpline, isLoaded, hasError]);

  // Mouse tracking - starts immediately when spline begins loading
  useEffect(() => {
    if (!showSpline) return;

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
  }, [showSpline]);

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
      {showSpline && !hasError && (
        <iframe
          ref={iframeRef}
          src={SPLINE_SCENE_URL}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            border: "none",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            pointerEvents: "auto",
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
