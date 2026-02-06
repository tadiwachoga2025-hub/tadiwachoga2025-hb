"use client";

import { useState } from "react";
import Link from "next/link";
// metadata exported from a separate file since this is a client component
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  { n: 1, title: "Smart Staff Scheduling", desc: "AI-powered auto-scheduling considers certifications, availability, and site requirements. Drag-and-drop interface with conflict detection and instant gap coverage suggestions." },
  { n: 2, title: "GPS-Verified Timesheets", desc: "Mobile clock-in/out with GPS verification and geofencing. Real-time attendance tracking, automatic overtime calculations, and photo verification for enhanced accountability." },
  { n: 3, title: "One-Click Payroll Generation", desc: "Transform approved timesheets into payroll-ready exports in minutes. Automatic tax calculations, leave deductions, and direct integration with major accounting platforms." },
  { n: 4, title: "Central Employee Database", desc: "Complete digital personnel files with certification tracking, training records, and document management. Automated expiry alerts ensure compliance is never at risk." },
  { n: 5, title: "Real-Time Shift Management", desc: "Instant shift swap requests, supervisor approvals, and automated coverage alerts. Guards see their schedules in real-time while supervisors maintain full visibility across all sites." },
  { n: 6, title: "Workforce Analytics", desc: "Labor cost insights, utilization metrics, and trend analysis. Identify inefficiencies, forecast staffing needs, and make data-driven decisions to optimize your security operations." },
];

const steps = [
  { n: 1, title: "Import Your Data", desc: "Upload your existing staff records, site information, and scheduling requirements. Our system maps your data automatically." },
  { n: 2, title: "Configure & Automate", desc: "Set scheduling rules, compliance requirements, and approval workflows. The system learns your preferences and automates repetitive tasks." },
  { n: 3, title: "Monitor & Optimize", desc: "Track real-time operations, review analytics, and continuously improve efficiency. Generate payroll and reports with a single click." },
];

const stats = [
  { value: "85%", label: "Reduction in Scheduling Time" },
  { value: "99.2%", label: "Timesheet Accuracy Rate" },
  { value: "3 Min", label: "Payroll Generation Time" },
  { value: "40%", label: "Lower Admin Overhead" },
];

const before = ["Hours spent building schedules in spreadsheets", "Paper timesheets prone to buddy-punching", "Payroll errors costing thousands monthly", "No visibility into field staff location", "Expired certifications going unnoticed", "Shift gaps discovered at the last minute"];
const after = ["Auto-generated schedules in seconds", "GPS-verified digital clock-in/out", "Error-free payroll generated in 3 minutes", "Live map view of all deployed guards", "Automated certification expiry alerts", "AI-suggested replacements fill gaps instantly"];

const integrations = ["Sage Payroll", "QuickBooks", "Xero", "Google Maps", "Microsoft 365", "PSIRA Portal"];

const faqs = [
  { q: "How long does implementation take?", a: "Most companies are fully operational within 2–4 weeks. We handle data migration, system configuration, and staff training as part of our onboarding package." },
  { q: "Can I import our existing staff and scheduling data?", a: "Yes. We support bulk imports from Excel, CSV, and direct integrations with Sage, QuickBooks, and other HR platforms. Our team assists with data mapping." },
  { q: "Does it work offline for guards in the field?", a: "Absolutely. The mobile app stores schedules and allows clock-in/out offline. Data syncs automatically when connectivity is restored — no entries are ever lost." },
  { q: "Is our data secure and POPIA compliant?", a: "Yes. All data is encrypted at rest and in transit. We are fully POPIA compliant with role-based access controls, audit logging, and regular third-party security assessments." },
];

const modules = [
  { badge: "MODULE 2", title: "Dashboards & Analytics", desc: "Real-time KPIs, custom reporting, and executive dashboards across all operations.", href: "/dashboard" },
  { badge: "MODULE 3", title: "Fleet & CIT Management", desc: "GPS tracking, secure CIT routes, route deviation alerts, and vehicle maintenance.", href: "/dashboard/fleet" },
  { badge: "MODULE 4", title: "Compliance & Incidents", desc: "ISO 9001 document control, incident tracking, and automated compliance alerts.", href: "/dashboard/compliance" },
];

