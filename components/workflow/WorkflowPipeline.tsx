"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    number: 1,
    title: "Brief & Creative Direction",
    description: "We start by understanding your vision, audience, and goals. I review your assets and develop a creative plan before the first cut.",
    turnaround: "DAY 1-2",
  },
  {
    number: 2,
    title: "Raw Footage Review",
    description: "I organize your footage, select the best takes, and create a solid structure for the edit.",
    turnaround: "WITHIN 24H",
  },
  {
    number: 3,
    title: "Non-Linear Editing",
    description: "Crafting the story with precision cuts, best syncing, and emotional flow.",
    turnaround: "DAY 3-4",
  },
  {
    number: 4,
    title: "Motion Graphics",
    description: "Elevating your video with custom animations, titles, and visual effects to enhance engagement.",
    turnaround: "DAY 4-5",
  },
  {
    number: 5,
    title: "Color Grading",
    description: "Applying cinematic color science and mood-enhancing grades for a professional look.",
    turnaround: "DAY 5-6",
  },
  {
    number: 6,
    title: "Mixing & Mastering",
    description: "Ensuring crystal-clear audio, sound design, and balanced levels for all platforms.",
    turnaround: "DAY 6",
  },
  {
    number: 7,
    title: "Final Export & Delivery",
    description: "Providing high-quality masters in all required formats for web and social media.",
    turnaround: "DAY 7",
  },
];

export default function WorkflowPipeline() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#050505] py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Scanline background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 3px
          )`,
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
          Workflow Pipeline
        </h2>
        <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
          A transparent, high-end 7-step post-production journey from rough cuts to polished delivery.
        </p>
      </motion.div>

      {/* Workflow Card Container */}
      <div
        className="max-w-5xl mx-auto rounded-2xl p-8 md:p-16 relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.12) 0%, rgba(20, 20, 23, 0.9) 70%)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Central Timeline Vertical Line */}
        <div
          className="absolute left-1/2 top-16 bottom-16 w-0.5 -translate-x-1/2 hidden md:block"
          style={{
            background: "linear-gradient(to bottom, rgba(168, 85, 247, 0.6), rgba(168, 85, 247, 0.2))",
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.8)",
          }}
        />

        {/* Steps */}
        <div className="relative z-10 space-y-8 md:space-y-12">
          {STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expandedStep === step.number;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center w-full flex-col md:flex-row gap-4 md:gap-6 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Text Content - Left or Right based on index */}
                <div
                  className={`w-full md:w-[45%] ${
                    isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12 md:order-3"
                  } order-2 md:order-1`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                    className={`cursor-pointer rounded-xl p-4 md:p-6 transition-all duration-300 ${
                      isExpanded ? "bg-white/5 border border-purple-500/30" : ""
                    }`}
                    style={{
                      background: isExpanded
                        ? "rgba(168, 85, 247, 0.08)"
                        : "transparent",
                    }}
                  >
                    <h3 className="font-serif text-lg md:text-xl text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <span
                      className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest rounded"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "#A855F7",
                        border: "1px solid rgba(168, 85, 247, 0.2)",
                      }}
                    >
                      {step.turnaround}
                    </span>
                  </motion.div>
                </div>

                {/* Node Circle - Center on desktop */}
                <div className="order-1 md:order-2 flex-shrink-0 flex justify-center w-full md:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer z-10"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, #7B5CF0, #6025D5)",
                      boxShadow:
                        "0 0 25px rgba(168, 85, 247, 0.7), 0 0 10px rgba(168, 85, 247, 0.5), inset 0 0 10px rgba(168, 85, 247, 0.3)",
                    }}
                    onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                  >
                    <span
                      className="text-2xl md:text-3xl font-serif text-white"
                      style={{
                        textShadow:
                          "0 0 12px rgba(168, 85, 247, 0.9), 0 0 5px rgba(168, 85, 247, 0.5)",
                      }}
                    >
                      {String(step.number).padStart(2, "0")}
                    </span>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout - hidden on mobile */}
                <div className="hidden md:block md:w-[45%] order-3" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-16"
      >
        <p className="text-xl font-serif text-white mb-6">Ready to start your project?</p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-xl text-lg font-medium text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
          }}
        >
          Start Your Journey
        </motion.button>
      </motion.div>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto mt-16 px-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
        <div className="mb-4 md:mb-0">Frames by Kislay</div>
        <div className="flex space-x-6">
          <span className="hover:text-purple-400 transition-colors cursor-pointer">Pricing</span>
          <span className="hover:text-purple-400 transition-colors cursor-pointer">Contact</span>
        </div>
      </footer>
    </section>
  );
}