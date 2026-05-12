"use client";

import { useEffect, useRef, useState } from "react";

const ABOUT_SPLINE_URL = "https://my.spline.design/distortingtypography-FZZGSzd1DOcI2dBCHY8XaW7d/?v=1";

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
    return (
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(96, 37, 213, 0.4) 0%, rgba(123, 92, 240, 0.3) 40%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(96, 37, 213, 0.35) 0%, rgba(123, 92, 240, 0.2) 40%, transparent 70%)",
        }}
      />
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
          opacity: isLoaded ? 0.6 : 0,
          transition: "opacity 0.8s ease-in-out",
          pointerEvents: "auto",
          zIndex: 1,
        }}
        allow="autoplay; xr-spatial-tracking"
        onLoad={() => setIsLoaded(true)}
        title="About 3D Background"
      />
    </>
  );
}
