import Link from "next/link";
import Image from "next/image";
import { SOCIALS, SITE } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-custom bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                <Image
                  src="/logo.png"
                  alt="VettedFrames Logo"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="font-display font-bold text-xl text-brand-light">Vetted</span>
                <span className="text-xl text-white" style={{ fontFamily: 'Blosta Script, cursive', fontSize: '1.4rem' }}>Frames</span>
              </div>
            </Link>
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
              className="text-text-secondary hover:text-brand-light hover:shadow-[0_0_10px_rgba(139,92,246,0.2)] px-2 py-1 rounded-[4px] text-sm font-sans transition-all duration-200"
            >
              Instagram
            </a>
            <a
              href={SOCIALS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-brand-light hover:shadow-[0_0_10px_rgba(139,92,246,0.2)] px-2 py-1 rounded-[4px] text-sm font-sans transition-all duration-200"
            >
              YouTube
            </a>
            <a
              href={SOCIALS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-brand-light hover:shadow-[0_0_10px_rgba(139,92,246,0.2)] px-2 py-1 rounded-[4px] text-sm font-sans transition-all duration-200"
            >
              Twitter
            </a>
            <a
              href={`mailto:${SOCIALS.email}`}
              className="text-text-secondary hover:text-brand-light hover:shadow-[0_0_10px_rgba(139,92,246,0.2)] px-2 py-1 rounded-[4px] text-sm font-sans transition-all duration-200"
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
