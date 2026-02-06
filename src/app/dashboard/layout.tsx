"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { LayoutDashboard, Settings, Users, Truck, Shield, AlertTriangle, FileText, Menu, X, LogOut } from "lucide-react";

const navSections = [
  {
    title: "MAIN",
    items: [
      { label: "Executive", href: "/dashboard", icon: LayoutDashboard },
      { label: "Operations", href: "/solutions/operations", icon: Settings },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Staff", href: "/dashboard/staff", icon: Users },
      { label: "Fleet & CIT", href: "/dashboard/fleet", icon: Truck },
      { label: "Compliance", href: "/dashboard/compliance", icon: Shield },
      { label: "Incidents", href: "/dashboard/incidents", icon: AlertTriangle },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Reports", href: "#", icon: FileText },
      { label: "Settings", href: "#", icon: Settings },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-light-bg">
        <div className="text-center" role="status" aria-live="polite">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" aria-hidden="true"></div>
          <p className="mt-4 text-slate-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-light-bg">
      {/* Skip navigation for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col bg-dark transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-8 py-6">
          <p className="text-base font-extrabold text-white">SUBURBAN</p>
          <p className="text-xs font-extrabold tracking-widest text-primary">SECURITY</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2">
          {navSections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="mb-2 px-4 font-mono text-[10px] font-semibold tracking-widest text-slate-lighter-muted">{section.title}</p>
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition",
                      "focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2 focus:ring-offset-dark",
                      active ? "bg-white/[0.06] font-medium text-white border-l-2 border-primary" : "text-slate-lighter-muted hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-black">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-light-muted truncate">{user.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-slate-lighter-muted hover:bg-white/[0.04] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2 focus:ring-offset-dark"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-border bg-white px-6 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="dashboard-sidebar"
          >
            <Menu className="h-6 w-6 text-dark" />
          </button>
          <p className="text-sm font-extrabold text-black">SUBURBAN SECURITY</p>
        </header>
        <main id="main-content" className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
