"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ARRDonut } from "@/components/portfolio/arr-donut";
import { cn } from "@/lib/utils";
import type { ClientTypeData, SectorData, ComplianceDistribution } from "@/components/portfolio/types";

// Security Operations Metrics
const metrics = [
  { label: "Monthly Revenue", value: "R2.4M", change: 8.2, changeLabel: "vs last month" },
  { label: "Active Sites", value: "47", change: 3, changeLabel: "new this month" },
  { label: "Avg Compliance", value: "85%", change: 2, changeLabel: "vs last month" },
  { label: "Guard Utilization", value: "94%", change: -1, changeLabel: "vs last week" },
];

// Revenue by Client Type
const clientTypeData: ClientTypeData[] = [
  { name: "Enterprise", value: 1450000, color: "#FFC300" },
  { name: "Commercial", value: 680000, color: "#2B5F6F" },
  { name: "Residential", value: 270000, color: "#FF6B35" },
];

// Compliance Distribution across all sites
const complianceData: ComplianceDistribution = {
  fullyCompliant: 28,
  minorIssues: 12,
  needsAttention: 5,
  critical: 2,
};

// Revenue by Sector
const sectorData: SectorData[] = [
  { name: "Finance & Banking", revenue: 720000, percentage: 30 },
  { name: "Retail & Shopping", revenue: 580000, percentage: 24.2 },
  { name: "Healthcare", revenue: 380000, percentage: 15.8 },
  { name: "Commercial/Office", revenue: 340000, percentage: 14.2 },
  { name: "Residential", revenue: 270000, percentage: 11.3 },
  { name: "Industrial", revenue: 110000, percentage: 4.5 },
];

