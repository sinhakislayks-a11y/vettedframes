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
      <div className={`relative w-full aspect-video flex items-center justify-center overflow-hidden bg-[#0A0A0F] group ${className}`}>
        {/* Subtle animated background gradient */}
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 60%)',
          }}
        />
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
          }} 
        />

        {/* Text content */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-6">
          <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
             <svg className="w-5 h-5 text-white/50 translate-x-[2px]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <span className="font-mono text-white/40 text-[10px] text-center uppercase tracking-[0.2em] line-clamp-2 max-w-[80%]">
            {alt}
          </span>
        </div>
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
