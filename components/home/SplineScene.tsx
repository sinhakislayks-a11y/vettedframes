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
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load: only load when near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (hasError) {
    return <GradientFallback />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Show gradient until loaded */}
      {!isVisible && <GradientFallback />}

      {isVisible && (
        <iframe
          src={SPLINE_SCENE_URL}
          style={{ width: "100%", height: "100%", border: "none" }}
          className="w-full h-full"
          allow="autoplay; xr-spatial-tracking"
          loading="lazy"
          title="3D Background"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
