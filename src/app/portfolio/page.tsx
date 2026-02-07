import type { Metadata } from "next";
import { PortfolioDashboard } from "./dashboard-content";

export const metadata: Metadata = {
  title: "Portfolio Pulse | Customer Success Dashboard",
  description:
    "Monitor customer health, predict churn, and track ARR with real-time insights into your customer portfolio.",
};

export default function PortfolioPage() {
  return <PortfolioDashboard />;
}
