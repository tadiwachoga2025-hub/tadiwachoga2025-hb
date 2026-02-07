import type { Metadata } from "next";
import { IncidentsContent } from "./incidents-content";

export const metadata: Metadata = {
  title: "Incident Response | Portfolio Pulse",
  description: "Track and resolve incidents across all security operations.",
};

export default function IncidentsPage() {
  return <IncidentsContent />;
}
