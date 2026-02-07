"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Fuel, MapPin, Shield, Truck, Wrench } from "lucide-react";
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
  { label: "Active Vehicles", value: "34", note: "92% available", icon: Truck, accent: "text-portfolio-growth" },
  { label: "CIT Missions", value: "14", note: "3 in transit", icon: Shield, accent: "text-portfolio-primary" },
  { label: "Route Deviations", value: "2", note: "Flagged today", icon: AlertTriangle, accent: "text-portfolio-risk" },
  { label: "Maintenance Due", value: "5", note: "Next 10 days", icon: Wrench, accent: "text-portfolio-stable" },
];

const fleetStatus = [
  { vehicle: "CIT-14", driver: "J. Moyo", status: "En route", fuel: "78%", location: "Banking District", lastCheck: "6m ago" },
  { vehicle: "PAT-07", driver: "S. Ndlovu", status: "On patrol", fuel: "64%", location: "Retail North", lastCheck: "11m ago" },
  { vehicle: "CIT-09", driver: "T. Khumalo", status: "Loading", fuel: "51%", location: "Midrand Vault", lastCheck: "18m ago" },
  { vehicle: "PAT-03", driver: "L. Pietersen", status: "Checkpoint", fuel: "83%", location: "Sandton Core", lastCheck: "21m ago" },
  { vehicle: "RES-02", driver: "M. van der Berg", status: "Standby", fuel: "92%", location: "Bryanston", lastCheck: "32m ago" },
];

const routeMonitor = [
  { route: "CIT-14", risk: "Elevated", eta: "8m", note: "Crowd density spike" },
  { route: "CIT-09", risk: "Normal", eta: "22m", note: "Vault loading" },
  { route: "CIT-07", risk: "High", eta: "14m", note: "Deviation detected" },
  { route: "CIT-03", risk: "Normal", eta: "28m", note: "On schedule" },
];

const maintenance = [
  { vehicle: "PAT-05", task: "Brake inspection", due: "6 days", owner: "Fleet Ops" },
  { vehicle: "CIT-11", task: "Armored door service", due: "8 days", owner: "CIT Tech" },
  { vehicle: "PAT-09", task: "Oil + filter", due: "9 days", owner: "Fleet Ops" },
  { vehicle: "RES-01", task: "Tire rotation", due: "12 days", owner: "Fleet Ops" },
];

const gpsHealth = [
  { label: "Tracking Uptime", value: 98, tone: "bg-portfolio-growth" },
  { label: "Device Health", value: 92, tone: "bg-portfolio-primary" },
  { label: "Geo-fence Compliance", value: 87, tone: "bg-portfolio-stable" },
];

const riskStyles: Record<string, string> = {
  High: "bg-portfolio-risk/10 text-portfolio-risk border-portfolio-risk/20",
  Elevated: "bg-orange-50 text-orange-600 border-orange-200",
  Normal: "bg-portfolio-bg text-portfolio-text-muted border-portfolio-border",
};

export function FleetContent() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-portfolio-text">Fleet & CIT</h1>
        <p className="text-sm text-portfolio-text-muted">
          Track fleet readiness, CIT routing, and vehicle compliance in real time.
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
            <h2 className="text-lg font-semibold text-portfolio-text">Fleet Status</h2>
            <span className="text-sm text-portfolio-text-muted">Live vehicles</span>
          </div>
          <div className="space-y-3">
            {fleetStatus.map((row) => (
              <div key={row.vehicle} className="flex items-center justify-between rounded-lg border border-portfolio-border p-4">
                <div>
                  <p className="text-sm font-semibold text-portfolio-text">{row.vehicle}</p>
                  <p className="text-sm text-portfolio-text-muted mt-1">
                    Driver: {row.driver} • {row.status}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Fuel className="w-4 h-4 text-portfolio-primary" />
                    <span className="text-sm font-medium text-portfolio-text">{row.fuel}</span>
                  </div>
                  <p className="text-xs text-portfolio-text-muted mt-1">
                    {row.location} • {row.lastCheck}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-portfolio-text">Route Monitor</h2>
            <span className="text-sm text-portfolio-text-muted">CIT focus</span>
          </div>
          <div className="space-y-3">
            {routeMonitor.map((route) => (
              <div key={route.route} className="rounded-lg border border-portfolio-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-portfolio-text">{route.route}</p>
                  <span className={cn("text-xs font-semibold border rounded-full px-2 py-0.5", riskStyles[route.risk])}>
                    {route.risk}
                  </span>
                </div>
                <p className="text-sm text-portfolio-text-muted mt-1">{route.note}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-portfolio-text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    ETA {route.eta}
                  </span>
                  <span>Tracking active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid gap-5 lg:grid-cols-2">
        <div className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-portfolio-text">Maintenance Schedule</h2>
            <span className="text-sm text-portfolio-text-muted">Next 14 days</span>
          </div>
          <div className="space-y-3">
            {maintenance.map((row) => (
              <div key={row.vehicle} className="flex items-center justify-between rounded-lg border border-portfolio-border p-4">
                <div>
                  <p className="text-sm font-semibold text-portfolio-text">{row.vehicle}</p>
                  <p className="text-sm text-portfolio-text-muted mt-1">{row.task}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-portfolio-text">Due {row.due}</p>
                  <p className="text-xs text-portfolio-text-muted mt-1">{row.owner}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-portfolio-text">GPS & Compliance</h2>
            <span className="text-sm text-portfolio-text-muted">Last 24 hours</span>
          </div>
          <div className="space-y-4">
            {gpsHealth.map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-portfolio-text">{row.label}</p>
                  <span className="text-sm text-portfolio-text-muted">{row.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-portfolio-bg">
                  <div className={cn("h-2 rounded-full", row.tone)} style={{ width: `${row.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
