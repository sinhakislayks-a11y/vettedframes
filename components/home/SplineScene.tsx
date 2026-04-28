"use client";

import { Suspense, lazy, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE_URL =
  "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";

/** Gradient fallback shown while Spline loads or if it errors */
function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, var(--background) 0%, var(--card) 50%, var(--background) 100%)",
      }}
    />
  );
}

export default function SplineScene() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <GradientFallback />;
  }

  return (
    <Suspense fallback={<GradientFallback />}>
      <Spline
        scene={SPLINE_SCENE_URL}
        onError={() => setHasError(true)}
        style={{ width: "100%", height: "100%" }}
        className="pointer-events-none"
      />
    </Suspense>
  );
}
