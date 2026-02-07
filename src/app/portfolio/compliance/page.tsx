import type { Metadata } from "next";
import { ComplianceContent } from "./compliance-content";

export const metadata: Metadata = {
  title: "Compliance Hub | Portfolio Pulse",
  description: "Audit readiness, document control, and compliance tracking.",
};

export default function CompliancePage() {
  return <ComplianceContent />;
}
