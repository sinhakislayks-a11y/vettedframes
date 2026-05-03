"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_PROJECTS, type Project } from "@/lib/projects";
import { ExternalLink, Play, Film, Sparkles } from "lucide-react";
import ProjectThumbnail from "@/components/ui/ProjectThumbnail";
import PageBackground from "@/components/ui/PageBackground";
import { track } from "@vercel/analytics/react";
import { ImageTrail } from "@/components/ui/image-trail";
import { useIsMobile } from "@/hooks/useIsMobile";

const CATEGORIES = [
  "All",
  "YouTube Edits",
  "Reels & Short-form",
  "Motion Graphics",
  "Animation",
  "Cinematography & Color",
] as const;

type Category = (typeof CATEGORIES)[number];

const getProjectCategory = (label: Category): Project["category"] | null => {
  switch (label) {
    case "YouTube Edits":
      return "youtube";
    case "Reels & Short-form":
      return "reels";
    case "Motion Graphics":
      return "motion";
    case "Animation":
      return "animation";
    case "Cinematography & Color":
      return "color";
    default:
      return null;
  }
};

// Trail icons - video/film themed
const TRAIL_ICONS = [
  { icon: Play, label: "Play" },
  { icon: Film, label: "Film" },
  { icon: Sparkles, label: "Sparkles" },
];

// Stats for hero
const STATS = [
  { value: "50+", label: "Projects" },
  { value: "5", label: "Categories" },
  { value: "3+", label: "Years" },
];

function PortfolioCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("project_click", { id: project.id })}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="group bg-surface-elevated border border-border-custom rounded-[4px] p-4 flex flex-col hover:border-brand/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div className="relative w-full aspect-video rounded-[4px] overflow-hidden mb-4 bg-bg">
        <ProjectThumbnail src={project.thumbnail} alt={project.title} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <ExternalLink className="w-4 h-4 text-brand" />
        </div>
      </div>

      <span className="font-mono text-brand text-xs uppercase tracking-widest mb-2">
        {project.role}
      </span>

      <h3 className="font-display text-text-primary text-base font-medium mb-1.5">
        {project.title}
      </h3>

      <p className="font-sans text-text-secondary text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>
    </motion.a>
  );
}

function ShowreelCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("project_click", { id: project.id })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative w-full h-64 md:h-80 rounded-[4px] overflow-hidden mb-12 bg-gradient-to-br from-purple-900/60 to-violet-950/60 border border-border-custom hover:border-brand/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 cursor-pointer"
    >
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
          <ExternalLink className="w-6 h-6 text-brand-light" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent">
        <span className="font-mono text-brand-light text-xs uppercase tracking-widest mb-2 block">
          Featured Work
        </span>
        <h3 className="font-display font-semibold text-2xl md:text-3xl text-white mb-2">
          {project.title}
        </h3>
        <p className="font-sans text-text-secondary text-sm">
          {project.role}
        </p>
      </div>
    </motion.a>
  );
}

// Floating geometric elements for hero
function FloatingIcon({ type, className, delay = 0 }: { type: "play" | "film" | "sparkle"; className: string; delay?: number }) {
  const icons = {
    play: <Play className="w-6 h-6" />,
    film: <Film className="w-6 h-6" />,
    sparkle: <Sparkles className="w-6 h-6" />,
  };

  return (
    <motion.div
      className={`absolute pointer-events-none text-brand/20 hidden md:block ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, 0, -5, 0],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {icons[type]}
    </motion.div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get trail content - use small thumbnails
  const trailContent = useMemo(() => {
    const thumbnails = ALL_PROJECTS.slice(0, 8).map((p) => p.thumbnail);
    return thumbnails.map((thumb, i) => (
      <div
        key={i}
        className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-brand/30 shadow-[0_0_20px_rgba(96,37,213,0.3)]"
      >
        <img
          src={thumb}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    ));
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-16 overflow-hidden">
      {/* Large background text - desktop only */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="font-display text-[18vw] font-bold text-brand/[0.03] whitespace-nowrap drop-shadow-[0_0_40px_rgba(96,37,213,0.1)]">
          WORK
        </span>
      </motion.div>

      {/* Floating decorative icons */}
      <FloatingIcon type="play" className="top-[20%] left-[8%]" delay={0} />
      <FloatingIcon type="film" className="top-[30%] right-[12%]" delay={1} />
      <FloatingIcon type="sparkle" className="bottom-[25%] left-[15%]" delay={2} />
      <FloatingIcon type="play" className="bottom-[35%] right-[8%]" delay={0.5} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,37,213,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,37,213,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-brand/[0.05] to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-brand-light/[0.04] to-transparent blur-[100px] pointer-events-none" />

      {/* ImageTrail container - desktop only */}
      {!isMobile && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
        >
          <ImageTrail containerRef={containerRef} interval={150}>
            {trailContent}
          </ImageTrail>
        </div>
      )}

      <div className="relative z-20 mx-auto max-w-6xl px-6">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-8 md:gap-12 mb-8"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="font-mono text-brand text-2xl md:text-3xl font-bold"
              >
                {stat.value}
              </motion.span>
              <span className="font-sans text-text-secondary text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Main heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-mono text-brand uppercase tracking-widest text-xs mb-4"
        >
          All work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-6"
        >
          Every project.
          <br />
          <span className="bg-gradient-to-r from-brand via-brand-light to-purple-400 bg-clip-text text-transparent">
            Every category.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="font-sans text-text-secondary text-base md:text-lg max-w-xl"
        >
          From YouTube long-form to Instagram reels, motion graphics to cinematic color grading —
          explore {ALL_PROJECTS.length} projects across {CATEGORIES.length - 1} categories.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex items-center gap-3 text-text-secondary/40"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-brand/40 to-transparent"
          />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const showreel = ALL_PROJECTS.find((p) => p.id === "showreel-2025");
  const gridProjects = ALL_PROJECTS.filter((p) => p.id !== "showreel-2025");

  const filteredProjects =
    activeFilter === "All"
      ? gridProjects
      : gridProjects.filter((p) => {
          const cat = getProjectCategory(activeFilter);
          return cat ? p.category === cat : true;
        });

  return (
    <PageBackground variant="diagonal-stripes" mask="fade-edges" size={24}>
      <main className="flex flex-col min-h-screen">
        <HeroSection />

        <section id="motion" className="sticky top-14 z-40 bg-bg-secondary/80 backdrop-blur-md border-b border-border-custom py-4">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-[4px] text-sm font-sans transition-all duration-200 cursor-pointer ${
                    activeFilter === category
                      ? "bg-brand text-bg shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                      : "bg-surface border border-border-custom text-text-secondary hover:text-text-primary hover:border-brand/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {activeFilter === "All" && showreel && <ShowreelCard project={showreel} />}

        <section id="projects" className="flex-1 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project) => (
                  <PortfolioCard key={project.id} project={project} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="font-sans text-text-secondary">
                  No projects in this category yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </PageBackground>
  );
}
