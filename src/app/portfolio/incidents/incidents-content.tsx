"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const stats = [
  { label: "Open Incidents", value: "12", note: "4 high severity", icon: AlertTriangle, accent: "text-portfolio-risk" },
  { label: "Avg Response", value: "4m 58s", note: "SLA 6m", icon: Clock, accent: "text-portfolio-growth" },
  { label: "Resolved Today", value: "7", note: "82% on time", icon: Shield, accent: "text-portfolio-growth" },
  { label: "Escalations", value: "3", note: "Awaiting review", icon: Users, accent: "text-portfolio-stable" },
];

const incidentQueue = [
  { id: "IN-8452", site: "Sandton City Mall", severity: "Critical", status: "Containment", owner: "Team Alpha", age: "18m" },
  { id: "IN-8429", site: "Discovery Head Office", severity: "High", status: "Investigating", owner: "Team Delta", age: "42m" },
  { id: "IN-8404", site: "Vodacom World", severity: "High", status: "On scene", owner: "Team Echo", age: "1h 05m" },
  { id: "IN-8391", site: "Metro Bank HQ", severity: "Medium", status: "Monitoring", owner: "Team Bravo", age: "2h 10m" },
];

const escalationBoard = [
  { site: "Discovery Head Office", trigger: "Repeated access alerts", level: "Level 2", eta: "15m" },
  { site: "Sandton City Mall", trigger: "Crowd control request", level: "Level 3", eta: "8m" },
  { site: "Bryanston Industrial", trigger: "Power outage patrol", level: "Level 2", eta: "26m" },
];

const resolutionTrend = [
  { day: "Mon", resolved: 6 },
  { day: "Tue", resolved: 8 },
  { day: "Wed", resolved: 7 },
  { day: "Thu", resolved: 9 },
  { day: "Fri", resolved: 5 },
  { day: "Sat", resolved: 7 },
  { day: "Sun", resolved: 4 },
];

const severityStyles: Record<string, string> = {
  Critical: "bg-portfolio-risk/10 text-portfolio-risk border-portfolio-risk/20",
  High: "bg-orange-50 text-orange-600 border-orange-200",
  Medium: "bg-portfolio-stable-light text-portfolio-stable border-portfolio-stable/30",
  Low: "bg-portfolio-bg text-portfolio-text-muted border-portfolio-border",
};

export function IncidentsContent() {
  const maxResolved = Math.max(...resolutionTrend.map((r) => r.resolved));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-portfolio-text">Incident Response</h1>
        <p className="text-sm text-portfolio-text-muted">
          Track, triage, and resolve incidents across the Suburban Security network.
        </p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-5 shadow-portfolio border border-portfolio-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-portfolio-bg flex items-center justify-center">
                <stat.icon className={cn("w-5 h-5", stat.accent)} />
              </div>
              <span className={cn("text-sm font-semibold", stat.accent)}>{stat.value}</span>
            </div>
            <p className="text-sm font-medium text-portfolio-text">{stat.label}</p>
            <p className="text-xs text-portfolio-text-muted mt-1">{stat.note}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-portfolio-text">Active Incident Queue</h2>
            <span className="text-sm text-portfolio-text-muted">Sorted by severity</span>
          </div>
          <div className="space-y-3">
            {incidentQueue.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between rounded-lg border border-portfolio-border p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-portfolio-text">{incident.site}</p>
                    <span className={cn("text-xs font-semibold border rounded-full px-2 py-0.5", severityStyles[incident.severity])}>
                      {incident.severity}
                    </span>
                  </div>
                  <p className="text-sm text-portfolio-text-muted mt-1">
                    {incident.id} • Owner: {incident.owner}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-portfolio-text">{incident.status}</p>
                  <p className="text-xs text-portfolio-text-muted mt-1">Age {incident.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-portfolio-text">Escalations</h2>
            <span className="text-sm text-portfolio-text-muted">Next 30 mins</span>
          </div>
          <div className="space-y-3">
            {escalationBoard.map((row) => (
              <div key={row.site} className="rounded-lg border border-portfolio-border p-4">
                <p className="text-sm font-semibold text-portfolio-text">{row.site}</p>
                <p className="text-sm text-portfolio-text-muted mt-1">{row.trigger}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-portfolio-text-muted">
                  <span>{row.level}</span>
                  <span>ETA {row.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-portfolio-text">Resolution Trend</h2>
          <span className="text-sm text-portfolio-text-muted">Last 7 days</span>
        </div>
        <div className="grid grid-cols-7 gap-3 items-end">
          {resolutionTrend.map((day) => (
            <div key={day.day} className="flex flex-col items-center gap-2">
              <div className="h-28 w-full flex items-end">
                <div
                  className="w-full rounded-md bg-portfolio-primary/70"
                  style={{ height: `${(day.resolved / maxResolved) * 100}%` }}
                />
              </div>
              <span className="text-xs text-portfolio-text-muted">{day.day}</span>
              <span className="text-xs font-semibold text-portfolio-text">{day.resolved}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
