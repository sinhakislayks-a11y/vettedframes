"use client";

import { Suspense, lazy, useState, useEffect, useRef, Component, ReactNode } from "react";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (app: any) => void;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn("Spline scene failed to load:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return this.props.children;
  }
}

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

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 rounded-full border-2 border-brand/30 border-t-brand animate-spin"
          style={{
            boxShadow: "0 0 20px rgba(96, 37, 213, 0.4)",
          }}
        />
        <span className="font-mono text-brand/50 text-[10px] uppercase tracking-widest">
          Loading
        </span>
      </div>
    </motion.div>
  );
}

function SplineIframe({ onLoad }: { onLoad?: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <GradientFallback />
      <iframe
        ref={iframeRef}
        src="https://my.spline.design/theeternalarc-tkcFHBzOasiJym6BQGBfeSpd-xWa/"
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
          pointerEvents: "auto",
          zIndex: 1,
        }}
        allow="autoplay; xr-spatial-tracking"
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        title="3D Background Scene"
        loading="lazy"
      />
    </>
  );
}

export function SplineScene({ scene, className, onLoad, fallback }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const loadingSpinner = <LoadingSpinner />;

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className || ""}`}>
      {!loaded && loadingSpinner}

      {isMobile ? (
        <div className="absolute inset-0 overflow-hidden">
          <GradientFallback />
        </div>
      ) : isVisible ? (
        <SplineErrorBoundary fallback={<SplineIframe onLoad={() => setLoaded(true)} />}>
          <Suspense fallback={loadingSpinner}>
            <Spline
              scene={scene}
              onLoad={(app) => {
                setLoaded(true);
                if (onLoad) onLoad(app);
              }}
            />
          </Suspense>
        </SplineErrorBoundary>
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <GradientFallback />
        </div>
      )}
    </div>
  );
}

export default SplineScene;