"use client";

import ServiceCard from "./ServiceCard";
import { SERVICES } from "@/lib/constants";

export default function ServicesGrid() {
  return (
    <section id="services" className="w-full bg-bg py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            What I Do
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
            Three things, done right.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
