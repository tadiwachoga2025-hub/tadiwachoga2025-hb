"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface ActivityTrendProps {
  data: { month: string; value: number }[];
  className?: string;
}

export function ActivityTrend({ data, className }: ActivityTrendProps) {
  const { path, areaPath, points, dimensions } = useMemo(() => {
    const width = 100;
    const height = 50;
    const padding = { top: 5, right: 5, bottom: 10, left: 8 };
    const effectiveWidth = width - padding.left - padding.right;
    const effectiveHeight = height - padding.top - padding.bottom;

    const values = data.map((d) => d.value);
    const min = Math.min(...values) * 0.9;
    const max = Math.max(...values) * 1.1;
    const range = max - min || 1;

    const points = data.map((d, i) => ({
      x: padding.left + (i / (data.length - 1)) * effectiveWidth,
      y: padding.top + effectiveHeight - ((d.value - min) / range) * effectiveHeight,
    }));

    // Create smooth curve using cardinal spline
    const tension = 0.3;
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
      const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    const areaPath =
      path +
      ` L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

    return {
      path,
      areaPath,
      points,
      dimensions: { width, height, padding },
    };
  }, [data]);

  return (
    <div className={className}>
      <h3 className="font-semibold text-sm text-portfolio-text mb-2">Activity Trend</h3>

      <div className="bg-portfolio-bg rounded-lg p-3">
        <svg
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className="w-full h-[140px]"
          preserveAspectRatio="none"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2B5F6F" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2B5F6F" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1={dimensions.padding.left}
              y1={
                dimensions.padding.top +
                ratio * (dimensions.height - dimensions.padding.top - dimensions.padding.bottom)
              }
              x2={dimensions.width - dimensions.padding.right}
              y2={
                dimensions.padding.top +
                ratio * (dimensions.height - dimensions.padding.top - dimensions.padding.bottom)
              }
              stroke="#E5E7EB"
              strokeWidth={0.2}
            />
          ))}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#activityGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Line */}
          <motion.path
            d={path}
            fill="none"
            stroke="#2B5F6F"
            strokeWidth={0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Data points */}
          {points.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={0.8}
              fill="#2B5F6F"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.03 }}
            />
          ))}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={d.month}
              x={points[i].x}
              y={dimensions.height - 2}
              textAnchor="middle"
              className="text-[2px] fill-portfolio-text-muted"
            >
              {d.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
