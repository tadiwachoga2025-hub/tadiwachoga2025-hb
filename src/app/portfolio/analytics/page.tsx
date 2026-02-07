import type { Metadata } from "next";
import { AnalyticsContent } from "./analytics-content";

export const metadata: Metadata = {
  title: "Analytics | Portfolio Pulse",
  description: "Deep dive into your customer portfolio metrics, ARR distribution, and health analytics.",
};

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}
