"use client";

import { motion } from "framer-motion";

interface HealthGaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function getGaugeColor(percentage: number): string {
  if (percentage >= 80) return "#16b364"; // Green
  if (percentage >= 60) return "#F59E0B"; // Amber
  if (percentage >= 40) return "#FF6B35"; // Orange
  return "#DC2626"; // Red
}

export function HealthGauge({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  className,
}: HealthGaugeProps) {
  const percentage = (value / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Half circle
  const offset = circumference - (percentage / 100) * circumference;
  const color = getGaugeColor(percentage);

  return (
    <div style={{ width: size, height: size / 2 + 24 }} className="flex flex-col items-center overflow-hidden">
      <svg width={size} height={size / 2 + 12} viewBox={`0 0 ${size} ${size / 2 + 12}`} className="overflow-visible">
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Animated value arc */}
        <motion.path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="text-center -mt-2">
        <motion.span
          className="text-lg font-bold text-portfolio-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}
        </motion.span>
        <span className="text-xs text-portfolio-text-muted">/{max}</span>
      </div>
    </div>
  );
}
