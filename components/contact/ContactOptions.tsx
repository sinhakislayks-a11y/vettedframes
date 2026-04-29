"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Calendar, MessageCircle, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OPTIONS = [
  {
    icon: Calendar,
    label: "Book a call",
    description: "15-minute intro call. Pick a time that works for you.",
    cta: "Schedule a call",
    href: "https://calendly.com/sinhakislayks/30min",
    variant: "default" as const,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    description: "Fast response. Send your project brief directly.",
    cta: "Open WhatsApp",
    href: "https://wa.me/919470878005?text=Hi%20Kislay%2C%20I%20want%20to%20discuss%20a%20project",
    variant: "outline" as const,
  },
  {
    icon: Mail,
    label: "Email",
    description: "sinhakislayks@gmail.com",
    cta: "Send an email",
    href: "mailto:sinhakislayks@gmail.com",
    variant: "ghost" as const,
  },
];

export default function ContactOptions() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="w-full bg-bg pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OPTIONS.map((option, i) => {
            const Icon = option.icon;

            return (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, y: 28 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                }
                transition={{
                  duration: 0.45,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as [
                    number,
                    number,
                    number,
                    number,
                  ],
                }}
                className="bg-surface border border-border-custom rounded-[4px] p-6 hover:border-brand transition-colors duration-200 flex flex-col"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-[4px] bg-brand/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-brand" />
                </div>

                {/* Label */}
                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                  {option.label}
                </h3>

                {/* Description */}
                <p className="font-sans text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                  {option.description}
                </p>

                {/* CTA */}
                <a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: option.variant }),
                    option.variant === "default"
                      ? "bg-brand text-bg hover:bg-brand/90 font-sans text-sm"
                      : option.variant === "outline"
                        ? "border-brand text-brand hover:bg-brand/10 hover:text-brand font-sans text-sm"
                        : "text-brand hover:text-brand/80 hover:bg-transparent font-sans text-sm p-0 h-auto justify-start"
                  )}
                >
                  {option.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
