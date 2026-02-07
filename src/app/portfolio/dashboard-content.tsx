"use client";

import { motion } from "framer-motion";
import { Users, AlertTriangle, Truck, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { ChurnChart } from "@/components/portfolio/churn-chart";
import { HighPrioritySites } from "@/components/portfolio/high-priority-sites";
import { SecurityActivityTicker } from "@/components/portfolio/security-activity-ticker";
import { StatisticsCard8 } from "@/components/ui/statistics-card-8";
import type { Site, IncidentDataPoint, SecurityEvent } from "@/components/portfolio/types";

// Quick stats
const quickStats = [
  { label: "Total Sites", value: "47", icon: MapPin },
  { label: "Guards on Shift", value: "1,247", icon: Users },
  { label: "Vehicles Active", value: "34", icon: Truck },
  { label: "Alerts Today", value: "8", icon: AlertTriangle },
];

// Incident trend data
const incidentData: IncidentDataPoint[] = [
  { month: "Jan", predicted: 18, actual: 15, marginLow: 12, marginHigh: 24 },
  { month: "Feb", predicted: 22, actual: 19, marginLow: 16, marginHigh: 28 },
  { month: "Mar", predicted: 16, actual: 21, marginLow: 11, marginHigh: 22 },
  { month: "Apr", predicted: 20, actual: 17, marginLow: 14, marginHigh: 26 },
  { month: "May", predicted: 25, actual: 23, marginLow: 19, marginHigh: 31 },
  { month: "Jun", predicted: 19, actual: 16, marginLow: 13, marginHigh: 25 },
  { month: "Jul", predicted: 17, actual: 20, marginLow: 12, marginHigh: 23 },
  { month: "Aug", predicted: 21, actual: 18, marginLow: 15, marginHigh: 27 },
  { month: "Sep", predicted: 24, actual: 26, marginLow: 18, marginHigh: 30 },
  { month: "Oct", predicted: 18, actual: 14, marginLow: 13, marginHigh: 24 },
  { month: "Nov", predicted: 15, actual: 17, marginLow: 10, marginHigh: 21 },
  { month: "Dec", predicted: 20, actual: 0, marginLow: 14, marginHigh: 26 },
];

// High priority sites
const prioritySites: Site[] = [
  { id: "2", name: "Sandton City Mall", sector: "Retail", tier: "Enterprise", contractValue: 320000, complianceScore: 58, guardsAssigned: 24, lastIncident: 0, isHighPriority: true, siteManager: "Sarah Ndlovu" },
  { id: "4", name: "Discovery Head Office", sector: "Commercial", tier: "Enterprise", contractValue: 145000, complianceScore: 42, guardsAssigned: 6, lastIncident: 5, isHighPriority: true, siteManager: "Thabo Khumalo" },
  { id: "7", name: "Clearwater Mall", sector: "Retail", tier: "Commercial", contractValue: 125000, complianceScore: 65, guardsAssigned: 2, lastIncident: 1, isHighPriority: true, siteManager: "Sarah Ndlovu" },
  { id: "9", name: "Rosebank Towers", sector: "Commercial", tier: "Enterprise", contractValue: 180000, complianceScore: 55, guardsAssigned: 8, lastIncident: 3, isHighPriority: true, siteManager: "James Moyo" },
  { id: "10", name: "Menlyn Park Mall", sector: "Retail", tier: "Enterprise", contractValue: 290000, complianceScore: 61, guardsAssigned: 18, lastIncident: 0, isHighPriority: true, siteManager: "Lisa Pietersen" },
];

// Live security events
const securityEvents: SecurityEvent[] = [
  { id: "1", siteName: "Metro Bank HQ", eventType: "check-in", eventName: "Guard Check-in Completed", timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
  { id: "2", siteName: "Sandton City Mall", eventType: "incident", eventName: "Suspicious Activity Reported", timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString() },
  { id: "3", siteName: "Vodacom World", eventType: "patrol", eventName: "Vehicle Patrol Started", timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString() },
  { id: "4", siteName: "Dainfern Estate", eventType: "shift-change", eventName: "Night Shift Handover", timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
  { id: "5", siteName: "Netcare Sunninghill", eventType: "compliance", eventName: "Compliance Audit Passed", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: "6", siteName: "Discovery Head Office", eventType: "alert", eventName: "Access Control Alert", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getCurrentShift(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) return "Day Shift";
  return "Night Shift";
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function PortfolioDashboard() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6 w-full max-w-full overflow-hidden"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between flex-shrink-0 bg-white rounded-lg p-6 border border-portfolio-border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-portfolio-text">
            {getGreeting()}, {user?.name?.split(" ")[0] || "Operator"}
          </h1>
          <p className="text-base text-portfolio-text-muted mt-1">
            {today} • {getCurrentShift()} • Operations Command Center
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base px-3 py-1.5 rounded-full bg-portfolio-growth-light text-portfolio-growth font-medium border border-portfolio-growth/20">
            {getCurrentShift()}
          </span>
        </div>
      </motion.div>

      {/* Quick Stats Bar */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 px-5 py-4 bg-white rounded-lg border border-portfolio-border shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-portfolio-primary/10 flex items-center justify-center flex-shrink-0">
              <stat.icon className="w-6 h-6 text-portfolio-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold text-portfolio-text truncate">{stat.value}</p>
              <p className="text-sm text-portfolio-text-muted truncate">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* KPI Scorecards */}
      <motion.div variants={item} className="flex-shrink-0">
        <StatisticsCard8 />
      </motion.div>

      {/* Main content row */}
      <motion.div variants={item} className="grid gap-6 lg:grid-cols-3 flex-1 min-h-0">
        {/* Incident Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-portfolio-border overflow-hidden">
          <ChurnChart data={incidentData} currentMonth="Nov" />
        </div>

        {/* High Priority Sites */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-portfolio-border overflow-hidden">
          <HighPrioritySites
            sites={prioritySites}
            onSiteClick={(site) => console.log("Selected:", site.name)}
          />
        </div>
      </motion.div>

      {/* Live Operations Feed */}
      <motion.div
        variants={item}
        className="bg-white rounded-lg p-6 shadow-sm border border-portfolio-border flex-shrink-0 overflow-hidden"
      >
        <SecurityActivityTicker events={securityEvents} />
      </motion.div>
    </motion.div>
  );
}
