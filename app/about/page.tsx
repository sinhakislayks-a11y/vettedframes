"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import AboutSplineBackground from "@/components/about/AboutSplineBackground";

// Icons
function GridIcon({ className }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm3 11v-2h2v2h2v2h-2v2h-2v-2h-2v-2h2z" /></svg>;
}
function BriefcaseIcon({ className }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" /></svg>;
}
function TagIcon({ className }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 8C4.67 8 4 7.33 4 6.5S4.67 5 5.5 5 7 5.67 7 6.5 6.33 8 5.5 8z" /></svg>;
}
function UserIcon({ className }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z" /></svg>;
}
function ArrowLeftIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>;
}
function ArrowRightIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>;
}

function IconSelector({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "grid": return <GridIcon className={className} />;
    case "briefcase": return <BriefcaseIcon className={className} />;
    case "tag": return <TagIcon className={className} />;
    case "user": return <UserIcon className={className} />;
    default: return null;
  }
}

const NAV_ITEMS = [
  { id: "workflow", label: "Workflow", icon: "grid" },
  { id: "portfolio", label: "Portfolio", icon: "briefcase" },
  { id: "pricing", label: "Pricing", icon: "tag" },
  { id: "contact", label: "Contact", icon: "user" },
];

// Philosophy content - Static cards
const PHILOSOPHY_ITEMS = [
  { number: "01", title: "Narrative First", description: "Story is the foundation. Every cut serves the narrative." },
  { number: "02", title: "Color Is Emotion", description: "Color sets the emotional register before a word is spoken." },
  { number: "03", title: "Precision Edits", description: "Every frame deliberate. Every transition intentional." },
  { number: "04", title: "Collaborative Flow", description: "Your vision amplified through creative partnership." },
];

// Why creators content - Static cards
const REASONS = [
  { icon: "⚡", title: "Speed & Quality", description: "Fast turnaround without compromising on quality or creativity." },
  { icon: "🎯", title: "Creative Vision", description: "Understanding what makes content resonate and stick." },
  { icon: "🔄", title: "Reliable Delivery", description: "Consistent results you can count on, every single time." },
  { icon: "🌐", title: "Global Experience", description: "Working with brands and creators across multiple markets." },
];

