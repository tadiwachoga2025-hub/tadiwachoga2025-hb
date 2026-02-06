// Centralized motion configuration for consistent animations
// This ensures all animations use the same timing and easing values

// Timing constants (in seconds)
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

// Easing curves
export const easing = {
  // Standard easing for most animations
  standard: [0.4, 0.0, 0.2, 1],
  // Decelerate - elements entering the screen
  decelerate: [0.0, 0.0, 0.2, 1],
  // Accelerate - elements leaving the screen
  accelerate: [0.4, 0.0, 1, 1],
  // Spring physics for interactive elements
  spring: { type: "spring" as const, stiffness: 400, damping: 25 },
  // Smooth for hover effects
  smooth: "easeOut" as const,
} as const;

// Reusable animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.decelerate },
  },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.fast },
  },
} as const;

export const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slower, ease: easing.smooth },
  },
} as const;

export const fadeRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slower, ease: easing.smooth },
  },
} as const;

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing.decelerate },
  },
} as const;

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.decelerate },
  },
} as const;

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.decelerate },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: duration.fast, ease: easing.accelerate },
  },
} as const;

// Alternative page transitions for different effects
export const pageFade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast },
  },
} as const;

export const pageSlideLeft = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: easing.decelerate },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: duration.fast, ease: easing.accelerate },
  },
} as const;

export const pageSlideRight = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: easing.decelerate },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: duration.fast, ease: easing.accelerate },
  },
} as const;

export const pageScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing.decelerate },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: { duration: duration.fast, ease: easing.accelerate },
  },
} as const;

// Button hover/tap animations
export const buttonAnimation = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: easing.spring,
} as const;

// Card hover animation
export const cardHover = {
  whileHover: {
    y: -8,
    transition: { duration: duration.normal, ease: easing.smooth },
  },
} as const;

// Shake animation for form errors
export const shakeAnimation = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
} as const;

// Viewport settings for scroll animations
export const viewportOnce = { once: true, margin: "-50px" } as const;
export const viewportAlways = { once: false, margin: "-50px" } as const;

// Hero-specific animations
export const heroTextReveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slower, ease: easing.decelerate },
  },
} as const;

export const heroStaggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const;

export const wordReveal = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: duration.slow,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
} as const;

export const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
} as const;

export const pulseGlow = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
} as const;

export const shimmer = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
} as const;

export const counterAnimation = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.8,
    },
  },
} as const;

export const glowPulse = {
  initial: {
    opacity: 0.4,
    boxShadow: "0 0 20px 10px rgba(255, 195, 0, 0.3)",
  },
  animate: {
    opacity: [0.4, 0.8, 0.4],
    boxShadow: [
      "0 0 20px 10px rgba(255, 195, 0, 0.3)",
      "0 0 40px 20px rgba(255, 195, 0, 0.5)",
      "0 0 20px 10px rgba(255, 195, 0, 0.3)",
    ],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
} as const;

// Premium button with glow effect
export const premiumButtonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.2, ease: easing.decelerate },
  },
  tap: { scale: 0.97 },
} as const;

// Live indicator pulse
export const livePulse = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
} as const;

// Background grid animation
export const gridFade = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 0.1,
    pathLength: 1,
    transition: { duration: 2, ease: "easeOut" },
  },
} as const;
