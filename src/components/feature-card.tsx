"use client";

import { motion } from "framer-motion";
import { LucideIcon, Users, BarChart3, Truck, Shield, Smartphone, Brain } from "lucide-react";

interface FeatureCardProps {
  number: number;
  title: string;
  description: string;
  icon?: LucideIcon;
  delay?: number;
}

// Map feature numbers to icons
const featureIcons: Record<number, LucideIcon> = {
  1: Users,      // Operations Management
  2: BarChart3,  // Dashboards & Analytics
  3: Truck,      // Fleet & CIT Management
  4: Shield,     // Compliance & Incident Mgmt
  5: Smartphone, // Mobile Applications
  6: Brain,      // AI-Powered Insights
};

export function FeatureCard({ number, title, description, icon, delay = 0 }: FeatureCardProps) {
  const Icon = icon || featureIcons[number] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: delay * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative flex flex-col gap-6 rounded-3xl border border-dark/5 bg-white p-8 lg:p-10 overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"
      }}
    >
      {/* Background Decorative Element */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10 group-hover:scale-150" />

      {/* Secondary Decorative Element */}
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-teal/5 blur-2xl transition-all duration-500 group-hover:bg-teal/10 group-hover:scale-125" />

      {/* Top Row: Number Badge + Icon */}
      <div className="relative z-10 flex items-center justify-between">
        {/* Number Badge */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dark text-lg font-bold text-white shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-black group-hover:shadow-md group-hover:scale-105">
          {number}
        </div>

        {/* Icon */}
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110"
          whileHover={{ rotate: 5 }}
        >
          <Icon className="h-7 w-7 text-teal transition-colors group-hover:text-teal-dark" />
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl font-semibold tracking-tight text-dark transition-colors group-hover:text-black lg:text-2xl">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-base leading-relaxed text-text/70 transition-colors group-hover:text-text/90">
        {description}
      </p>

      {/* Bottom Accent Line */}
      <div className="relative z-10 mt-auto pt-6">
        <div className="h-1 w-12 rounded-full bg-dark/10 transition-all duration-500 group-hover:w-full group-hover:bg-primary" />
      </div>

      {/* Hover Glow Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,195,0,0.1), 0 8px 40px rgba(255,195,0,0.08)"
        }}
      />
    </motion.div>
  );
}
