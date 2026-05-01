"use client";

import { useEffect, useRef, useState } from "react";


function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.20) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(109,40,217,0.15) 0%, transparent 45%),
          linear-gradient(180deg, #050507 0%, #0A0A0F 50%, #050507 100%)
        `,
      }}
    />
  );
}

export default function WorkflowSplineBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
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
          src="https://my.spline.design/retrofuturismbganimation-7JerxeLWNxftSFY13hx3FSnn/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            border: "none",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            pointerEvents: "none",
            zIndex: 1,
          }}
          allow="autoplay; xr-spatial-tracking"
          onLoad={() => setIsLoaded(true)}
          title="Workflow 3D Background"
        />
      )}
    </>
  );
}