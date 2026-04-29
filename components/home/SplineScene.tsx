"use client";

const SPLINE_SCENE_URL =
  "https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/";

export default function SplineScene() {
  return (
    <iframe
      src={SPLINE_SCENE_URL}
      style={{ width: "100%", height: "100%", border: "none" }}
      className="pointer-events-none"
      allow="autoplay; xr-spatial-tracking"
      loading="lazy"
      title="3D Background"
    />
  );
}
