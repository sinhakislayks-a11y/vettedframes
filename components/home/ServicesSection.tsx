"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useState, useCallback } from "react";
import { SERVICE_TIERS } from "@/lib/constants";

interface CardState {
  isHovered: boolean;
  x: number;
  y: number;
}

export default function ServicesSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [cards, setCards] = useState<Record<string, CardState>>({});

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, cardName: string) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCards((prev) => ({
        ...prev,
        [cardName]: { isHovered: true, x, y },
      }));
    },
    []
  );

  const handleMouseLeave = useCallback((cardName: string) => {
    setCards((prev) => ({
      ...prev,
      [cardName]: { isHovered: false, x: 0, y: 0 },
    }));
  }, []);

  return (
    <section className="w-full bg-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header - centered */}
        <div className="mb-14 text-center">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            What I offer
          </p>
          <h2 className="font-display font-bold text-3xl text-text-primary">
            Three ways to work together.
          </h2>
        </div>

        {/* Cards grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICE_TIERS.map((service, i) => {
            const cardState = cards[service.name] || { isHovered: false, x: 0, y: 0 };
            const bgStyle = cardState.isHovered
              ? `radial-gradient(circle at ${cardState.x}px ${cardState.y}px, rgba(139,92,246,0.06) 0%, transparent 60%), #12121A`
              : "#12121A";

            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                }}
                onMouseMove={(e) => handleMouseMove(e, service.name)}
                onMouseLeave={() => handleMouseLeave(service.name)}
                style={{
                  background: cardState.isHovered
                    ? `radial-gradient(circle at ${cardState.x}px ${cardState.y}px, rgba(96,37,213,0.08) 0%, rgba(96,37,213,0.03) 30%, #12121A 70%), #12121A`
                    : "linear-gradient(135deg, #12121A 0%, #0A0A0F 50%, #12121A 100%)",
                  transition: "background 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: cardState.isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                  filter: cardState.isHovered ? "hue-rotate(10deg) saturate(1.1)" : "hue-rotate(0deg)",
                  boxShadow: cardState.isHovered
                    ? "0 25px 50px rgba(96,37,213,0.2), 0 0 30px rgba(96,37,213,0.1)"
                    : "0 0 0 rgba(96,37,213,0)",
                }}
                className="group border border-border-custom rounded-[4px] p-8 hover:border-brand/50 transition-all duration-500 flex flex-col"
              >
                {/* Tier label */}
                <span className="font-mono text-brand text-xs uppercase tracking-widest mb-4">
                  {service.tier}
                </span>

                {/* Name */}
                <h3 className="font-display font-semibold text-xl text-text-primary mb-3">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-text-secondary text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables */}
                <ul className="flex flex-col gap-2 mb-8 flex-1">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="font-sans text-text-secondary text-sm flex items-start gap-2"
                    >
                      <span className="text-border-custom mt-1.5 leading-none">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="font-sans text-sm text-brand hover:text-brand-light transition-colors duration-200"
                >
                  {service.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}