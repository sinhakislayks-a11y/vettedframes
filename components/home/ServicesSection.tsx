"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { SERVICE_TIERS } from "@/lib/constants";

export default function ServicesSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="w-full bg-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            What I offer
          </p>
          <h2 className="font-display font-bold text-3xl text-text-primary">
            Three ways to work together.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {SERVICE_TIERS.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }}
              className="group bg-surface border border-border-custom rounded-[4px] p-8 hover:border-brand transition-colors duration-200 flex flex-col"
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
                className="font-sans text-sm text-brand hover:text-brand/80 transition-colors duration-200"
              >
                {service.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
