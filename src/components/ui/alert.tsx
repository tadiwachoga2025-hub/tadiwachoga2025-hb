"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
  type: "error" | "success" | "warning" | "info";
  message: string;
  show: boolean;
  onClose?: () => void;
  className?: string;
}

const alertVariants = {
  hidden: { opacity: 0, height: 0, marginBottom: 0 },
  visible: { opacity: 1, height: "auto", marginBottom: 16 },
};

const iconMap = {
  error: AlertCircle,
  success: CheckCircle,
  warning: AlertCircle,
  info: AlertCircle,
};

const styleMap = {
  error: "border-danger/20 bg-danger/5 text-danger",
  success: "border-success/20 bg-success/5 text-success",
  warning: "border-warning/20 bg-warning/5 text-warning",
  info: "border-blue/20 bg-blue/5 text-blue",
};

export function Alert({ type, message, show, onClose, className }: AlertProps) {
  const Icon = iconMap[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={alertVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          role="alert"
          aria-live="assertive"
          className={cn(
            "flex items-center gap-3 rounded-lg border px-4 py-3",
            styleMap[type],
            className
          )}
        >
          <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <span className="flex-1 text-sm font-medium">{message}</span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 rounded-md p-0.5 opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
              aria-label="Dismiss alert"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
