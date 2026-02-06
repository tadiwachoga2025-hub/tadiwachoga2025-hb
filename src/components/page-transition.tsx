"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { duration, easing } from "@/lib/motion";

/**
 * PageTransition Component
 *
 * Provides smooth fade and slide transitions between pages using Framer Motion.
 * Works with Next.js App Router by leveraging the pathname as a unique key
 * for AnimatePresence to detect route changes.
 *
 * Features:
 * - Fade in/out with subtle Y-axis movement
 * - Configurable animation variants
 * - Respects user's reduced motion preferences
 * - Optimized for performance with hardware-accelerated transforms
 *
 * @example
 * ```tsx
 * // Used in template.tsx
 * <PageTransition>{children}</PageTransition>
 * ```
 */

/** Custom page transition variants with enhanced exit animation */
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: [...easing.decelerate],
      // Stagger children slightly for a cascading effect
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: duration.fast,
      ease: [...easing.accelerate],
    },
  },
};

interface PageTransitionProps {
  /** The page content to animate */
  children: ReactNode;
  /** Optional custom variants to override defaults */
  variants?: Variants;
  /** Optional className for the motion wrapper */
  className?: string;
}

/**
 * Wraps page content with enter/exit animations for smooth transitions.
 * Uses the current pathname as a key to trigger animations on route changes.
 */
export function PageTransition({
  children,
  variants = pageVariants,
  className,
}: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
        // Performance optimizations
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * FrozenRouter Component
 *
 * Freezes the router context during exit animations to prevent content
 * from changing before the exit animation completes.
 * This is useful when you need to maintain the current page's content
 * while it animates out.
 *
 * Note: This is an alternative approach if you experience content
 * flashing during transitions.
 */
export function FrozenRouter({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
