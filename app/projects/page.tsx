"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_PROJECTS, PROJECTS_BY_CATEGORY, type Project } from "@/lib/projects";
import { ExternalLink } from "lucide-react";
import ProjectThumbnail from "@/components/ui/ProjectThumbnail";

const CATEGORIES = [
  "All",
  "YouTube Edits",
  "Reels & Short-form",
  "Motion Graphics",
  "Animation",
  "Cinematography & Color",
] as const;

type Category = (typeof CATEGORIES)[number];

// Map category labels to project categories
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

function PortfolioCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="group bg-surface-elevated border border-border-custom rounded-[4px] p-4 flex flex-col hover:border-brand/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      {/* Thumbnail with overlay */}
      <div className="relative w-full aspect-video rounded-[4px] overflow-hidden mb-4 bg-bg">
        <ProjectThumbnail src={project.thumbnail} alt={project.title} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <ExternalLink className="w-4 h-4 text-brand" />
        </div>
      </div>

      {/* Role tag */}
      <span className="font-mono text-brand text-xs uppercase tracking-widest mb-2">
        {project.role}
      </span>

      {/* Client name */}
      <h3 className="font-display text-text-primary text-base font-medium mb-1.5">
        {project.title}
      </h3>

      {/* Description */}
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative w-full h-64 md:h-80 rounded-[4px] overflow-hidden mb-12 bg-gradient-to-br from-purple-900/60 to-violet-950/60 border border-border-custom hover:border-brand/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 cursor-pointer"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Play indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
          <ExternalLink className="w-6 h-6 text-brand-light" />
        </div>
      </div>

      {/* Content */}
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

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  // Get showreel (first featured project)
  const showreel = ALL_PROJECTS.find((p) => p.id === "showreel-2025");

  // Filter items for grid (exclude showreel)
  const gridProjects = ALL_PROJECTS.filter((p) => p.id !== "showreel-2025");

  const filteredProjects =
    activeFilter === "All"
      ? gridProjects
      : gridProjects.filter((p) => {
          const cat = getProjectCategory(activeFilter);
          return cat ? p.category === cat : true;
        });

  return (
    <main className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-bg">
        <div className="mx-auto max-w-6xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-brand uppercase tracking-widest text-xs mb-4"
          >
            All work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display font-semibold text-4xl md:text-5xl text-text-primary tracking-tight"
          >
            Every project. Every category.
          </motion.h1>
        </div>
      </section>

      {/* Filter Bar */}
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

      {/* Showreel - only show when "All" is selected */}
      {activeFilter === "All" && showreel && <ShowreelCard project={showreel} />}

      {/* Projects Grid */}
      <section id="youtube" id="reels" id="motion" id="animation" id="ai" className="flex-1 bg-bg py-16">
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

          {/* Empty state */}
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
  );
}