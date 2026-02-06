"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonAnimation } from "@/lib/motion";
import { ThemeToggle, ThemeToggleCompact } from "./theme-toggle";

const navLinks = [
  { label: "Features", href: "/dashboard" },
  { label: "Solutions", href: "/solutions/operations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Throttled scroll handler using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 z-50 flex h-20 w-full items-center justify-between px-6 transition-all duration-300 lg:px-8 ${scrolled
        ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm dark:shadow-slate-900/20"
        : "bg-white dark:bg-slate-950"
        }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-black dark:text-white">
          <span className="text-primary">S</span>uburban Security
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-base font-normal text-dark dark:text-slate-200 transition-colors hover:text-black dark:hover:text-white"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle */}
          <ThemeToggle />

          <motion.div
            whileHover={buttonAnimation.whileHover}
            whileTap={buttonAnimation.whileTap}
            transition={buttonAnimation.transition}
          >
            <Link
              href="/signin"
              className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-black/20 dark:border-white/20 bg-white dark:bg-slate-900 px-4 py-[10px] text-sm font-medium text-dark dark:text-slate-200 transition-all duration-150 ease-premium hover:border-black dark:hover:border-white hover:bg-background-light dark:hover:bg-slate-800 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Sign In
            </Link>
          </motion.div>
          <motion.div
            whileHover={buttonAnimation.whileHover}
            whileTap={buttonAnimation.whileTap}
            transition={buttonAnimation.transition}
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-black dark:bg-white px-[18px] py-[15px] text-sm font-medium text-white dark:text-black shadow-sm transition-all duration-150 ease-premium hover:rounded-2xl hover:bg-black/90 dark:hover:bg-white/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Let&apos;s Get Started
            </Link>
          </motion.div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle */}
          <ThemeToggleCompact />

          {/* Mobile Menu Toggle */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-1 text-dark dark:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-20 z-30 bg-black/20 dark:bg-black/50 md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Menu */}
            <motion.div
              ref={mobileMenuRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-0 top-20 z-40 w-full overflow-hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg dark:shadow-slate-900/30 md:hidden"
            >
              <nav className="flex flex-col gap-4 px-6 py-6" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="rounded-md px-2 py-1 text-base text-dark dark:text-slate-200 transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 dark:border-slate-800 pt-4">
                  <motion.div
                    whileHover={buttonAnimation.whileHover}
                    whileTap={buttonAnimation.whileTap}
                    transition={buttonAnimation.transition}
                  >
                    <Link
                      href="/signin"
                      onClick={closeMobileMenu}
                      className="flex h-11 items-center justify-center rounded-lg border-[1.5px] border-black/20 dark:border-white/20 bg-white dark:bg-slate-900 px-4 py-[10px] text-sm font-medium text-dark dark:text-slate-200 transition-all duration-150 ease-premium hover:bg-background-light dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={buttonAnimation.whileHover}
                    whileTap={buttonAnimation.whileTap}
                    transition={buttonAnimation.transition}
                  >
                    <Link
                      href="/signup"
                      onClick={closeMobileMenu}
                      className="flex h-11 items-center justify-center rounded-full bg-black dark:bg-white px-[18px] py-[15px] text-center text-sm font-medium text-white dark:text-black shadow-sm transition-all duration-150 ease-premium hover:rounded-2xl hover:bg-black/90 dark:hover:bg-white/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                    >
                      Let&apos;s Get Started
                    </Link>
                  </motion.div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

