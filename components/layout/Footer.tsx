import Link from "next/link";
import { SOCIALS, SITE } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-custom bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display text-lg font-semibold text-text-primary tracking-tight">
              Vetted<span className="text-brand"> Frames</span>
            </span>
            <p className="text-text-secondary text-sm font-sans">
              {SITE.tagline}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-brand text-sm font-sans transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href={SOCIALS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-brand text-sm font-sans transition-colors duration-200"
            >
              YouTube
            </a>
            <a
              href={SOCIALS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-brand text-sm font-sans transition-colors duration-200"
            >
              Twitter
            </a>
            <a
              href={`mailto:${SOCIALS.email}`}
              className="text-text-secondary hover:text-brand text-sm font-sans transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>

        {/* Separator + copyright */}
        <div className="mt-10 pt-6 border-t border-border-custom">
          <p className="text-center text-text-secondary text-xs font-sans">
            © {currentYear} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
