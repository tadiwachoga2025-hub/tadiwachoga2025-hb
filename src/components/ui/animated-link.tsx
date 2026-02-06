"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { buttonAnimation } from "@/lib/motion";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

/**
 * A Link component wrapped with Framer Motion animations.
 * Provides consistent hover (scale 1.02) and tap (scale 0.98) effects
 * with smooth spring transitions for button-styled links.
 */
export function AnimatedLink({
  href,
  children,
  className,
  onClick,
  ...props
}: AnimatedLinkProps) {
  return (
    <motion.div
      whileHover={buttonAnimation.whileHover}
      whileTap={buttonAnimation.whileTap}
      transition={buttonAnimation.transition}
    >
      <Link href={href} className={className} onClick={onClick} {...props}>
        {children}
      </Link>
    </motion.div>
  );
}

/**
 * An inline animated link that works as a single element (no wrapper div).
 * Uses motion.a for direct styling control.
 */
export function AnimatedLinkInline({
  href,
  children,
  className,
  onClick,
  ...props
}: AnimatedLinkProps) {
  return (
    <Link href={href} legacyBehavior passHref>
      <motion.a
        whileHover={buttonAnimation.whileHover}
        whileTap={buttonAnimation.whileTap}
        transition={buttonAnimation.transition}
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.a>
    </Link>
  );
}
