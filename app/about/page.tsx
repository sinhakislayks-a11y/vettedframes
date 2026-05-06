"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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

// Story content
const STORY_BLOCKS = [
  {
    eyebrow: "The agency years",
    title: "Speed without compromise",
    content: "I worked in an influencer marketing agency handling high-volume creator content — reels, podcasts, YouTube videos. Finance creators, lifestyle creators, tech creators. The pace was relentless and the standards were high. That environment taught me how to think fast and deliver faster, without letting quality slip."
  },
  {
    eyebrow: "What stayed",
    title: "The instinct for retention",
    content: "Working at that speed, you develop something more valuable than speed itself — an instinct for what holds attention and what loses it. I learned to feel when pacing is off, when a cut breaks flow, when the hook dies before it starts. That's not something you learn. It's something you earn."
  }
];

// Philosophy content
const PRINCIPLES = [
  { title: "Rhythm, not just cuts", description: "Editing is musical. Every cut is a beat. Every transition is a breath. The best edits feel inevitable." },
  { title: "Invisible but intentional", description: "Good editing is invisible. That's the goal. Not flashy transitions. Just clean, purposeful choices." },
  { title: "Retention is not a hack", description: "Retention comes from clarity — knowing what you're saying, knowing who you're saying it to." },
  { title: "Feel matters as much as metrics", description: "A video that gets clicks but feels hollow? That's not a win. I want things that work AND feel right." }
];

// Why creators content
const REASONS = [
  { title: "Speed", description: "Creator content moves fast. Trends shift weekly. You need someone who can match that pace without dropping quality." },
  { title: "Psychology", description: "Retention isn't about filters. It's about understanding audience psychology — what makes them stop, what makes them stay." },
  { title: "Storytelling", description: "Creators are their own brands. The edit has to feel personal." },
  { title: "Trust", description: "Long-term creator content is built on consistency. I'm playing a long game too." }
];

