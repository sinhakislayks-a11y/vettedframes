"use client";

import { useRef, useState } from "react";

const SPLINE_SCENE_URL =
  "https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/?v=1";

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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <>
      <GradientBackground />
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ zIndex: -5 }}
      >
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
      </div>
    </>
  );
}