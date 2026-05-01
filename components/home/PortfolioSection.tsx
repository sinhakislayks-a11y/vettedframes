"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { FEATURED_PROJECTS, type Project } from "@/lib/projects";
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
      className="group relative w-full block col-span-1 md:col-span-3 overflow-hidden rounded-[4px] border border-border-custom hover:border-brand/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-200 cursor-pointer"
    >
      {/* Featured badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-brand text-bg font-mono text-xs uppercase px-2 py-1 tracking-widest">
          Featured
        </span>
      </div>

      {/* External link icon */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <ExternalLink className="w-4 h-4 text-brand" />
      </div>

      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden" style={{ height: "400px" }}>
        <ProjectThumbnail
          src={project.thumbnail}
          alt={project.title}
          priority
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
      </div>

      {/* Thumbnail overlay for mobile */}
      <div
        className="md:hidden absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200"
        style={{ height: "220px" }}
      />

      {/* Content */}
      <div className="p-6 md:p-8">
        <span className="font-mono text-brand text-xs uppercase tracking-widest mb-2 block">
          {project.role}
        </span>
        <h3 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-2">
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
      <p className="font-sans text-text-secondary text-sm leading-relaxed flex-1">
        {project.description}
      </p>
    </motion.a>
  );
}

export default function PortfolioSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  const [featured, ...rest] = FEATURED_PROJECTS;

  return (
    <section className="w-full bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="font-mono text-brand uppercase tracking-widest text-xs mb-3">
            Selected Projects
          </p>
          <h2 className="font-display font-bold text-3xl text-text-primary">
            Work that speaks.
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
