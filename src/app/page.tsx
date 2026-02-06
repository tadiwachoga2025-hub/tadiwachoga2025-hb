import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";

// Dynamic imports for below-fold sections to reduce initial bundle
const TrustedVisualization = dynamic(
  () => import("@/components/trusted-visualization").then((mod) => mod.TrustedVisualization),
  { ssr: true }
);

const TestimonialSection = dynamic(
  () => import("@/components/testimonial-section").then((mod) => mod.TestimonialSection),
  { ssr: true }
);

const PartnershipSection = dynamic(
  () => import("@/components/partnership-section").then((mod) => mod.PartnershipSection),
  { ssr: true }
);

// Dynamic imports for animated sections
const WhySection = dynamic(
  () => import("@/components/animated-sections").then((mod) => mod.WhySection),
  { ssr: true }
);

const SolutionSection = dynamic(
  () => import("@/components/animated-sections").then((mod) => mod.SolutionSection),
  { ssr: true }
);

const FeaturesSection = dynamic(
  () => import("@/components/animated-sections").then((mod) => mod.FeaturesSection),
  { ssr: true }
);

const CTASection = dynamic(
  () => import("@/components/animated-sections").then((mod) => mod.CTASection),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Suburban Security | The Intelligence Layer for Modern Security Operations",
  description: "Suburban Security connects every guard, vehicle, and incident into a unified AI layer — delivering real-time insights, compliance automation, and team alignment.",
  keywords: ["security operations", "fleet management", "compliance", "guard management", "real-time tracking"],
  openGraph: {
    title: "Suburban Security | Modern Security Operations Platform",
    description: "The Intelligence Layer for Modern Security Operations",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero - Critical content, loaded immediately */}
      <HeroSection />

      {/* Stats Section */}
      <section className="bg-white">
        <TrustedVisualization />
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Partners */}
      <PartnershipSection />

      {/* Why Section */}
      <WhySection />

      {/* Solution Section */}
      <SolutionSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </main>
  );
}
