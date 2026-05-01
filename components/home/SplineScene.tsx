"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

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

const SPLINE_SCENE_URL =
  "https://my.spline.design/retrofuturismbganimation-7JerxeLWNxftSFY13hx3FSnn/";

export default function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <GradientFallback />
      {!hasError && (
        <div
          className="absolute inset-0"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        >
          {isMobile ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onLoadedData={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            >
              <source src="/videos/light-streaks.mp4" type="video/mp4" />
            </video>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "130%",
                height: "130%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Spline
                scene={SPLINE_SCENE_URL}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}