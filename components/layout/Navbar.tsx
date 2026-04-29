"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Opens YouTube search — simple, no backend needed
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery + " video editing")}`,
        "_blank"
      );
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border-custom/50 bg-bg-secondary/80 backdrop-blur-md py-3"
            : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="font-display text-lg font-semibold text-text-primary tracking-tight">
            Vetted<span className="text-brand">Frames</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-sans transition-colors duration-200 relative group",
                  pathname === link.href
                    ? "text-brand-light"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-light/60 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                )}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full bg-brand/40 transition-all duration-200" />
              </Link>
            ))}

            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/contact"
              className="bg-gradient-to-r from-brand to-brand-dark text-white text-sm font-medium font-sans px-4 py-1.5 rounded-[4px] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:brightness-110 transition-all duration-200"
            >
              Start a project
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1 p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "block h-px w-5 bg-text-primary transition-transform duration-200",
                  mobileOpen && "translate-y-[5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 bg-text-primary transition-opacity duration-200",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 bg-text-primary transition-transform duration-200",
                  mobileOpen && "-translate-y-[5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border-custom/50 bg-bg/95 backdrop-blur-md"
            >
              <div className="mx-auto max-w-6xl px-6 py-3">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search video ideas, tutorials..."
                    className="w-full bg-surface border border-border-custom rounded-[4px] pl-10 pr-10 py-2.5 text-sm font-sans text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-brand"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-14 z-40 overflow-hidden border-t border-border-custom/50 bg-bg/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm font-sans transition-colors",
                    pathname === link.href
                      ? "text-text-primary"
                      : "text-text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="bg-gradient-to-r from-brand to-brand-dark text-white text-sm font-medium font-sans px-4 py-2 rounded-[4px] text-center mt-2 hover:shadow-[0_0_15px_rgba(139,92,246,0.35)] transition-all duration-200"
              >
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
