"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import {
  LayoutDashboard,
  BarChart3,
  Activity,
  Settings,
  Search,
  Plus,
  ChevronRight,
  Menu,
  LogOut,
  Bell,
  Shield,
  Users,
  AlertTriangle,
  Truck,
  FileCheck,
} from "lucide-react";
import { SiteCard } from "@/components/portfolio/site-card";
import { CreateSiteModal } from "@/components/portfolio/create-site-modal";
import type { Site } from "@/components/portfolio/types";

// Navigation items for the icon rail
const navItems = [
  { icon: LayoutDashboard, href: "/portfolio", label: "Command Center" },
  { icon: Activity, href: "/portfolio/live", label: "Live Ops" },
  { icon: AlertTriangle, href: "/portfolio/incidents", label: "Incident Response" },
  { icon: Truck, href: "/portfolio/fleet", label: "Fleet & CIT" },
  { icon: FileCheck, href: "/portfolio/compliance", label: "Compliance Hub" },
  { icon: BarChart3, href: "/portfolio/analytics", label: "Analytics" },
  { icon: Settings, href: "/portfolio/settings", label: "Settings" },
];

// Mock sites data - Suburban Security client sites
const mockSites: Site[] = [
  {
    id: "1",
    name: "Metro Bank HQ",
    sector: "Finance",
    tier: "Enterprise",
    contractValue: 185000,
    complianceScore: 96,
    guardsAssigned: 12,
    lastIncident: -1,
    isHighPriority: false,
    siteManager: "James Moyo",
  },
  {
    id: "2",
    name: "Sandton City Mall",
    sector: "Retail",
    tier: "Enterprise",
    contractValue: 320000,
    complianceScore: 58,
    guardsAssigned: 24,
    lastIncident: 2,
    isHighPriority: true,
    siteManager: "Sarah Ndlovu",
  },
  {
    id: "3",
    name: "Netcare Sunninghill",
    sector: "Healthcare",
    tier: "Commercial",
    contractValue: 95000,
    complianceScore: 89,
    guardsAssigned: 8,
    lastIncident: 14,
    isHighPriority: false,
    siteManager: "Michael van der Berg",
  },
  {
    id: "4",
    name: "Discovery Head Office",
    sector: "Commercial",
    tier: "Enterprise",
    contractValue: 145000,
    complianceScore: 42,
    guardsAssigned: 6,
    lastIncident: 5,
    isHighPriority: true,
    siteManager: "Thabo Khumalo",
  },
  {
    id: "5",
    name: "Dainfern Estate",
    sector: "Residential",
    tier: "Residential",
    contractValue: 78000,
    complianceScore: 94,
    guardsAssigned: 6,
    lastIncident: -1,
    isHighPriority: false,
    siteManager: "Lisa Pietersen",
  },
  {
    id: "6",
    name: "Vodacom World",
    sector: "Commercial",
    tier: "Enterprise",
    contractValue: 210000,
    complianceScore: 91,
    guardsAssigned: 14,
    lastIncident: 21,
    isHighPriority: false,
    siteManager: "James Moyo",
  },
  {
    id: "7",
    name: "Clearwater Mall",
    sector: "Retail",
    tier: "Commercial",
    contractValue: 125000,
    complianceScore: 65,
    guardsAssigned: 2,
    lastIncident: 1,
    isHighPriority: true,
    siteManager: "Sarah Ndlovu",
  },
  {
    id: "8",
    name: "Bryanston Industrial",
    sector: "Industrial",
    tier: "Commercial",
    contractValue: 55000,
    complianceScore: 88,
    guardsAssigned: 4,
    lastIncident: 45,
    isHighPriority: false,
    siteManager: "Thabo Khumalo",
  },
];

