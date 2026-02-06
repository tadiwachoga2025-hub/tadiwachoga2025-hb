import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  trend?: "up" | "down";
  trendValue?: string;
  icon: LucideIcon;
  accent?: "default" | "danger" | "warning" | "success";
}

export function MetricCard({ label, value, trend, trendValue, icon: Icon, accent = "default" }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-muted">{label}</p>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", {
          "bg-primary/20": accent === "default",
          "bg-red-50": accent === "danger",
          "bg-amber-50": accent === "warning",
          "bg-green-50": accent === "success",
        })}>
          <Icon className={cn("h-5 w-5", {
            "text-teal": accent === "default",
            "text-red-600": accent === "danger",
            "text-amber-600": accent === "warning",
            "text-green-600": accent === "success",
          })} />
        </div>
      </div>
      <p className="text-3xl font-bold text-dark">{value}</p>
      {trend && trendValue && (
        <div className="flex items-center gap-1.5">
          {trend === "up" ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
          <span className={cn("text-sm font-medium", trend === "up" ? "text-green-600" : "text-red-500")}>{trendValue}</span>
          <span className="text-xs text-slate-light-muted">vs last month</span>
        </div>
      )}
    </div>
  );
}
