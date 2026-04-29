"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL =
  "https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/";

function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(135deg, #0A0A0A 0%, #141414 50%, #0A0A0A 100%)",
      }}
    />
  );
}

export default function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Forward mouse position to Spline via postMessage
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (iframeRef.current && isLoaded) {
        iframeRef.current.contentWindow?.postMessage(
          {
            type: "mousemove",
            x: e.clientX,
            y: e.clientY,
          },
          "*"
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLoaded]);

  if (hasError) {
    return <GradientFallback />;
  }

  return (
    <>
      {/* Show gradient until Spline has loaded */}
      {!isLoaded && <GradientFallback />}

      <iframe
        ref={iframeRef}
        src={SPLINE_SCENE_URL}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        className="absolute inset-0"
        allow="autoplay; xr-spatial-tracking"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        title="3D Background"
      />
    </>
  );
}