export default function OperationsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 bg-slate-light-bg px-6 py-24 text-center lg:px-20">
        <Badge text="MODULE 1" />
        <h1 className="max-w-3xl text-4xl font-bold text-dark lg:text-5xl">Operations Management</h1>
        <p className="max-w-2xl text-lg text-slate-muted">Automate scheduling, streamline payroll, and manage your entire workforce from one centralized platform.</p>
      </section>

      {/* Features */}
      <section className="px-6 py-24 lg:px-20">
        <SectionHeader badge="KEY FEATURES" headline="Streamline Your Entire Workforce Operations" subheadline="Six powerful tools designed to eliminate manual processes and boost operational efficiency" />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.n} className="flex flex-col gap-5 rounded-2xl bg-slate-light-bg p-8 lg:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-black">{f.n}</div>
              <h3 className="text-xl font-bold text-dark">{f.title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-light-bg px-6 py-24 lg:px-20">
        <SectionHeader badge="HOW IT WORKS" headline="From Chaos to Control in Three Steps" />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col items-center gap-6 rounded-2xl bg-white p-10 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-[28px] font-bold text-black">{s.n}</div>
              <h3 className="text-xl font-bold text-dark">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark px-6 py-24 text-center lg:px-20">
        <p className="font-mono text-sm font-semibold text-primary">PROVEN RESULTS</p>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-[40px]">The Impact of Automated Operations</h2>
        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/[0.06] p-8 lg:p-10">
              <p className="text-4xl font-extrabold text-primary lg:text-5xl">{s.value}</p>
              <p className="mt-3 text-base text-slate-lighter-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before vs After */}
      <section className="px-6 py-24 lg:px-20">
        <SectionHeader badge="THE DIFFERENCE" badgeVariant="red" headline="Manual Processes vs. Suburban Security" />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 lg:p-10">
            <h3 className="mb-6 text-[22px] font-bold text-red-600">Before — Manual Operations</h3>
            <div className="flex flex-col gap-4">
              {before.map((b) => (<p key={b} className="text-[15px] text-slate-muted">✕&nbsp;&nbsp;{b}</p>))}
            </div>
          </div>
          <div className="rounded-2xl border border-green-200 bg-green-50 p-8 lg:p-10">
            <h3 className="mb-6 text-[22px] font-bold text-green-600">After — With Suburban Security</h3>
            <div className="flex flex-col gap-4">
              {after.map((a) => (<p key={a} className="text-[15px] text-slate-muted">✓&nbsp;&nbsp;{a}</p>))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="flex flex-col items-center gap-8 bg-slate-light-bg px-6 py-24 text-center lg:px-28">
        <span className="text-7xl font-primary text-black">&ldquo;</span>
        <p className="max-w-3xl text-xl font-medium leading-relaxed text-dark lg:text-2xl lg:leading-relaxed">
          We used to spend 12 hours a week on scheduling alone. With Suburban Security, it takes 30 minutes — and the system catches conflicts we never would have seen. Payroll went from a 3-day nightmare to a 3-minute task.
        </p>
        <div>
          <p className="font-bold text-dark">David Mthembu</p>
          <p className="text-sm text-slate-muted">Operations Director, Fortis Security Group</p>
        </div>
      </section>

      {/* Integrations */}
      <section className="px-6 py-24 lg:px-20">
        <SectionHeader badge="SEAMLESS INTEGRATIONS" headline="Works With Your Existing Systems" subheadline="Connect Suburban Security with the tools you already use — no disruption to your workflow." />
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {integrations.map((name) => (
            <div key={name} className="flex w-[180px] flex-col items-center gap-4 rounded-xl border border-slate-border bg-slate-light-bg p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-xl font-extrabold text-black">{name[0]}</div>
              <p className="text-sm font-semibold text-dark">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-light-bg px-6 py-24 lg:px-48">
        <SectionHeader badge="FREQUENTLY ASKED QUESTIONS" headline="Got Questions? We Have Answers" />
        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-slate-border bg-white">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between p-6 text-left">
                <span className="text-[17px] font-bold text-dark">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-slate-muted transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-slate-border"
                  >
                    <div className="px-6 pb-6 pt-4">
                      <p className="text-[15px] leading-relaxed text-slate-muted">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Other Modules */}
      <section className="px-6 py-24 lg:px-20">
        <SectionHeader badge="EXPLORE THE PLATFORM" headline="Other Modules You'll Love" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {modules.map((m) => (
            <div key={m.title} className="flex flex-col gap-4 rounded-2xl border border-slate-border bg-slate-light-bg p-8">
              <span className="w-fit rounded-lg bg-primary/15 border border-primary/30 px-3 py-1.5 font-mono text-[11px] font-semibold text-dark">{m.badge}</span>
              <h3 className="text-lg font-bold text-dark">{m.title}</h3>
              <p className="text-sm text-slate-muted">{m.desc}</p>
              <Link href={m.href} className="text-sm font-semibold text-teal hover:underline">Learn more →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-10 bg-black px-6 py-28 text-center lg:px-20">
        <h2 className="max-w-2xl text-3xl font-bold text-white lg:text-[40px] lg:leading-tight">Ready to Transform Your Operations?</h2>
        <p className="max-w-xl text-lg text-white/70">Join leading security companies already saving 20+ hours per week on scheduling, timesheets, and payroll.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-lg bg-primary px-8 py-4 font-bold text-black hover:bg-primary-dark">Request a Demo</Link>
          <Link href="/solutions/operations" className="rounded-lg border border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10">View All Modules</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
