"use client";

import { forwardRef, ReactNode, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonAnimation } from "@/lib/motion";

interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

/**
 * A button component with Framer Motion hover and tap animations.
 * Provides consistent scale effects with smooth spring transitions.
 */
export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "rounded-lg bg-black text-white shadow-sm hover:bg-black/90 hover:shadow-md",
      secondary:
        "rounded-lg bg-primary text-black shadow-sm hover:bg-primary/90 hover:shadow-md",
      outline:
        "rounded-lg border-[1.5px] border-black/20 bg-white text-dark hover:border-black hover:bg-background-light",
      ghost: "rounded-lg text-dark hover:bg-dark/5",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base py-3.5",
    };

    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        whileHover={!isDisabled ? buttonAnimation.whileHover : undefined}
        whileTap={!isDisabled ? buttonAnimation.whileTap : undefined}
        transition={buttonAnimation.transition}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && (
          <Loader2
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
