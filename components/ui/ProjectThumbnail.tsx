"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectThumbnailProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function ProjectThumbnail({
  src,
  alt,
  priority = false,
  className = "",
}: ProjectThumbnailProps) {
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !src || imgError;

  if (showPlaceholder) {
    return (
      <div className={`relative w-full aspect-video bg-bg flex items-center justify-center ${className}`}>
        <span className="font-mono text-text-secondary/40 text-xs text-center px-4 uppercase tracking-wider">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        onError={() => setImgError(true)}
      />
    </div>
  );
}
