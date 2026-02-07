"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { TierData } from "./types";

interface ARRDonutProps {
  data: TierData[];
  totalLabel?: string;
  className?: string;
}

export function ARRDonut({ data, totalLabel = "Total ARR", className }: ARRDonutProps) {
  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);

  const { segments } = useMemo(() => {
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = circumference * 0.25; // Start from top

    const segments = data.map((d) => {
      const percentage = d.value / total;
      const strokeLength = percentage * circumference;
      const segment = {
        ...d,
        percentage,
        strokeDasharray: `${strokeLength} ${circumference - strokeLength}`,
        strokeDashoffset: currentOffset,
      };
      currentOffset -= strokeLength;
      return segment;
    });

    return { segments };
  }, [data, total]);

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className={className}>
      <h3 className="font-semibold text-base text-portfolio-text mb-3">ARR by Tier</h3>

      <div className="flex items-center gap-5">
        {/* Donut Chart */}
        <div className="relative">
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* Background circle */}
            <circle
              cx="70"
              cy="70"
              r="55"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="18"
            />

            {/* Data segments */}
            {segments.map((segment, index) => (
              <motion.circle
                key={segment.name}
                cx="70"
                cy="70"
                r="55"
                fill="none"
                stroke={segment.color}
                strokeWidth="18"
                strokeDasharray={segment.strokeDasharray}
                strokeDashoffset={segment.strokeDashoffset}
                strokeLinecap="butt"
                initial={{ strokeDashoffset: 2 * Math.PI * 55 * 0.25 }}
                animate={{ strokeDashoffset: segment.strokeDashoffset }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              />
            ))}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-portfolio-text-muted">{totalLabel}</p>
            <p className="text-xl font-bold text-portfolio-text">{formatValue(total)}</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {segments.map((segment) => (
            <div key={segment.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <div>
                <p className="text-sm font-medium text-portfolio-text">{segment.name}</p>
                <p className="text-xs text-portfolio-text-muted">
                  {formatValue(segment.value)} ({(segment.percentage * 100).toFixed(0)}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
