"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { FEATURED_PROJECTS, type Project } from "@/lib/projects";
import RotatingWord from "@/components/ui/RotatingWord";
import { ExternalLink } from "lucide-react";
import ProjectThumbnail from "@/components/ui/ProjectThumbnail";

function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative w-full block col-span-1 md:col-span-3 overflow-hidden rounded-[4px] border border-border-custom hover:border-brand/40 hover:shadow-[0_0_30px_rgba(96,37,213,0.2)] transition-all duration-300 cursor-pointer"
    >
      {/* Featured badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-gradient-to-r from-brand to-brand-light text-white font-mono text-xs uppercase px-2 py-1 tracking-widest shadow-[0_0_10px_rgba(96,37,213,0.3)]">
          Featured
        </span>
      </div>

      {/* External link icon */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ExternalLink className="w-4 h-4 text-brand" />
      </div>

      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden" style={{ height: "400px" }}>
        <ProjectThumbnail
          src={project.thumbnail}
          alt={project.title}
          priority
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-brand/10 via-transparent to-transparent" />
      </div>

      {/* Thumbnail overlay for mobile */}
      <div
        className="md:hidden absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"
        style={{ height: "220px" }}
      />

      {/* Content */}
      <div className="p-6 md:p-8 bg-gradient-to-t from-surface via-surface to-transparent">
        <span className="font-mono text-brand text-xs uppercase tracking-widest mb-2 block">
          {project.role}
        </span>
        <h3 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-2 group-hover:text-brand-light transition-colors duration-300">
          {project.title}
        </h3>
        <p className="font-sans text-text-secondary text-sm">
          {project.description}
        </p>
      </div>
    </motion.a>
  );
}

function PortfolioCard({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="group bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated border border-border-custom rounded-[4px] p-4 flex flex-col hover:border-brand/40 hover:shadow-[0_0_25px_rgba(96,37,213,0.15)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 cursor-pointer"
    >
      {/* Thumbnail with overlay */}
      <div className="relative w-full aspect-video rounded-[4px] overflow-hidden mb-4 bg-bg">
        <ProjectThumbnail src={project.thumbnail} alt={project.title} className="transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ExternalLink className="w-4 h-4 text-brand" />
        </div>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-brand/10 via-transparent to-transparent" />
      </div>

      {/* Role tag */}
      <span className="font-mono text-brand text-xs uppercase tracking-widest mb-2">
        {project.role}
      </span>

      {/* Client name */}
      <h3 className="font-display text-text-primary text-base font-medium mb-1.5 group-hover:text-brand-light transition-colors duration-300">
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-text-secondary text-sm leading-relaxed flex-1">
        {project.description}
      </p>
    </motion.a>
  );
}

export default function PortfolioSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  // Only show the 5 specified featured projects
  const FEATURED_IDS = [
    "showreel-2025",
    "abhishek-kar",
    "before-after",
    "talking-head",
    "saas-animation-16x9",
  ];
  const featuredProjects = FEATURED_PROJECTS.filter((p) =>
    FEATURED_IDS.includes(p.id)
  ).slice(0, 5);

  const [featured, ...rest] = featuredProjects;

  return (
    <section className="w-full bg-gradient-to-b from-surface via-bg to-surface py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-gradient-radial from-brand/5 to-transparent blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[250px] bg-gradient-radial from-brand/5 to-transparent blur-[80px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="font-mono text-brand uppercase tracking-widest text-xs mb-3">
            Selected Projects
          </p>
          <h2 className="font-display font-bold text-3xl text-text-primary">
            <RotatingWord words={["perform", "convert", "retain", "land"]} className="text-brand-light" />
          </h2>
        </div>

        {/* Portfolio grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Featured card (full width) */}
          <FeaturedCard project={featured} />

          {/* Rest of featured projects in 3-column grid */}
          {rest.map((project, i) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
