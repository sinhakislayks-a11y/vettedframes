"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL =
  "https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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

  if (isMobile) {
    return <GradientFallback />;
  }

  return (
    <div className="absolute inset-0">
      <GradientFallback />
      <iframe
        ref={iframeRef}
        src={SPLINE_SCENE_URL}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "auto",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        allow="autoplay; xr-spatial-tracking"
        onLoad={() => setIsLoaded(true)}
        title="3D Background"
      />
    </div>
  );
}