// Approach content
const PILLARS = [
  { number: "01", title: "Clarity", description: "Every project starts with understanding — not just what you want to make, but why. Clear brief, clear direction." },
  { number: "02", title: "Collaboration", description: "I'm not a remote freelancer you hand footage to. I'm a creative partner who engages with the process." },
  { number: "03", title: "Speed", description: "I know creator timelines. Fast doesn't mean sloppy — it means efficient decisions." }
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
  const [expandedPrinciples, setExpandedPrinciples] = useState<number | null>(null);
  const [expandedReasons, setExpandedReasons] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-20 overflow-hidden bg-[#080a0c]">
      {/* Scanline background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.1) 3px, rgba(255, 255, 255, 0.1) 4px)` }} />

      {/* Hero Section */}
      <section className="relative pt-8 px-6 lg:px-12 flex flex-col">
        <div className="flex justify-between gap-8 items-start">
          {/* Left Vertical Label - Desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-end pb-8"
          >
            <span className="text-[11px] tracking-[0.3em] text-gray-500 uppercase font-medium" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              Storyteller / Post-Production / Video Editor
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 pt-8 lg:pt-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter uppercase font-bold" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
              The Agency<br />Years
            </h1>
          </motion.div>

          {/* Hero Portrait - Desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block w-1/3 lg:w-1/4 aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800"
          >
            <img alt="Portrait" className="w-full h-full object-cover grayscale" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <div className="relative mt-12 py-16 px-6 lg:px-12">
        <div className="flex flex-col gap-12 max-w-6xl">
          {STORY_BLOCKS.map((block, index) => (
            <Section key={block.eyebrow} delay={index * 0.1}>
              <span className="font-mono text-purple-400 text-[10px] uppercase tracking-widest">{block.eyebrow}</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 mb-3">{block.title}</h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl">{block.content}</p>
            </Section>
          ))}
        </div>
      </div>

      {/* Quote */}
      <Section className="px-6 lg:px-12 text-center mb-16" delay={0.2}>
        <p className="text-lg md:text-xl text-gray-300 italic leading-relaxed max-w-3xl mx-auto">
          {`"But I don&apos;t see editing as execution. I see it as the invisible architecture that controls how content feels."`}
        </p>
      </Section>

      {/* Philosophy Section */}
      <Section className="px-6 lg:px-12 mb-16 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-purple-500" />
          <span className="text-gray-500 text-[10px] uppercase tracking-widest">Perspective</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">How I think about editing</h2>
        <p className="text-sm md:text-base text-gray-400 mb-6">Not just the technical execution. The philosophy behind it.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.title}
              whileHover={{ scale: 1.02 }}
              onClick={() => setExpandedPrinciples(expandedPrinciples === index ? null : index)}
              className="rounded-xl p-5 cursor-pointer transition-all"
              style={{
                background: expandedPrinciples === index ? "rgba(168, 85, 247, 0.1)" : "#12141a",
                border: expandedPrinciples === index ? "1px solid rgba(168, 85, 247, 0.3)" : "1px solid #1f2229"
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-purple-400/30 text-xl font-bold">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-bold text-white">{principle.title}</span>
                </div>
                <motion.span animate={{ rotate: expandedPrinciples === index ? 180 : 0 }} className="text-purple-400">
                  ▼
                </motion.span>
              </div>
              {expandedPrinciples === index && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-sm text-gray-400 mt-3 pl-8">
                  {principle.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why Creators Section */}
      <Section className="px-6 lg:px-12 mb-16 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-purple-500" />
          <span className="text-gray-500 text-[10px] uppercase tracking-widest">Why creators</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Creator content sits at the intersection of four things</h2>
        <p className="text-sm md:text-base text-gray-400 mb-6 max-w-2xl">Speed, psychology, storytelling, and audience trust. Most editors are strong in one or two. I&apos;ve developed fluency across all four.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason.title}
              whileHover={{ scale: 1.02 }}
              onClick={() => setExpandedReasons(expandedReasons === index ? null : index)}
              className="rounded-xl p-5 cursor-pointer transition-all"
              style={{
                background: expandedReasons === index ? "rgba(168, 85, 247, 0.1)" : "#12141a",
                border: expandedReasons === index ? "1px solid rgba(168, 85, 247, 0.3)" : "1px solid #1f2229"
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="font-bold text-white">{reason.title}</span>
              </div>
              {expandedReasons === index && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-sm text-gray-400 mt-3 pl-5">
                  {reason.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Approach Section */}
      <Section className="px-6 lg:px-12 mb-16 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-purple-500" />
          <span className="text-gray-500 text-[10px] uppercase tracking-widest">How I work</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8">Not a freelancer. Not an agency.</h2>

        <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="aspect-square rounded-xl p-4 flex flex-col items-center justify-center text-center"
              style={{
                background: pillar.number === "02" ? "linear-gradient(145deg, #1f1a2e, #12141a)" : "linear-gradient(145deg, #12141a, #0a0c10)",
                border: pillar.number === "02" ? "1px solid #632dc9" : "1px solid #1f2229",
                boxShadow: pillar.number === "02" ? "0 0 35px 5px rgba(99, 45, 201, 0.5)" : "none"
              }}
            >
              <span className="text-3xl md:text-4xl font-bold text-purple-500/30" style={{ fontFamily: "'Oswald', sans-serif" }}>{pillar.number}</span>
              <span className="text-[10px] md:text-xs font-bold text-white mt-2 uppercase leading-tight">{pillar.title}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 italic mb-6 max-w-xl">
          {`If you&apos;re building something that matters and want someone who understands the craft behind the content — let&apos;s talk.`}
        </p>
      </Section>

      {/* CTA Button */}
      <Section className="px-6 lg:px-12 mb-8" delay={0.3}>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 py-5 px-8 rounded-xl text-lg font-medium transition-colors"
          style={{ background: "linear-gradient(135deg, #501cd4, #632dc9)", boxShadow: "0 0 30px rgba(99, 45, 201, 0.4)" }}
        >
          Start a project
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </Section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 px-4 pt-3 pb-6" style={{ backgroundColor: "rgba(13, 15, 19, 0.95)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="flex justify-between items-center max-w-md mx-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === "workflow";
            return (
              <Link key={item.id} href={item.id === "workflow" ? "/workflow" : `/${item.id}`} className={`flex flex-col items-center gap-1 transition-opacity ${isActive ? "opacity-100" : "opacity-50 hover:opacity-100"}`}>
                <IconSelector icon={item.icon} className="w-5 h-5 text-white" />
                <span className="text-[10px] text-white uppercase">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}