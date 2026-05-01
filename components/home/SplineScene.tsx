"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL =
  "https://my.spline.design/retrofuturismbganimation-7JerxeLWNxftSFY13hx3FSnn/?v=1";

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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <GradientFallback />
      {isMobile ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src="/videos/light-streaks.mp4" type="video/mp4" />
        </video>
      ) : (
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
      )}
    </div>
  );
}