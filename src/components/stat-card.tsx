"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  dark?: boolean;
  delay?: number;
}

export function StatCard({ value, label, dark = false, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl p-8 lg:p-10",
        dark ? "bg-white/[0.06]" : "bg-white shadow-sm"
      )}
    >
      <span
        className={cn(
          "text-3xl font-bold tracking-tight lg:text-4xl",
          dark ? "text-primary" : "text-black"
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "whitespace-pre-line text-center text-xs leading-[13.2px]",
          dark ? "text-slate-lighter-muted" : "text-slate-lighter-muted"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

