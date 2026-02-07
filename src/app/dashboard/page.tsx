import { redirect } from "next/navigation";

// Redirect to the new Portfolio Pulse dashboard
export default function DashboardPage() {
  redirect("/portfolio");
}
