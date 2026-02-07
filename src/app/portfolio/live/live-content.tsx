"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Bell, Shield, Truck, Users } from "lucide-react";
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
  { label: "Active Patrols", value: "62", note: "8 sites rotating", icon: Shield, accent: "text-portfolio-growth" },
  { label: "Open Alerts", value: "9", note: "2 critical", icon: AlertTriangle, accent: "text-portfolio-risk" },
  { label: "Avg Response", value: "4m 12s", note: "SLA 6m", icon: Bell, accent: "text-portfolio-growth" },
  { label: "CIT Routes", value: "14", note: "2 at risk", icon: Truck, accent: "text-portfolio-stable" },
];

const liveAlerts = [
  { id: "AL-204", site: "Sandton City Mall", type: "Suspicious Activity", severity: "Critical", status: "Units dispatched", time: "3m ago" },
  { id: "AL-197", site: "Discovery Head Office", type: "Access Control Alert", severity: "High", status: "Verifying entry log", time: "11m ago" },
  { id: "AL-189", site: "Vodacom World", type: "Perimeter Breach", severity: "High", status: "Drone sweep active", time: "19m ago" },
  { id: "AL-173", site: "Metro Bank HQ", type: "After-hours Motion", severity: "Medium", status: "Patrol checking", time: "26m ago" },
];

const patrols = [
  { route: "Route A-12", sector: "Retail North", lead: "N. Dlamini", eta: "12m", status: "In progress" },
  { route: "Route C-07", sector: "Commercial Core", lead: "T. Khumalo", eta: "18m", status: "Checkpoint 3/6" },
  { route: "Route D-02", sector: "Industrial East", lead: "S. Ndlovu", eta: "22m", status: "CCTV sweep" },
  { route: "CIT-14", sector: "Banking District", lead: "J. Moyo", eta: "08m", status: "En route" },
];

const slaTargets = [
  { label: "Critical", target: "5m", current: "4m 12s", progress: 84, tone: "bg-portfolio-growth" },
  { label: "High", target: "8m", current: "6m 05s", progress: 76, tone: "bg-portfolio-primary" },
  { label: "Medium", target: "12m", current: "9m 34s", progress: 64, tone: "bg-portfolio-stable" },
];

const comms = [
  { channel: "Ops Radio", status: "Online", latency: "120ms", uptime: "99.98%" },
  { channel: "Mobile Push", status: "Online", latency: "240ms", uptime: "99.91%" },
  { channel: "Incident Desk", status: "Online", latency: "85ms", uptime: "99.99%" },
];

const severityStyles: Record<string, string> = {
  Critical: "bg-portfolio-risk/10 text-portfolio-risk border-portfolio-risk/20",
  High: "bg-orange-50 text-orange-600 border-orange-200",
  Medium: "bg-portfolio-stable-light text-portfolio-stable border-portfolio-stable/30",
  Low: "bg-portfolio-bg text-portfolio-text-muted border-portfolio-border",
};

export function LiveOpsContent() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-portfolio-text">Live Operations</h1>
        <p className="text-sm text-portfolio-text-muted">
          Real-time situational awareness across all Suburban Security sites.
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
            <h2 className="text-lg font-semibold text-portfolio-text">Live Alerts</h2>
            <span className="text-sm text-portfolio-text-muted">Last 30 minutes</span>
          </div>
          <div className="space-y-3">
            {liveAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between rounded-lg border border-portfolio-border p-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-portfolio-text">{alert.type}</span>
                    <span className={cn("text-xs font-semibold border rounded-full px-2 py-0.5", severityStyles[alert.severity])}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-portfolio-text-muted mt-1">
                    {alert.site} • {alert.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-portfolio-text">{alert.status}</p>
                  <p className="text-xs text-portfolio-text-muted mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-portfolio-text">Active Patrols</h2>
            <span className="text-sm text-portfolio-text-muted">4 teams</span>
          </div>
          <div className="space-y-3">
            {patrols.map((patrol) => (
              <div key={patrol.route} className="rounded-lg border border-portfolio-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-portfolio-text">{patrol.route}</p>
                  <span className="text-xs text-portfolio-text-muted">{patrol.eta}</span>
                </div>
                <p className="text-sm text-portfolio-text-muted mt-1">
                  {patrol.sector} • Lead: {patrol.lead}
                </p>
                <p className="text-xs text-portfolio-text-muted mt-1">{patrol.status}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid gap-5 lg:grid-cols-2">
        <div className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-portfolio-text">Response SLA</h2>
            <span className="text-sm text-portfolio-text-muted">Rolling 7 days</span>
          </div>
          <div className="space-y-4">
            {slaTargets.map((sla) => (
              <div key={sla.label}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-portfolio-text">{sla.label}</p>
                  <span className="text-sm text-portfolio-text-muted">
                    {sla.current} / {sla.target}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-portfolio-bg">
                  <div className={cn("h-2 rounded-full", sla.tone)} style={{ width: `${sla.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-portfolio-text">Comms Status</h2>
            <span className="text-sm text-portfolio-text-muted">Last 24 hours</span>
          </div>
          <div className="space-y-3">
            {comms.map((row) => (
              <div key={row.channel} className="flex items-center justify-between rounded-lg border border-portfolio-border p-4">
                <div>
                  <p className="text-sm font-medium text-portfolio-text">{row.channel}</p>
                  <p className="text-xs text-portfolio-text-muted mt-1">Latency: {row.latency}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-portfolio-growth">{row.status}</p>
                  <p className="text-xs text-portfolio-text-muted mt-1">Uptime {row.uptime}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-portfolio-text-muted">
            <Users className="w-4 h-4 text-portfolio-text-muted" />
            Dispatches synchronized with 12 response teams.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