type FilterType = "all" | "high-priority" | "enterprise";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  // Filter sites
  const filteredSites = mockSites.filter((site) => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "high-priority" && site.isHighPriority) ||
      (filter === "enterprise" && site.tier === "Enterprise");
    return matchesSearch && matchesFilter;
  });

  // Get current page title
  const getPageTitle = () => {
    if (pathname === "/portfolio") return "Operations Command Center";
    if (pathname === "/portfolio/live") return "Live Operations";
    if (pathname === "/portfolio/incidents") return "Incident Response";
    if (pathname === "/portfolio/fleet") return "Fleet & CIT";
    if (pathname === "/portfolio/compliance") return "Compliance Hub";
    if (pathname === "/portfolio/analytics") return "Analytics & Reports";
    if (pathname === "/portfolio/settings") return "Settings";
    return "Suburban Security";
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-portfolio-bg">
        <div className="text-center" role="status" aria-live="polite">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-portfolio-primary border-t-transparent" />
          <p className="mt-4 text-portfolio-text-muted">Loading operations dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-portfolio-bg font-inter overflow-hidden">
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-portfolio-primary focus:text-black focus:px-4 focus:py-2 focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Icon Navigation Rail */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-14 flex-col bg-black">
        <div className="flex flex-col items-center py-4 gap-1">
          {/* Logo */}
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center mb-4">
            <Shield className="w-5 h-5 text-black" />
          </div>

          {/* Nav items */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                  isActive
                    ? "bg-portfolio-primary text-black"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                )}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto pb-4 flex flex-col items-center">
          <button
            onClick={logout}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Sites Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 z-40 w-[300px] flex-col bg-white border-r border-portfolio-border transition-transform lg:ml-14",
          "lg:flex",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sites header */}
        <div className="p-4 border-b border-portfolio-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-portfolio-primary" />
              <h2 className="font-semibold text-base text-portfolio-text">Client Sites</h2>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-portfolio-primary text-black text-sm font-medium hover:bg-portfolio-primary-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              New
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-portfolio-text-muted" />
            <input
              type="text"
              placeholder="Search sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md border border-portfolio-border bg-portfolio-bg text-sm focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {[
              { key: "all" as FilterType, label: "All" },
              { key: "high-priority" as FilterType, label: "Priority", icon: AlertTriangle },
              { key: "enterprise" as FilterType, label: "Enterprise" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "px-3.5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5",
                  filter === f.key
                    ? f.key === "high-priority"
                      ? "bg-portfolio-risk text-white"
                      : "bg-portfolio-primary text-black"
                    : "bg-portfolio-bg text-portfolio-text-muted hover:bg-portfolio-border"
                )}
              >
                {f.icon && <f.icon className="w-4 h-4" />}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sites list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredSites.map((site) => (
            <SiteCard
              key={site.id}
              site={site}
              isSelected={selectedSiteId === site.id}
              onClick={() => setSelectedSiteId(site.id)}
            />
          ))}

          {filteredSites.length === 0 && (
            <div className="text-center py-6 text-portfolio-text-muted">
              <p className="text-sm">No sites found</p>
            </div>
          )}
        </div>

        {/* Sites summary */}
        <div className="p-4 border-t border-portfolio-border bg-portfolio-bg">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-xl font-bold text-portfolio-text">{mockSites.length}</p>
              <p className="text-xs text-portfolio-text-muted">Total Sites</p>
            </div>
            <div>
              <p className="text-xl font-bold text-portfolio-risk">
                {mockSites.filter((s) => s.isHighPriority).length}
              </p>
              <p className="text-xs text-portfolio-text-muted">Need Attention</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:ml-[calc(56px+300px)] min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-portfolio-border bg-white px-6 flex-shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-md hover:bg-portfolio-bg"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5 text-portfolio-text" />
          </button>

          {/* Breadcrumb */}
          <nav className="hidden lg:flex items-center gap-2 text-sm min-w-0">
            <Link href="/portfolio" className="text-portfolio-text-muted hover:text-portfolio-text flex items-center gap-1 flex-shrink-0">
              <Shield className="w-4 h-4" />
              Suburban Security
            </Link>
            <ChevronRight className="w-4 h-4 text-portfolio-text-muted flex-shrink-0" />
            <span className="font-medium text-portfolio-text truncate">{getPageTitle()}</span>
          </nav>

          {/* Global search */}
          <div className="flex-1 max-w-md mx-auto hidden md:block min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-portfolio-text-muted" />
              <input
                type="text"
                placeholder="Search operations..."
                className="w-full pl-10 pr-3 py-2 rounded-md border border-portfolio-border bg-portfolio-bg text-sm focus:outline-none focus:ring-2 focus:ring-portfolio-primary focus:border-transparent truncate"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto flex-shrink-0">
            <button className="relative p-1.5 rounded-md hover:bg-portfolio-bg transition-colors flex-shrink-0">
              <Bell className="w-5 h-5 text-portfolio-text-muted" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-portfolio-risk rounded-full" />
            </button>

            {/* User avatar */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 min-w-0 rounded-lg px-1.5 py-1 hover:bg-portfolio-bg transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-portfolio-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-semibold text-sm">
                    {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div className="hidden lg:block min-w-0 text-left">
                  <p className="text-sm font-medium text-portfolio-text truncate">{user.name}</p>
                  <p className="text-xs text-portfolio-text-muted truncate">{user.role}</p>
                </div>
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-64 rounded-lg border border-portfolio-border bg-white shadow-portfolio-lg z-30 overflow-hidden"
                >
                  <div className="flex items-center gap-3 px-4 py-4">
                    <div className="w-10 h-10 rounded-full bg-portfolio-primary flex items-center justify-center">
                      <span className="text-black font-semibold text-sm">
                        {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-portfolio-text truncate">{user.name}</p>
                      <p className="text-xs text-portfolio-text-muted truncate">{user.role}</p>
                    </div>
                  </div>
                  <div className="h-px bg-portfolio-border" />
                  <button
                    onClick={logout}
                    role="menuitem"
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-portfolio-risk hover:bg-portfolio-risk-light transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main id="main-content" className="flex-1 p-4 lg:p-6 overflow-auto min-h-0">
          {children}
        </main>
      </div>

      {/* Create Site Modal */}
      <CreateSiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log("New site:", data);
        }}
      />
    </div>
  );
}
