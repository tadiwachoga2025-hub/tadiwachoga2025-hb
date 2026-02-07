"use client";

import { motion } from "framer-motion";
import { AlertTriangle, FileCheck, Shield, Users } from "lucide-react";
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
  { label: "Compliant Sites", value: "42 / 47", note: "89% coverage", icon: Shield, accent: "text-portfolio-growth" },
  { label: "Audits Due", value: "6", note: "Next 14 days", icon: FileCheck, accent: "text-portfolio-stable" },
  { label: "Docs Expiring", value: "9", note: "Need renewal", icon: AlertTriangle, accent: "text-portfolio-risk" },
  { label: "Open Findings", value: "3", note: "2 critical", icon: Users, accent: "text-portfolio-risk" },
];

const upcomingAudits = [
  { site: "Metro Bank HQ", framework: "ISO 18788", due: "Feb 14", owner: "K. Naidoo", risk: "High" },
  { site: "Sandton City Mall", framework: "POPIA", due: "Feb 18", owner: "L. Pietersen", risk: "Medium" },
  { site: "Vodacom World", framework: "PSIRA", due: "Feb 25", owner: "T. Khumalo", risk: "Low" },
];

const docExpirations = [
  { document: "PSIRA Certificates", site: "Discovery Head Office", expires: "9 days" },
  { document: "Fire Safety License", site: "Clearwater Mall", expires: "13 days" },
  { document: "CIT Route Approval", site: "Metro Bank HQ", expires: "21 days" },
  { document: "Guard Training Logs", site: "Dainfern Estate", expires: "30 days" },
];

const policyCoverage = [
  { label: "Incident Reporting", percent: 96, tone: "bg-portfolio-growth" },
  { label: "Access Control", percent: 88, tone: "bg-portfolio-primary" },
  { label: "CIT Chain of Custody", percent: 72, tone: "bg-portfolio-stable" },
  { label: "Patrol Compliance", percent: 81, tone: "bg-portfolio-primary" },
];

const riskStyles: Record<string, string> = {
  High: "bg-portfolio-risk/10 text-portfolio-risk border-portfolio-risk/20",
  Medium: "bg-portfolio-stable-light text-portfolio-stable border-portfolio-stable/30",
  Low: "bg-portfolio-bg text-portfolio-text-muted border-portfolio-border",
};

export function ComplianceContent() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-portfolio-text">Compliance Hub</h1>
        <p className="text-sm text-portfolio-text-muted">
          Audit readiness, document control, and policy adherence across all sites.
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
            <h2 className="text-lg font-semibold text-portfolio-text">Upcoming Audits</h2>
            <span className="text-sm text-portfolio-text-muted">Next 30 days</span>
          </div>
          <div className="space-y-3">
            {upcomingAudits.map((audit) => (
              <div key={audit.site} className="flex items-center justify-between rounded-lg border border-portfolio-border p-4">
                <div>
                  <p className="text-sm font-semibold text-portfolio-text">{audit.site}</p>
                  <p className="text-sm text-portfolio-text-muted mt-1">
                    {audit.framework} • Owner: {audit.owner}
                  </p>
                </div>
                <div className="text-right">
                  <span className={cn("text-xs font-semibold border rounded-full px-2 py-0.5", riskStyles[audit.risk])}>
                    {audit.risk} Risk
                  </span>
                  <p className="text-xs text-portfolio-text-muted mt-2">Due {audit.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-portfolio-text">Document Control</h2>
            <span className="text-sm text-portfolio-text-muted">Expiring soon</span>
          </div>
          <div className="space-y-3">
            {docExpirations.map((doc) => (
              <div key={`${doc.document}-${doc.site}`} className="rounded-lg border border-portfolio-border p-4">
                <p className="text-sm font-semibold text-portfolio-text">{doc.document}</p>
                <p className="text-sm text-portfolio-text-muted mt-1">{doc.site}</p>
                <p className="text-xs text-portfolio-risk mt-2">Expires in {doc.expires}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-portfolio-text">Policy Coverage</h2>
          <span className="text-sm text-portfolio-text-muted">Portfolio average</span>
        </div>
        <div className="space-y-4">
          {policyCoverage.map((policy) => (
            <div key={policy.label}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-portfolio-text">{policy.label}</p>
                <span className="text-sm text-portfolio-text-muted">{policy.percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-portfolio-bg">
                <div className={cn("h-2 rounded-full", policy.tone)} style={{ width: `${policy.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
