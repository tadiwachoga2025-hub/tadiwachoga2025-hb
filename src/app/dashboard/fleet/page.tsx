"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Truck, Navigation, ShieldCheck, Wrench } from "lucide-react";

const vehicles = [
  { id: "V-001", type: "CIT Van", driver: "Nomsa Dlamini", status: "active" as const, location: "N1 Highway, JHB", updated: "2 min ago" },
  { id: "V-012", type: "Patrol Car", driver: "Thabo Maseko", status: "active" as const, location: "Sandton CBD", updated: "5 min ago" },
  { id: "V-023", type: "CIT Van", driver: "Pieter van Wyk", status: "active" as const, location: "M2 Motorway", updated: "1 min ago" },
  { id: "V-034", type: "Response Unit", driver: "Lindiwe Zulu", status: "active" as const, location: "Rosebank", updated: "8 min ago" },
  { id: "V-042", type: "CIT Van", driver: "Samuel Obi", status: "alert" as const, location: "Route Deviation - R21", updated: "15 min ago" },
  { id: "V-055", type: "Patrol Car", driver: "—", status: "inactive" as const, location: "HQ Depot", updated: "Maintenance" },
];

const citRoutes = [
  { route: "JHB-PTA Express", status: "On Schedule", color: "text-green-600" },
  { route: "Sandton Cash Run", status: "In Transit", color: "text-blue-600" },
  { route: "East Rand Circuit", status: "Delayed", color: "text-amber-600" },
  { route: "Centurion Loop", status: "On Schedule", color: "text-green-600" },
];

const columns = [
  { key: "id", label: "Vehicle ID", render: (r: typeof vehicles[0]) => <span className="font-mono font-semibold">{r.id}</span> },
  { key: "type", label: "Type" },
  { key: "driver", label: "Driver" },
  { key: "status", label: "Status", render: (r: typeof vehicles[0]) => <StatusBadge status={r.status} /> },
  { key: "location", label: "Location" },
  { key: "updated", label: "Last Updated", render: (r: typeof vehicles[0]) => <span className="text-slate-light-muted">{r.updated}</span> },
];

export default function FleetDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Fleet & CIT Management</h1>
          <p className="text-sm text-slate-muted">Track vehicles and manage cash-in-transit operations</p>
        </div>
        <button className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/90">Track Vehicle</button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Vehicles" value="186" icon={Truck} />
        <MetricCard label="Active Routes" value="42" trend="up" trendValue="+3" icon={Navigation} />
        <MetricCard label="CIT Missions" value="18" icon={ShieldCheck} accent="success" />
        <MetricCard label="Maintenance Due" value="7" icon={Wrench} accent="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardCard title="Live Fleet Map">
            <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-slate-light-bg to-background-light" role="img" aria-label="Live GPS map showing vehicle locations across Gauteng">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #2B5F6F 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              {[
                { top: "30%", left: "40%" },
                { top: "55%", left: "60%" },
                { top: "25%", left: "70%" },
                { top: "65%", left: "35%" },
                { top: "45%", left: "50%" },
              ].map((pos, i) => (
                <div key={i} className="absolute" style={pos}>
                  <div className="h-3 w-3 rounded-full bg-teal animate-pulse" />
                  <div className="absolute inset-0 h-3 w-3 rounded-full bg-teal/30 animate-ping" />
                </div>
              ))}
              <p className="relative z-10 rounded-lg bg-white/80 px-4 py-2 text-sm font-medium text-dark backdrop-blur-sm">
                Live GPS Tracking &mdash; Gauteng Region
              </p>
            </div>
          </DashboardCard>
        </div>
        <DashboardCard title="Active CIT Routes">
          <div className="flex flex-col gap-4">
            {citRoutes.map((r) => (
              <div key={r.route} className="flex items-center justify-between rounded-lg bg-slate-light-bg p-3">
                <span className="text-sm font-medium text-dark">{r.route}</span>
                <span className={`text-xs font-semibold ${r.color}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <DataTable columns={columns} data={vehicles} />
    </div>
  );
}
