"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, UserCheck, Clock, Bell, FileCheck } from "lucide-react";
import type { SecurityEvent } from "./types";

interface SecurityActivityTickerProps {
  events: SecurityEvent[];
  className?: string;
}

const eventIcons = {
  patrol: Shield,
  incident: AlertTriangle,
  "check-in": UserCheck,
  "shift-change": Clock,
  alert: Bell,
  compliance: FileCheck,
};

const eventColors = {
  patrol: "text-portfolio-primary bg-portfolio-primary/10",
  incident: "text-portfolio-risk bg-portfolio-risk-light",
  "check-in": "text-portfolio-growth bg-portfolio-growth-light",
  "shift-change": "text-portfolio-stable bg-portfolio-stable-light",
  alert: "text-[#FF6B35] bg-[#FF6B35]/10",
  compliance: "text-teal bg-teal/10",
};

function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function SecurityActivityTicker({ events, className }: SecurityActivityTickerProps) {
  return (
    <div className={className}>
      <h3 className="font-semibold text-lg text-portfolio-text mb-4 flex-shrink-0">Live Operations Feed</h3>

      <div className="relative overflow-hidden">
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide min-h-[110px]">
          {events.map((event, index) => {
            const Icon = eventIcons[event.eventType] || Shield;
            const colorClass = eventColors[event.eventType] || "text-gray-500 bg-gray-50";

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 flex items-center gap-4 p-4 rounded-lg bg-white border border-portfolio-border hover:shadow-md transition-all min-w-[260px] max-w-[320px]"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-portfolio-text truncate">
                    {event.eventName}
                  </p>
                  <div className="flex items-center gap-1 mt-1 min-w-0">
                    <p className="text-sm text-portfolio-text-muted truncate flex-shrink-0">
                      {event.siteName}
                    </p>
                    <span className="text-sm text-portfolio-text-muted flex-shrink-0">•</span>
                    <p className="text-sm text-portfolio-text-muted flex-shrink-0 font-medium">
                      {getRelativeTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gradient fade on right */}
        <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-portfolio-bg to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

// Backward compatibility
export { SecurityActivityTicker as ActivityTicker };
