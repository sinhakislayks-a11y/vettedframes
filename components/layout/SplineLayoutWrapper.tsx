"use client";

import { usePathname } from "next/navigation";
import GlobalSplineBackground from "@/components/home/GlobalSplineBackground";

export default function SplineLayoutWrapper() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return <GlobalSplineBackground />;
}
