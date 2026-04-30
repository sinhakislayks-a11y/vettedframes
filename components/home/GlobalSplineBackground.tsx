"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL =
  "https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/";

function GradientBackground() {
  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex: -10,
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

export default function GlobalSplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse tracking for Spline cursor interaction
  useEffect(() => {
    if (isMobile || !iframeRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: "mousemove", x: e.clientX, y: e.clientY },
          "*"
        );
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
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
  }, [isMobile]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (isMobile) {
    return <GradientBackground />;
  }

  return (
    <>
      <GradientBackground />
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
          transition: "opacity 0.8s ease",
          pointerEvents: "auto",
          zIndex: -5,
        }}
        allow="autoplay; xr-spatial-tracking"
        onLoad={handleLoad}
        onError={handleError}
        title="3D Background"
      />
    </>
  );
}