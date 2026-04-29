"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What do you need from me to get started?",
    a: "A short brief, your raw footage or existing video, 2 to 3 reference edits you like, and your deadline. That is enough to start.",
  },
  {
    q: "How do revisions work?",
    a: "One structured revision round is included in every project. Additional rounds can be added if needed and are billed separately.",
  },
  {
    q: "Do you work with creators outside India?",
    a: "Yes. I have worked with clients in Europe and Southeast Asia. All communication and delivery is remote and async-friendly.",
  },
  {
    q: "What platforms do you edit for?",
    a: "YouTube (long and short form), Instagram Reels, LinkedIn, and SaaS product demos. Multi-format delivery is available on retainer plans.",
  },
  {
    q: "Do you do scripting or strategy?",
    a: "I do not write scripts. But I do give structural input on hook, pacing, and retention as part of every edit.",
  },
  {
    q: "How do I know if we are a good fit before committing?",
    a: "Send me your last video. I will give you a free 60-second edit audit. No pitch. If it clicks, we work together.",
  },
];

export default function FAQSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="w-full bg-surface border-t border-border-custom py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            FAQ
          </p>
          <h2 className="font-display font-semibold text-2xl text-text-primary">
            Common questions
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Accordion>
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={i}
                className="border-border-custom"
              >
                <AccordionTrigger className="font-sans text-sm text-text-primary hover:no-underline hover:text-brand py-4 cursor-pointer">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary">
                  <p className="font-sans text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
