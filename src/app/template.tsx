"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { duration, easing } from "@/lib/motion";

/**
 * Template Component for Page Transitions
 *
 * Next.js template.tsx wraps each page and re-renders on navigation,
 * making it ideal for page transitions. Unlike layout.tsx which persists
 * across navigations, template.tsx creates a new instance for each page.
 *
 * Benefits:
 * - Automatic animation on every route change
 * - No need for key management - template handles it
 * - Works seamlessly with Next.js App Router
 * - Maintains scroll position correctly
 *
 * Animation details:
 * - Enter: Fade in + slide up from y: 20px
 * - Exit: Handled by template re-creation
 * - Duration: 0.3s with decelerate easing
 */

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.decelerate,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: duration.fast,
      ease: easing.accelerate,
    },
  },
} as const;

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // Ensure smooth hardware-accelerated animations
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
