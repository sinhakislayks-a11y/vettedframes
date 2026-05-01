"use client";

import { useEffect, useRef, useState } from "react";

const CONTACT_SPLINE_URL =
  "https://my.spline.design/robotfollowcursorforlandingpage-KgmYkazmx9We3xTUcZ4ytAay/?v=2";

function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 60% 30%, rgba(139,92,246,0.20) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 70%, rgba(109,40,217,0.15) 0%, transparent 45%),
          linear-gradient(180deg, #050507 0%, #0A0A0F 50%, #050507 100%)
        `,
      }}
    />
  );
}

export default function ContactSplineBackground() {
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
      <GradientFallback />
      {/* Robot follow-cursor scene — pointerEvents: auto is critical for cursor tracking */}
      <iframe
        ref={iframeRef}
        src={CONTACT_SPLINE_URL}
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
        title="Contact 3D Background"
      />
    </>
  );
}
