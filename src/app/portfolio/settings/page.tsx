import type { Metadata } from "next";
import { SettingsContent } from "./settings-content";

export const metadata: Metadata = {
  title: "Settings | Portfolio Pulse",
  description: "Manage your profile and notification preferences.",
};

export default function SettingsPage() {
  return <SettingsContent />;
}
