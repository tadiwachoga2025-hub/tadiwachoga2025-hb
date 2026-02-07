"use client";

import { motion } from "framer-motion";
import { Users, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Site } from "./types";

interface SiteCardProps {
  site: Site;
  isSelected?: boolean;
  onClick?: () => void;
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `R${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R${(value / 1000).toFixed(0)}K`;
  }
  return `R${value}`;
}

export function SiteCard({ site, isSelected, onClick }: SiteCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "w-full text-left p-4 rounded-lg bg-white border transition-all duration-200",
        isSelected
          ? "border-portfolio-primary shadow-portfolio-md"
          : "border-portfolio-border hover:border-portfolio-primary/30"
      )}
    >
      <div className="flex items-start justify-between gap-1.5">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-portfolio-text truncate">
            {site.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-portfolio-bg text-portfolio-text-muted">
              {site.sector}
            </span>
            {site.isHighPriority && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-portfolio-risk-light text-portfolio-risk font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Priority
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-sm text-portfolio-text">
            {formatCurrency(site.contractValue)}
          </p>
          <p className="text-xs text-portfolio-text-muted">/month</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 text-xs text-portfolio-text-muted">
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{site.guardsAssigned} guards</span>
        </div>
        <span>
          {site.lastIncident === -1
            ? "No incidents"
            : site.lastIncident === 0
            ? "Incident today"
            : `Last incident: ${site.lastIncident}d ago`}
        </span>
      </div>
    </motion.button>
  );
}

// Keep backward compatibility
export { SiteCard as AccountCard };
