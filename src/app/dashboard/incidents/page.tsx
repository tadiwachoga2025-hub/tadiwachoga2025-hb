"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { AlertTriangle, AlertOctagon, Search, CheckCircle } from "lucide-react";

const incidents = [
  { id: "INC-1847", type: "Unauthorized Access", severity: "Critical", location: "Sandton City Mall", status: "active" as const, reporter: "Sipho Ndlovu", date: "2026-02-05" },
  { id: "INC-1846", type: "Equipment Theft", severity: "High", location: "Rosebank Office Park", status: "active" as const, reporter: "Thandi Molefe", date: "2026-02-04" },
  { id: "INC-1845", type: "Vehicle Accident", severity: "Medium", location: "N1 Highway", status: "pending" as const, reporter: "Nomsa Dlamini", date: "2026-02-04" },
  { id: "INC-1844", type: "Fire Alarm", severity: "High", location: "Menlyn Park", status: "resolved" as const, reporter: "Mpho Mokoena", date: "2026-02-03" },
  { id: "INC-1843", type: "Trespassing", severity: "Low", location: "Waterfall Estate", status: "resolved" as const, reporter: "Kagiso Mabena", date: "2026-02-03" },
  { id: "INC-1842", type: "Armed Robbery", severity: "Critical", location: "CIT Route R21", status: "active" as const, reporter: "Samuel Obi", date: "2026-02-02" },
];

const recentIncidents = [
  { severity: "bg-red-500", text: "Armed robbery attempt on CIT Route R21", time: "3 hrs ago" },
  { severity: "bg-red-500", text: "Unauthorized access at Sandton City Mall", time: "5 hrs ago" },
  { severity: "bg-amber-500", text: "Equipment theft reported at Rosebank", time: "1 day ago" },
  { severity: "bg-blue-500", text: "Vehicle accident on N1 - under review", time: "1 day ago" },
  { severity: "bg-green-500", text: "Fire alarm resolved at Menlyn Park", time: "2 days ago" },
];

const sevColor: Record<string, string> = { Critical: "text-red-600 bg-red-50", High: "text-amber-600 bg-amber-50", Medium: "text-blue-600 bg-blue-50", Low: "text-slate-600 bg-slate-100" };

const columns = [
  { key: "id", label: "ID", render: (r: typeof incidents[0]) => <span className="font-mono font-semibold">{r.id}</span> },
  { key: "type", label: "Type" },
  { key: "severity", label: "Severity", render: (r: typeof incidents[0]) => <span className={`rounded-full px-3 py-1 text-xs font-semibold ${sevColor[r.severity]}`}>{r.severity}</span> },
  { key: "location", label: "Location" },
  { key: "status", label: "Status", render: (r: typeof incidents[0]) => <StatusBadge status={r.status} /> },
  { key: "reporter", label: "Reported By" },
  { key: "date", label: "Date" },
];

export default function IncidentsDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Incident Management</h1>
          <p className="text-sm text-slate-muted">Track, investigate, and resolve security incidents</p>
        </div>
        <button className="rounded-lg bg-danger px-6 py-3 text-sm font-semibold text-white hover:bg-red-700">Report Incident</button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Incidents" value="23" icon={AlertTriangle} />
        <MetricCard label="Critical" value="3" icon={AlertOctagon} accent="danger" />
        <MetricCard label="Under Investigation" value="8" icon={Search} accent="warning" />
        <MetricCard label="Resolved This Month" value="45" trend="up" trendValue="+22%" icon={CheckCircle} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardCard title="Incident Severity Breakdown">
            <div className="flex h-[280px] items-end justify-center gap-10 rounded-lg bg-slate-light-bg p-8" role="img" aria-label="Incident severity: Critical 3, High 8, Medium 7, Low 5">
              {[
                { label: "Critical", value: 3, max: 8, color: "bg-red-500" },
                { label: "High", value: 8, max: 8, color: "bg-amber-500" },
                { label: "Medium", value: 7, max: 8, color: "bg-blue-500" },
                { label: "Low", value: 5, max: 8, color: "bg-slate-400" },
              ].map((bar) => (
                <div key={bar.label} className="flex flex-col items-center gap-2">
                  <span className="text-sm font-bold text-dark">{bar.value}</span>
                  <div
                    className={`w-14 rounded-t-md ${bar.color} transition-all duration-300`}
                    style={{ height: `${(bar.value / bar.max) * 160}px` }}
                  />
                  <span className="text-xs text-slate-muted">{bar.label}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
        <DashboardCard title="Recent Incidents">
          <div className="flex flex-col gap-4">
            {recentIncidents.map((r, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${r.severity}`} />
                <div>
                  <p className="text-sm text-dark">{r.text}</p>
                  <p className="text-xs text-slate-light-muted">{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <DataTable columns={columns} data={incidents} />
    </div>
  );
}
