import { SOCIALS } from "@/lib/constants";
import { Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
          Get In Touch
        </p>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
          Let&apos;s make something<br />
          <span className="text-brand">worth watching.</span>
        </h1>
        <p className="font-sans text-text-secondary text-base max-w-md">
          Have footage that needs editing? A brand video concept? Or just want to chat about your content strategy? Drop me a line.
        </p>
      </div>

      {/* Email */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-[4px] bg-brand-dim flex items-center justify-center flex-shrink-0">
          <Mail className="w-4 h-4 text-brand" />
        </div>
        <div>
          <p className="font-sans text-xs text-text-secondary mb-0.5">Email</p>
          <a
            href={`mailto:${SOCIALS.email}`}
            className="font-sans text-sm text-text-primary hover:text-brand transition-colors"
          >
            {SOCIALS.email}
          </a>
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-[4px] bg-brand-dim flex items-center justify-center flex-shrink-0">
          <Clock className="w-4 h-4 text-brand" />
        </div>
        <div>
          <p className="font-sans text-xs text-text-secondary mb-0.5">Availability</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-[4px] bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-[4px] h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-sans text-sm text-text-primary">
              Currently taking projects
            </span>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="flex items-center gap-4 pt-2">
        <a
          href={SOCIALS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-text-secondary hover:text-brand transition-colors uppercase tracking-wider"
        >
          Instagram
        </a>
        <span className="text-border-custom">·</span>
        <a
          href={SOCIALS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-text-secondary hover:text-brand transition-colors uppercase tracking-wider"
        >
          YouTube
        </a>
        <span className="text-border-custom">·</span>
        <a
          href={SOCIALS.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-text-secondary hover:text-brand transition-colors uppercase tracking-wider"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}
