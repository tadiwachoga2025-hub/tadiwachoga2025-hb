"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldAlert, Clock, Eye, LucideIcon, LayoutDashboard, Activity, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { FeatureCard } from "@/components/feature-card";
import { fadeUp, viewportOnce, duration } from "@/lib/motion";

// Features data
const features = [
  { number: 1, title: "Operations Management", description: "Automated staff scheduling, central employee database, GPS-verified mobile timesheets, and payroll generation in minutes." },
  { number: 2, title: "Dashboards & Analytics", description: "Real-time KPIs across incidents, staff utilization, compliance status, and fleet metrics with custom reporting." },
  { number: 3, title: "Fleet & CIT Management", description: "Real-time GPS tracking, secure CIT routes with 'next-stop-only' driver visibility, route deviation alerts, and maintenance tracking." },
  { number: 4, title: "Compliance & Incident Mgmt", description: "ISO 9001:2015 document control, automated license/certification alerts, and centralized incident tracking." },
  { number: 5, title: "Mobile Applications (iOS & Android)", description: "Guards: clock-in/out, schedules, incident reporting. Drivers: secure navigation, panic button. Supervisors: live staff visibility, approvals." },
  { number: 6, title: "AI-Powered Insights", description: "Predictive analytics for threat detection, automated anomaly alerts, intelligent resource allocation, and machine learning-driven performance optimization." },
];

// Problems data
interface Problem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const problems: Problem[] = [
  { icon: ShieldAlert, title: "Scattered Systems", desc: "Multiple disconnected tools for scheduling, HR, fleet, and compliance create data silos and communication gaps." },
  { icon: Clock, title: "Manual Processes", desc: "Paper timesheets, spreadsheet schedules, and manual payroll drain hours of administrative time every week." },
  { icon: Eye, title: "Zero Visibility", desc: "No real-time view of field operations means problems are discovered after the fact, not prevented." },
];

// Why Section
export function WhySection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative px-6 lg:px-16 py-28 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary/[0.01] to-white pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          badge="WHY SUBURBAN SECURITY"
          headline="The Security Industry Deserves Better Tools"
          subheadline="Most security companies still rely on fragmented, outdated systems that create more problems than they solve."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {problems.map((p, i) => (
            <FeatureCard
              key={p.title}
              number={i + 1}
              title={p.title}
              description={p.desc}
              icon={p.icon}
              delay={i}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Solution Section
export function SolutionSection() {
  const solutions = [
    { title: "Unified Dashboard", desc: "See all operations at a glance with real-time metrics and alerts.", icon: LayoutDashboard },
    { title: "Real-Time Tracking", desc: "Know where every guard and vehicle is at every moment.", icon: Activity },
    { title: "Automated Compliance", desc: "Never miss an expiring certificate or overdue document again.", icon: ShieldCheck },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative px-6 lg:px-16 py-28 overflow-hidden bg-dark"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,195,0,0.05),transparent)] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              badge="OUR APPROACH"
              badgeVariant="dark"
              headline="One Platform. Complete Control."
              subheadline="Suburban Security replaces scattered tools with a single, intelligent platform that connects every part of your security operations."
              light
              align="left"
            />
            <div className="mt-12 grid gap-6">
              {solutions.map((item, i) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-black flex-shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] overflow-hidden rounded-3xl group"
          >
            <Image
              src="/images/hero-security.png"
              alt="Security team in action"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Features Section
export function FeaturesSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative px-6 lg:px-16 py-28 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary/[0.02] to-white pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          badge="CORE CAPABILITIES"
          headline="Six Integrated Modules for Complete Security Management"
          subheadline="Everything you need to run modern security operations, unified in one intelligent platform."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((f, index) => (
            <FeatureCard key={f.number} {...f} delay={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// CTA Section
export function CTASection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative flex flex-col items-center gap-10 bg-black px-6 lg:px-16 py-32 text-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-security.png"
          alt="Security background"
          fill
          className="object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <h2 className="max-w-3xl text-[44px] font-black leading-tight text-white tracking-tight">
          Ready to Modernize Your Security Operations?
        </h2>
        <p className="max-w-xl text-xl text-white/70">
          Join 150+ security companies that have transformed their operations with Suburban Security.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/signup"
              className="inline-block rounded-xl bg-primary px-10 py-5 font-bold text-black shadow-xl transition-all duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Start Free Trial
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="inline-block rounded-xl border border-white/50 bg-white/10 backdrop-blur-md px-10 py-5 font-bold text-white transition-all duration-150 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Talk to Sales
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
