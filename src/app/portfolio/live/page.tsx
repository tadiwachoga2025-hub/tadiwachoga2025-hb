import type { Metadata } from "next";
import { LiveOpsContent } from "./live-content";

export const metadata: Metadata = {
  title: "Live Operations | Portfolio Pulse",
  description: "Real-time security operations monitoring across all client sites.",
};

export default function LiveOpsPage() {
  return <LiveOpsContent />;
}
