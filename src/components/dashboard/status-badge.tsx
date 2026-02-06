import { cn } from "@/lib/utils";

type Status = "active" | "inactive" | "alert" | "pending" | "on-leave" | "resolved";

const statusStyles: Record<Status, string> = {
  active: "bg-green-50 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  alert: "bg-red-50 text-red-700",
  pending: "bg-amber-50 text-amber-700",
  "on-leave": "bg-yellow-50 text-yellow-700",
  resolved: "bg-blue-50 text-blue-700",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      role="status"
      aria-label={`Status: ${status.replace("-", " ")}`}
      className={cn("inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize", statusStyles[status])}
    >
      {status.replace("-", " ")}
    </span>
  );
}
