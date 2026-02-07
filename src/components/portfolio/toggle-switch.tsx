"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  label,
  description,
  className,
}: ToggleSwitchProps) {
  return (
    <label
      className={cn(
        "flex items-center justify-between gap-3 cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {(label || description) && (
        <div className="flex-1">
          {label && <p className="font-medium text-sm text-portfolio-text">{label}</p>}
          {description && (
            <p className="text-xs text-portfolio-text-muted">{description}</p>
          )}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:ring-offset-2",
          checked ? "bg-portfolio-primary" : "bg-gray-200"
        )}
      >
        <motion.span
          className="inline-block h-5 w-5 rounded-full bg-white shadow-md"
          animate={{
            x: checked ? 22 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
    </label>
  );
}
