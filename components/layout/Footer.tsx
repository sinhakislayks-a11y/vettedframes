import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { SOCIALS, SITE, NAV_LINKS } from "@/lib/constants";
import { KeywordButton } from "@/components/ui/keyword-button";

// Custom social icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
      <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

// Footer link data
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Workflow", href: "/workflow" },
];

const serviceLinks = [
  { label: "YouTube Edits", href: "/projects#youtube" },
  { label: "Reels & Short-form", href: "/projects#reels" },
  { label: "Motion Graphics", href: "/projects#motion" },
  { label: "Animation", href: "/projects#animation" },
];

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: SOCIALS.instagram },
  { icon: YouTubeIcon, label: "YouTube", href: SOCIALS.youtube },
  { icon: TwitterIcon, label: "Twitter", href: SOCIALS.twitter },
  { icon: Mail, label: "Email", href: `mailto:${SOCIALS.email}` },
];

const contactInfo = [
  { icon: Mail, text: SOCIALS.email, href: `mailto:${SOCIALS.email}` },
  { icon: MapPin, text: "India", isAddress: true },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-border-custom bg-bg-secondary">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-gradient-radial from-brand/[0.08] to-transparent blur-[100px]" />
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-gradient-radial from-brand-light/[0.05] to-transparent blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & About */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-6 flex items-center gap-3">
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
                <span className="text-xl text-text-primary" style={{ fontFamily: 'Blosta Script, cursive', fontSize: '1.4rem' }}>Frames</span>
              </div>
            </Link>

            <p className="mb-6 max-w-xs text-center text-sm leading-relaxed text-text-secondary md:text-left">
              {SITE.tagline}
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-custom text-text-secondary transition-all duration-200 hover:border-brand hover:text-brand-light hover:shadow-[0_0_15px_rgba(96,37,213,0.3)]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-brand-light">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1 text-sm text-text-secondary transition-colors duration-200 hover:text-brand-light"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="text-center md:text-left">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-brand-light">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1 text-sm text-text-secondary transition-colors duration-200 hover:text-brand-light"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="text-center md:text-left">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-brand-light">
              Contact
            </h3>
            <ul className="space-y-4">
              {contactInfo.map(({ icon: Icon, text, href, isAddress }) => (
                <li key={text}>
                  <a
                    href={href || "#"}
                    className="flex items-center justify-center gap-2 text-sm text-text-secondary transition-colors duration-200 hover:text-brand-light md:justify-start"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-brand" />
                    <span>{text}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-6">
              <KeywordButton
                label="Start a project"
                tooltip="Let's talk about your next video."
              />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border-custom to-transparent" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-xs text-text-secondary">
            © {currentYear} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-text-secondary transition-colors duration-200 hover:text-brand-light">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-text-secondary transition-colors duration-200 hover:text-brand-light">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
