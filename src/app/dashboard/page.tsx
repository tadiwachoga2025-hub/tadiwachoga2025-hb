import type { Metadata } from "next";
import { MetricCard } from "@/components/dashboard/metric-card";

export const metadata: Metadata = {
  title: "Executive Dashboard | Suburban Security",
  description: "Real-time overview of your security operations — incidents, staff, fleet, and compliance at a glance.",
};
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Users, Activity, Truck, AlertTriangle } from "lucide-react";

const alerts = [
  { color: "bg-red-500", text: "Critical: Guard not checked in at Site B12", time: "2 min ago" },
  { color: "bg-amber-500", text: "Vehicle V-042 deviated from CIT route", time: "15 min ago" },
  { color: "bg-blue-500", text: "3 certifications expiring this week", time: "1 hr ago" },
  { color: "bg-amber-500", text: "Shift gap detected: Night shift Site A3", time: "2 hrs ago" },
  { color: "bg-green-500", text: "Incident #1847 resolved successfully", time: "3 hrs ago" },
];

const compliance = [
  { label: "PSIRA Registrations", pct: 98 },
  { label: "ISO 9001 Documents", pct: 94 },
  { label: "Training Certificates", pct: 91 },
  { label: "Firearm Licenses", pct: 87 },
];

export default function ExecutiveDashboard() {
  const today = new Date().toLocaleDateString("en-ZA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-dark">Good morning, John</h1>
        <p className="text-sm text-slate-muted">{today} · Executive Overview</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Guards" value="2,847" trend="up" trendValue="+12%" icon={Users} />
        <MetricCard label="Active Shifts" value="1,234" trend="up" trendValue="+5%" icon={Activity} />
        <MetricCard label="Fleet Vehicles" value="186" trend="down" trendValue="-2%" icon={Truck} />
        <MetricCard label="Open Incidents" value="23" trend="down" trendValue="-18%" icon={AlertTriangle} accent="danger" />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardCard title="Incident Trends (30 Days)" action="View Report">
            <div className="flex h-[300px] items-end gap-2 rounded-lg bg-slate-light-bg p-6" role="img" aria-label="Bar chart showing incident trends over the last 12 months">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 68].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-teal to-cyan transition-all duration-300 hover:from-black hover:to-teal"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-slate-muted">
                    {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
                  </span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
        <DashboardCard title="Recent Alerts">
          <div className="flex flex-col gap-4">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.color}`} />
                <div className="flex-1">
                  <p className="text-sm text-dark">{a.text}</p>
                  <p className="text-xs text-slate-light-muted">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Staff Utilization">
          <div className="flex h-[200px] items-center justify-center gap-8 rounded-lg bg-slate-light-bg p-6" role="img" aria-label="Staff utilization: 72% on duty, 15% off duty, 10% on leave, 3% training">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E0E0E0" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2B5F6F" strokeWidth="3" strokeDasharray="72 28" strokeLinecap="round" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#00BCD4" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-72" strokeLinecap="round" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#FFC300" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-87" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-dark">72%</span>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-teal" /><span className="text-dark">On Duty (72%)</span></div>
              <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-cyan" /><span className="text-dark">Off Duty (15%)</span></div>
              <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-primary" /><span className="text-dark">On Leave (10%)</span></div>
              <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-slate-border" /><span className="text-dark">Training (3%)</span></div>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard title="Compliance Status">
          <div className="flex flex-col gap-5">
            {compliance.map((c) => (
              <div key={c.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-dark">{c.label}</span>
                  <span className={`font-semibold ${c.pct >= 95 ? "text-green-600" : c.pct >= 90 ? "text-amber-600" : "text-red-600"}`}>{c.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-light-bg">
                  <div className={`h-full rounded-full ${c.pct >= 95 ? "bg-green-500" : c.pct >= 90 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
