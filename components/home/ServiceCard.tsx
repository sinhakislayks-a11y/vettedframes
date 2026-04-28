"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Film, Palette, Camera } from "lucide-react";
import type { Service } from "@/lib/constants";

const ICONS: Record<string, React.ReactNode> = {
  film: <Film className="w-5 h-5" />,
  palette: <Palette className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="group relative bg-surface border border-border-custom rounded-[4px] p-6 hover:bg-surface-elevated hover:border-brand/20 transition-colors duration-300"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-[4px] bg-brand-dim flex items-center justify-center text-brand mb-5">
        {ICONS[service.icon] || <Film className="w-5 h-5" />}
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-xl text-text-primary mb-3">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-text-secondary text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}
