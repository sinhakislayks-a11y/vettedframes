"use client";

import { Suspense, lazy, useState, useEffect, Component, ReactNode } from "react";
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

export function SplineScene({ scene, className, onLoad, fallback }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return fallback ? <>{fallback}</> : null;
  }

  const loadingSpinner = <LoadingSpinner />;

  return (
    <div className={`relative w-full h-full ${className || ""}`}>
      {!loaded && loadingSpinner}
      <SplineErrorBoundary fallback={fallback || null}>
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
    </div>
  );
}

export default SplineScene;