// Security Events Trend (monthly)
const eventsTrendData = [
  { month: "Jan", value: 1245 },
  { month: "Feb", value: 1312 },
  { month: "Mar", value: 1187 },
  { month: "Apr", value: 1456 },
  { month: "May", value: 1523 },
  { month: "Jun", value: 1389 },
  { month: "Jul", value: 1445 },
  { month: "Aug", value: 1598 },
  { month: "Sep", value: 1667 },
  { month: "Oct", value: 1712 },
  { month: "Nov", value: 1589 },
  { month: "Dec", value: 1634 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function AnalyticsContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      {/* Page Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-portfolio-text">Analytics & Reports</h1>
        <p className="text-sm text-portfolio-text-muted">Security operations performance metrics</p>
      </motion.div>

      {/* Metric Header Row */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white rounded-lg p-5 shadow-portfolio border border-portfolio-border"
          >
            <p className="text-sm text-portfolio-text-muted mb-1">{metric.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-portfolio-text">{metric.value}</span>
              <span
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  metric.change >= 0 ? "text-portfolio-growth" : "text-portfolio-risk"
                )}
              >
                {metric.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(metric.change)}%
              </span>
            </div>
            <p className="text-xs text-portfolio-text-muted mt-1">{metric.changeLabel}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts Grid - Row 1 */}
      <motion.div variants={item} className="grid gap-5 lg:grid-cols-2">
        {/* Revenue by Client Type */}
        <div className="bg-white rounded-lg p-5 shadow-portfolio border border-portfolio-border">
          <ARRDonut data={clientTypeData} totalLabel="Total Revenue" />
        </div>

        {/* Compliance Distribution */}
        <div className="bg-white rounded-lg p-5 shadow-portfolio border border-portfolio-border">
          <ComplianceDistributionChart data={complianceData} />
        </div>
      </motion.div>

      {/* Charts Grid - Row 2 */}
      <motion.div variants={item} className="grid gap-5 lg:grid-cols-2">
        {/* Revenue by Sector */}
        <div className="bg-white rounded-lg p-5 shadow-portfolio border border-portfolio-border">
          <SectorRevenueChart data={sectorData} />
        </div>

        {/* Security Events Trend */}
        <div className="bg-white rounded-lg p-5 shadow-portfolio border border-portfolio-border">
          <SecurityEventsTrend data={eventsTrendData} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Updated Compliance Distribution component
function ComplianceDistributionChart({ data }: { data: ComplianceDistribution }) {
  const total = data.fullyCompliant + data.minorIssues + data.needsAttention + data.critical;

  const segments = [
    { key: "fullyCompliant", value: data.fullyCompliant, label: "Fully Compliant (90-100%)", color: "#16b364" },
    { key: "minorIssues", value: data.minorIssues, label: "Minor Issues (70-89%)", color: "#2B5F6F" },
    { key: "needsAttention", value: data.needsAttention, label: "Needs Attention (50-69%)", color: "#F59E0B" },
    { key: "critical", value: data.critical, label: "Critical (<50%)", color: "#DC2626" },
  ];

  return (
    <div>
      <h3 className="font-semibold text-lg text-portfolio-text mb-4">Compliance Distribution</h3>

      <div className="flex flex-col items-center">
        {/* Semi-circle gauge */}
        <div className="relative" style={{ width: 200, height: 110 }}>
          <svg width="200" height="110" viewBox="0 0 100 55">
            <path
              d="M 5 50 A 45 45 0 0 1 95 50"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {segments.map((segment, index) => {
              const percentage = segment.value / total;
              const startAngle = segments
                .slice(0, index)
                .reduce((sum, s) => sum + (s.value / total) * 180, 0);
              const endAngle = startAngle + percentage * 180;

              const startRad = (startAngle - 180) * (Math.PI / 180);
              const endRad = (endAngle - 180) * (Math.PI / 180);

              const x1 = 50 + 45 * Math.cos(startRad);
              const y1 = 50 + 45 * Math.sin(startRad);
              const x2 = 50 + 45 * Math.cos(endRad);
              const y2 = 50 + 45 * Math.sin(endRad);

              const largeArc = percentage > 0.5 ? 1 : 0;

              return (
                <motion.path
                  key={segment.key}
                  d={`M ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2}`}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              );
            })}
          </svg>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <p className="text-2xl font-bold text-portfolio-text">{total}</p>
            <p className="text-sm text-portfolio-text-muted">Total Sites</p>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {segments.map((segment) => (
            <div key={segment.key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <div>
                <p className="text-sm font-medium text-portfolio-text">
                  {segment.value} ({((segment.value / total) * 100).toFixed(0)}%)
                </p>
                <p className="text-xs text-portfolio-text-muted">{segment.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sector Revenue Chart
function SectorRevenueChart({ data }: { data: SectorData[] }) {
  const maxValue = Math.max(...data.map((d) => d.revenue));

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `R${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `R${(value / 1000).toFixed(0)}K`;
    return `R${value}`;
  };

  return (
    <div>
      <h3 className="font-semibold text-base text-portfolio-text mb-4">Revenue by Sector</h3>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-portfolio-text">{item.name}</span>
              <span className="text-sm text-portfolio-text-muted">
                {formatValue(item.revenue)}
              </span>
            </div>
            <div className="h-5 bg-portfolio-bg rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #FFC300 0%, #FFD700 100%)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(item.revenue / maxValue) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Security Events Trend
function SecurityEventsTrend({ data }: { data: { month: string; value: number }[] }) {
  const width = 280;
  const height = 140;
  const padding = { top: 10, right: 12, bottom: 18, left: 16 };
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

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }

  const areaPath = path + ` L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  return (
    <div>
      <h3 className="font-semibold text-base text-portfolio-text mb-4">Security Events Trend</h3>

      <div className="bg-portfolio-bg rounded-lg p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[200px]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="eventsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2B5F6F" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2B5F6F" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1={padding.left}
              y1={padding.top + ratio * effectiveHeight}
              x2={width - padding.right}
              y2={padding.top + ratio * effectiveHeight}
              stroke="#E5E7EB"
              strokeWidth={0.6}
            />
          ))}

          <motion.path
            d={areaPath}
            fill="url(#eventsGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.path
            d={path}
            fill="none"
            stroke="#2B5F6F"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />

          {points.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={2.5}
              fill="#2B5F6F"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.03 }}
            />
          ))}

          {data.map((d, i) => (
            <text
              key={d.month}
              x={points[i].x}
              y={height - 4}
              textAnchor="middle"
              className="text-[10px] fill-portfolio-text-muted"
            >
              {d.month}
            </text>
          ))}
        </svg>
        <p className="text-sm text-portfolio-text-muted text-center mt-2">
          Patrols, check-ins, and security events per month
        </p>
      </div>
    </div>
  );
}
