import type { Metadata } from "next";
import { FleetContent } from "./fleet-content";

export const metadata: Metadata = {
  title: "Fleet & CIT | Portfolio Pulse",
  description: "Fleet operations, CIT routing, and vehicle readiness.",
};

export default function FleetPage() {
  return <FleetContent />;
}