// Approach content
const PILLARS = [
  { number: "01", title: "DISCOVERY & ALIGNMENT", description: "Understanding your vision, audience, and goals." },
  { number: "02", title: "CREATIVE EXECUTION", description: "Crafting the edit with precision and purpose." },
  { number: "03", title: "REFINEMENT & POLISH", description: "Fine-tuning until every frame feels right." },
];

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const [philoIndex, setPhiloIndex] = useState(0);

  return (
    <div className="min-h-screen pb-20 lg:pb-0 overflow-hidden bg-[#050507]">


      {/* Large Watermark Background */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1
            className="text-[12vw] lg:text-[10vw] font-bold tracking-tighter text-white/[0.02] whitespace-nowrap select-none"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            THE AGENCY YEARS
          </h1>
        </div>
      </div>

      {/* Main Content - positioned above spline */}
      <div className="relative z-10">
        {/* Hero Section — Pure interactive Spline */}
        <section className="relative h-screen flex flex-col overflow-hidden">
          {/* Spline 3D Background — fills hero, receives all mouse events */}
          <div className="absolute inset-0 z-0">
            <AboutSplineBackground />
          </div>

          {/* Bottom gradient fade — clean transition from hero into content */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none z-10" />
        </section>

        {/* Title + Portrait Section — below the Spline hero */}
        <section className="relative px-6 lg:px-12 py-16 -mt-24 z-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 items-start">
            {/* Left Vertical Label - Desktop only */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hidden lg:flex items-end self-stretch"
            >
              <span className="text-[11px] tracking-[0.3em] text-gray-500 uppercase font-medium" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                Storyteller / Post-Production / Video Editor
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest text-purple-400 border border-purple-400/30 rounded-full mb-6">
                The agency years
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter uppercase font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
                The Agency<br />Years
              </h1>
            </motion.div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:block w-1/3 lg:w-1/4 aspect-[4/5] rounded-2xl overflow-hidden border border-white/10"
            >
              <img
                alt="Kislay Sinha - Video Editor"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop"
              />
            </motion.div>
          </div>
        </section>

        {/* Story Section - Grid Layout */}
        <section className="px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Card 1 */}
              <Section>
                <div className="bg-gradient-to-br from-[#12141a] to-[#0a0c10] border border-white/5 rounded-2xl p-8 h-full">
                  <span className="text-purple-400 text-[10px] uppercase tracking-widest font-mono">Speed without compromise</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">What stayed</h2>
                  <p className="text-gray-400 leading-relaxed">
                    I worked in an influencer marketing agency handling high-volume creator content — reels, podcasts, YouTube videos. Finance creators, lifestyle creators, tech creators. The pace was relentless and the standards were high. That environment taught me how to think fast and deliver faster, without letting quality slip.
                  </p>
                </div>
              </Section>

              {/* Card 2 */}
              <Section delay={0.1}>
                <div className="bg-gradient-to-br from-[#12141a] to-[#0a0c10] border border-white/5 rounded-2xl p-8 h-full">
                  <span className="text-purple-400 text-[10px] uppercase tracking-widest font-mono">The instinct for retention</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">The instinct</h2>
                  <p className="text-gray-400 leading-relaxed">
                    Working at that speed, you develop something more valuable than speed itself — an instinct for what holds attention and what loses it. I learned to feel when pacing is off, when a cut breaks flow, when the hook dies before it starts. That's not something you learn. It's something you earn.
                  </p>
                </div>
              </Section>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <Section className="px-6 lg:px-12 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 italic leading-relaxed">
              "But I don't see editing as execution. I see it as the invisible architecture that controls how content feels."
            </p>
          </div>
        </Section>

        {/* Philosophy Section - Carousel with Arrows */}
        <Section className="px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-purple-500" />
              <span className="text-gray-500 text-[10px] uppercase tracking-widest">Our Philosophy</span>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={() => setPhiloIndex(prev => prev === 0 ? PHILOSOPHY_ITEMS.length - 1 : prev - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <ArrowLeftIcon />
              </button>
              <button
                onClick={() => setPhiloIndex(prev => prev === PHILOSOPHY_ITEMS.length - 1 ? 0 : prev + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <ArrowRightIcon />
              </button>

              {/* Cards Row - Show 2 on desktop, 1 on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PHILOSOPHY_ITEMS.slice(philoIndex, philoIndex + 2).map((item, i) => (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-[#12141a] to-[#0a0c10] border border-white/5 rounded-2xl p-6 lg:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl lg:text-5xl font-bold text-purple-500/20 font-mono" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {item.number}
                      </span>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm lg:text-base">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Page Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {PHILOSOPHY_ITEMS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhiloIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === philoIndex || i === philoIndex + 1 ? 'bg-purple-500 w-6' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Why Creators Section - Static Cards Grid */}
        <Section className="px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-purple-500" />
              <span className="text-gray-500 text-[10px] uppercase tracking-widest">Why Creators Trust Us</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">Creator content sits at the intersection of four things</h2>

            {/* Static Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {REASONS.map((reason, index) => (
                <div
                  key={reason.title}
                  className="bg-gradient-to-br from-[#12141a] to-[#0a0c10] border border-white/5 rounded-xl p-6 h-full"
                >
                  <span className="text-3xl mb-4 block">{reason.icon}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-gray-400 text-sm">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Approach Section - 3 Cards with Center Glowing */}
        <Section className="px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-purple-500" />
              <span className="text-gray-500 text-[10px] uppercase tracking-widest">How I Work</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">Not a freelancer. Not an agency.</h2>

            {/* 3 Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PILLARS.map((pillar, index) => (
                <div
                  key={pillar.number}
                  className={`relative rounded-2xl p-8 text-center transition-all duration-500 ${
                    index === 1
                      ? 'bg-gradient-to-br from-[#1f1a2e] to-[#12141a] border border-purple-500/50'
                      : 'bg-gradient-to-br from-[#12141a] to-[#0a0c10] border border-white/5'
                  }`}
                  style={{
                    boxShadow: index === 1 ? '0 0 60px 10px rgba(99, 45, 201, 0.4)' : 'none',
                  }}
                >
                  <span
                    className={`text-5xl lg:text-6xl font-bold ${index === 1 ? 'text-purple-500/40' : 'text-gray-500/30'}`}
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {pillar.number}
                  </span>
                  <h3 className="text-sm lg:text-base font-bold text-white mt-4 uppercase tracking-wide">{pillar.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{pillar.description}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-400 italic mt-8 max-w-xl mx-auto">
              If you're building something that matters and want someone who understands the craft behind the content — let's talk.
            </p>
          </div>
        </Section>

        {/* CTA Button */}
        <Section className="px-6 lg:px-12 pb-24" delay={0.3}>
          <div className="max-w-6xl mx-auto text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 py-5 px-10 rounded-2xl text-lg font-medium text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                boxShadow: "0 0 40px rgba(168, 85, 247, 0.5)"
              }}
            >
              Start a project
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </Section>
      </div>

      {/* Bottom Navigation - Desktop: Hidden, Mobile: Fixed */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 px-4 pt-3 pb-6 bg-[#050507]/95 backdrop-blur-xl border-t border-white/5">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === "about";
            return (
              <Link
                key={item.id}
                href={item.id === "workflow" ? "/workflow" : `/${item.id}`}
                className={`flex flex-col items-center gap-1 transition-all ${isActive ? "text-purple-400" : "text-gray-500 hover:text-white"}`}
              >
                <IconSelector icon={item.icon} className="w-5 h-5" />
                <span className="text-[10px] uppercase">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
