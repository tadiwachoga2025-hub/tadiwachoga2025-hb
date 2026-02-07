"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight, ShieldAlert, FileWarning, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Site } from "./types";

interface HighPrioritySitesProps {
  sites: Site[];
  onSiteClick?: (site: Site) => void;
  onViewAll?: () => void;
  className?: string;
}

function getPriorityReason(site: Site): { icon: typeof AlertTriangle; text: string; color: string } {
  if (site.lastIncident === 0) {
    return { icon: ShieldAlert, text: "Active incident", color: "text-portfolio-risk" };
  }
  if (site.complianceScore < 50) {
    return { icon: FileWarning, text: "Critical compliance", color: "text-portfolio-risk" };
  }
  if (site.lastIncident <= 3) {
    return { icon: AlertTriangle, text: "Recent incident", color: "text-orange-500" };
  }
  if (site.complianceScore < 70) {
    return { icon: FileWarning, text: "Low compliance", color: "text-orange-500" };
  }
  if (site.guardsAssigned < 3) {
    return { icon: Users, text: "Understaffed", color: "text-amber-500" };
  }
  return { icon: AlertTriangle, text: "Needs attention", color: "text-amber-500" };
}

export function HighPrioritySites({ sites, onSiteClick, onViewAll, className }: HighPrioritySitesProps) {
  const prioritySites = sites.filter((s) => s.isHighPriority).slice(0, 5);

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-portfolio-risk/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-portfolio-risk" />
          </div>
          <h3 className="font-semibold text-portfolio-text text-lg">High Priority Sites</h3>
        </div>
        <span className="text-base px-3 py-1.5 rounded-full bg-portfolio-risk text-white font-semibold flex-shrink-0">
          {prioritySites.length}
        </span>
      </div>

      {/* Compact Sites List */}
      <div className="space-y-3 overflow-y-auto max-h-[360px]">
        {prioritySites.map((site, index) => {
          const reason = getPriorityReason(site);
          const ReasonIcon = reason.icon;

          return (
            <motion.button
              key={site.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onSiteClick?.(site)}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-white border border-portfolio-border hover:border-portfolio-primary/50 hover:shadow-md transition-all group text-left flex-shrink-0"
            >
              <div className="flex-1 min-w-0 pr-2">
                <p className="font-semibold text-portfolio-text text-base truncate">{site.name}</p>
                <div className="flex items-center gap-1.5 mt-1 min-w-0">
                  <ReasonIcon className={cn("w-4 h-4 flex-shrink-0", reason.color)} />
                  <span className={cn("text-sm truncate font-medium", reason.color)}>{reason.text}</span>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-portfolio-text-muted group-hover:text-portfolio-primary transition-colors flex-shrink-0 ml-2" />
            </motion.button>
          );
        })}
      </div>

      {/* Empty State */}
      {prioritySites.length === 0 && (
        <div className="text-center py-8 text-portfolio-text-muted">
          <p className="text-sm">All sites operating normally</p>
        </div>
      )}

      {/* View All Link */}
      {prioritySites.length > 0 && onViewAll && (
        <button
          onClick={onViewAll}
          className="w-full mt-3 py-2 text-sm font-semibold text-portfolio-primary hover:underline bg-transparent border-0 cursor-pointer"
        >
          View all priority sites
        </button>
      )}
    </div>
  );
}

export { HighPrioritySites as AtRiskWidget };
