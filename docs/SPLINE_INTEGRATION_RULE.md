# Spline 3D Integration Rules for VettedFrames

**CRITICAL RULE: NEVER use `@splinetool/react-spline` or `@splinetool/runtime` in this project.**

This project uses Spline **Viewer URLs** (e.g., `https://my.spline.design/...`) rather than `.splinecode` export files. The `react-spline` package is fundamentally incompatible with Viewer URLs and will cause fatal "This page couldn't load" crashes on Vercel deployments if used.

## The Standard Implementation Pattern

Always use a native HTML `<iframe>` to embed Spline scenes.

Follow these strict styling rules for the iframe to ensure it is responsive and has no black bars:
1. **Scale the iframe to 130%** and center it using `transform` (this simulates `object-fit: cover` and pushes the black bars outside the viewport).
2. **Hide overflow** on the parent container.
3. Enable `pointerEvents: "auto"` on the iframe so the user can interact with the scene (e.g., cursor tracking).
4. Include `allow="autoplay; xr-spatial-tracking"` for correct initialization.
5. Apply a cache-busting timestamp (e.g. `?v=20260501`) to the end of the URL and update it when the scene is modified in the Spline Editor so that browsers fetch the latest version.

### Template Component

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

// Cache-bust timestamp: update this string when the scene is re-exported
const SPLINE_SCENE_URL = "https://my.spline.design/YOUR-SCENE-ID/?v=1";

export default function SplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <>
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
    </>
  );
}
```

### Mobile Fallbacks
WebGL is heavy on mobile devices. For mobile users (`window.innerWidth < 768`), conditionally render a lightweight `div` gradient or an optimized `.mp4` `<video>` tag instead of the Spline iframe.

### Text Overlays
If placing text or UI elements over the Spline iframe, make sure their container has `pointer-events-none` so mouse events pass through to the iframe, allowing cursor tracking and drag interactions to function normally. Re-enable pointer events (`pointer-events-auto`) on specific buttons if needed.