import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "About Us | Suburban Security",
  description: "Built by security professionals, for security professionals. Learn about our mission to modernize security operations.",
};
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { Lightbulb, Shield, Lock, Handshake } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "We continuously push boundaries to deliver cutting-edge solutions that keep our clients ahead of emerging security challenges." },
  { icon: Shield, title: "Reliability", desc: "Our platform maintains 99.8% uptime because in security, every second of downtime is a second of vulnerability." },
  { icon: Lock, title: "Security-First", desc: "We practice what we preach — end-to-end encryption, POPIA compliance, and regular third-party security audits." },
  { icon: Handshake, title: "Client Partnership", desc: "We don't just sell software. We partner with security companies to understand their operations and build solutions that truly fit." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 bg-slate-light-bg px-6 py-24 text-center lg:px-20">
        <Badge text="OUR STORY" />
        <h1 className="max-w-3xl text-4xl font-bold text-dark lg:text-5xl lg:leading-tight">
          Built by Security Professionals, for Security Professionals
        </h1>
        <p className="max-w-2xl text-lg text-slate-muted">
          We understand the challenges because we&apos;ve lived them. Our team brings decades of combined experience in the private security industry.
        </p>
      </section>

      {/* Story */}
      <section className="px-6 py-24 lg:px-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-dark lg:text-4xl">From the Field to the Platform</h2>
            <p className="text-[15px] leading-relaxed text-slate-muted">
              Suburban Security was born from frustration. Our founders spent years managing security operations with spreadsheets, paper timesheets, and disconnected systems. They saw firsthand how much time was wasted, how many errors crept in, and how little visibility existed into day-to-day operations.
            </p>
            <p className="text-[15px] leading-relaxed text-slate-muted">
              In 2020, they decided to build the platform they wished they had — one that connects scheduling, timesheets, payroll, fleet tracking, and compliance into a single, intelligent system. Today, Suburban Security powers operations for over 150 security companies across South Africa.
            </p>
            <p className="text-[15px] leading-relaxed text-slate-muted">
              Our mission is simple: give security companies the tools they need to operate more efficiently, stay compliant effortlessly, and focus on what truly matters — protecting people and assets.
            </p>
          </div>
          <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-black to-teal lg:h-96">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #FFC300 0%, transparent 50%)" }} />
            <div className="relative text-center">
              <p className="text-6xl font-extrabold text-white/20">2020</p>
              <p className="mt-2 font-mono text-sm tracking-wider text-primary">FOUNDED IN JOHANNESBURG</p>
              <div className="mt-6 flex justify-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">150+</p>
                  <p className="text-xs text-white/60">Companies</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">2,500+</p>
                  <p className="text-xs text-white/60">Guards</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">6</p>
                  <p className="text-xs text-white/60">Provinces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-light-bg px-6 py-24 lg:px-20">
        <SectionHeader badge="OUR VALUES" headline="What Drives Us Forward" subheadline="These principles guide every decision we make and every feature we build." />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-5 rounded-2xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <v.icon className="h-6 w-6 text-teal" />
              </div>
              <h3 className="text-xl font-bold text-dark">{v.title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-8 bg-black px-6 py-24 text-center lg:px-20">
        <h2 className="max-w-2xl text-3xl font-bold text-white lg:text-4xl">
          Join the Future of Security Management
        </h2>
        <p className="max-w-xl text-lg text-white/70">See how Suburban Security can transform your operations.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-lg bg-primary px-8 py-4 font-bold text-black hover:bg-primary-dark">Request a Demo</Link>
          <Link href="/solutions/operations" className="rounded-lg border border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10">View Solutions</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
