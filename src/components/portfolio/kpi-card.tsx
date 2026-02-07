"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { Sparkline } from "./sparkline";
import { HealthGauge } from "./health-gauge";
import { cn } from "@/lib/utils";

type MetricStatus = "healthy" | "warning" | "critical";

interface KPICardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  sparklineData?: number[];
  type?: "default" | "gauge" | "sparkline";
  gaugeMax?: number;
  icon?: LucideIcon;
  invertTrend?: boolean;
  status?: MetricStatus;
  className?: string;
}

function getStatusColor(status?: MetricStatus): string {
  switch (status) {
    case "healthy": return "bg-portfolio-growth";
    case "warning": return "bg-portfolio-stable";
    case "critical": return "bg-portfolio-risk";
    default: return "bg-gray-300";
  }
}

function getStatusFromValue(value: string | number, type?: string): MetricStatus {
  if (type === "gauge") {
    const numVal = typeof value === "number" ? value : parseFloat(value);
    if (numVal >= 80) return "healthy";
    if (numVal >= 60) return "warning";
    return "critical";
  }
  return "healthy";
}

export function KPICard({
  label,
  value,
  trend,
  trendValue,
  sparklineData,
  type = "default",
  gaugeMax = 100,
  icon: Icon,
  invertTrend = false,
  status,
  className,
}: KPICardProps) {
  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-4 h-4" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    const isPositive = invertTrend ? trend === "down" : trend === "up";
    const isNegative = invertTrend ? trend === "up" : trend === "down";
    if (isPositive) return "text-portfolio-growth bg-portfolio-growth-light";
    if (isNegative) return "text-portfolio-risk bg-portfolio-risk-light";
    return "text-portfolio-text-muted bg-gray-100";
  };

  const computedStatus = status || getStatusFromValue(value, type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-lg p-6 shadow-sm border border-portfolio-border min-w-0 overflow-hidden min-h-[160px]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {Icon && (
            <div className="w-10 h-10 rounded-full bg-portfolio-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-portfolio-primary" />
            </div>
          )}
          <p className="text-base font-medium text-portfolio-text-muted truncate">{label}</p>
        </div>
        <div className={cn("w-3 h-3 rounded-full flex-shrink-0 ml-2", getStatusColor(computedStatus))} />
      </div>

      {type === "gauge" && typeof value === "number" ? (
        <div className="flex items-center justify-center py-3">
          <HealthGauge value={value} max={gaugeMax} size={120} strokeWidth={10} />
        </div>
      ) : (
        <div className="flex items-end justify-between min-h-[56px]">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl font-bold text-portfolio-text truncate">{value}</span>
            {trend && trendValue && (
              <div className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 rounded text-sm font-medium flex-shrink-0",
                getTrendColor()
              )}>
                {getTrendIcon()}
                {trendValue}
              </div>
            )}
          </div>
          {type === "sparkline" && sparklineData && (
            <Sparkline
              data={sparklineData}
              color={computedStatus === "critical" ? "#DC2626" : "#16b364"}
              width={110}
              height={40}
              className="flex-shrink-0 ml-2"
            />
          )}
        </div>
      )}
    </motion.div>
  );
}
