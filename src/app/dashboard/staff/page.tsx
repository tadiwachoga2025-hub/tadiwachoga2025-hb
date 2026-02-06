"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Users, UserCheck, Calendar, ShieldAlert } from "lucide-react";

const staff = [
  { name: "Sipho Ndlovu", role: "Guard", site: "Sandton City Mall", status: "active" as const, cert: "Valid" },
  { name: "Thandi Molefe", role: "Supervisor", site: "Rosebank Office Park", status: "active" as const, cert: "Valid" },
  { name: "Bongani Khumalo", role: "Guard", site: "OR Tambo Airport", status: "on-leave" as const, cert: "Expiring" },
  { name: "Nomsa Dlamini", role: "CIT Driver", site: "Fleet Operations", status: "active" as const, cert: "Valid" },
  { name: "Mpho Mokoena", role: "Guard", site: "Menlyn Park", status: "active" as const, cert: "Valid" },
  { name: "Lerato Sithole", role: "Control Room", site: "HQ Johannesburg", status: "active" as const, cert: "Valid" },
  { name: "Kagiso Mabena", role: "Guard", site: "Waterfall Estate", status: "inactive" as const, cert: "Expired" },
  { name: "Zanele Nkosi", role: "Supervisor", site: "Centurion Mall", status: "active" as const, cert: "Valid" },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "site", label: "Site Assignment" },
  { key: "status", label: "Status", render: (row: typeof staff[0]) => <StatusBadge status={row.status} /> },
  { key: "cert", label: "Certification", render: (row: typeof staff[0]) => (
    <span className={`text-sm font-medium ${row.cert === "Valid" ? "text-green-600" : row.cert === "Expiring" ? "text-amber-600" : "text-red-600"}`}>{row.cert}</span>
  )},
  { key: "actions", label: "Actions", render: () => <button className="text-sm font-medium text-teal hover:underline">View</button> },
];

export default function StaffDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Staff Management</h1>
          <p className="text-sm text-slate-muted">Manage your entire workforce from one place</p>
        </div>
        <button className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/90">+ Add Employee</button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Staff" value="2,847" trend="up" trendValue="+12%" icon={Users} />
        <MetricCard label="On Duty" value="1,234" trend="up" trendValue="+5%" icon={UserCheck} />
        <MetricCard label="On Leave" value="89" icon={Calendar} accent="warning" />
        <MetricCard label="Certs Expiring" value="12" icon={ShieldAlert} accent="danger" />
      </div>

      <DataTable columns={columns} data={staff} />
    </div>
  );
}
