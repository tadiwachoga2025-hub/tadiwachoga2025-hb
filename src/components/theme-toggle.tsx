"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Theme Toggle Component
 *
 * An animated toggle button for switching between light and dark themes.
 * Features:
 * - Smooth spring animation when toggling
 * - Accessible with proper ARIA labels
 * - Prevents hydration mismatch with mounted state
 * - Keyboard accessible (Enter/Space)
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch - only render after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  // Show placeholder during SSR to prevent layout shift
  if (!mounted) {
    return (
      <div
        className="relative flex h-10 w-10 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="absolute"
          >
            <Moon
              size={20}
              className="text-yellow-400"
              aria-hidden="true"
            />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -90 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="absolute"
          >
            <Sun
              size={20}
              className="text-amber-500"
              aria-hidden="true"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * Compact Theme Toggle Component
 *
 * A smaller version of the theme toggle for use in tight spaces.
 */
export function ThemeToggleCompact() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return <div className="h-8 w-8 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Moon size={18} className="text-yellow-400" aria-hidden="true" />
      ) : (
        <Sun size={18} className="text-amber-500" aria-hidden="true" />
      )}
    </button>
  );
}
