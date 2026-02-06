"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ShieldCheck, FileCheck, Clock, AlertOctagon } from "lucide-react";

const isoItems = [
  { label: "Quality Manual", pct: 100 },
  { label: "Operational Procedures", pct: 96 },
  { label: "Risk Assessments", pct: 88 },
  { label: "Management Reviews", pct: 92 },
];

const psiraItems = [
  { label: "Company Registration", status: "active" as const },
  { label: "Grade A Licenses", status: "active" as const },
  { label: "Grade B Licenses", status: "pending" as const },
  { label: "Annual Returns", status: "active" as const },
];

const docs = [
  { name: "ISO 9001 Quality Manual v4.2", type: "Policy", status: "active" as const, expiry: "2026-12-31", assigned: "Zanele Nkosi" },
  { name: "PSIRA Annual Return 2026", type: "Compliance", status: "active" as const, expiry: "2026-06-30", assigned: "John Admin" },
  { name: "Fire Safety Certificate - HQ", type: "Certificate", status: "pending" as const, expiry: "2026-03-15", assigned: "Sipho Ndlovu" },
  { name: "Armed Response SOP", type: "Procedure", status: "active" as const, expiry: "2027-01-01", assigned: "Thandi Molefe" },
  { name: "CIT Risk Assessment v2.1", type: "Assessment", status: "alert" as const, expiry: "2026-02-01", assigned: "Bongani Khumalo" },
  { name: "Employee Code of Conduct", type: "Policy", status: "active" as const, expiry: "2027-06-30", assigned: "Lerato Sithole" },
];

const columns = [
  { key: "name", label: "Document", render: (r: typeof docs[0]) => <span className="font-medium">{r.name}</span> },
  { key: "type", label: "Type" },
  { key: "status", label: "Status", render: (r: typeof docs[0]) => <StatusBadge status={r.status} /> },
  { key: "expiry", label: "Expiry Date" },
  { key: "assigned", label: "Assigned To" },
  { key: "actions", label: "", render: () => <button className="text-sm font-medium text-teal hover:underline">View</button> },
];

export default function ComplianceDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Compliance & Documentation</h1>
          <p className="text-sm text-slate-muted">Manage regulatory compliance and document control</p>
        </div>
        <button className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/90">Upload Document</button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Overall Compliance" value="94.2%" icon={ShieldCheck} accent="success" />
        <MetricCard label="Documents Current" value="312" icon={FileCheck} />
        <MetricCard label="Expiring Soon" value="18" icon={Clock} accent="warning" />
        <MetricCard label="Overdue" value="3" icon={AlertOctagon} accent="danger" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="ISO 9001:2015 Status">
          <div className="flex flex-col gap-5">
            {isoItems.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-dark">{item.label}</span>
                  <span className={`font-semibold ${item.pct >= 95 ? "text-green-600" : item.pct >= 90 ? "text-amber-600" : "text-red-600"}`}>{item.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-light-bg">
                  <div className={`h-full rounded-full ${item.pct >= 95 ? "bg-green-500" : item.pct >= 90 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
        <DashboardCard title="PSIRA Compliance">
          <div className="flex flex-col gap-4">
            {psiraItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg bg-slate-light-bg p-4">
                <span className="text-sm font-medium text-dark">{item.label}</span>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <DataTable columns={columns} data={docs} />
    </div>
  );
}
