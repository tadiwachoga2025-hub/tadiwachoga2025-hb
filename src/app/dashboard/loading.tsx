import {
  MetricCardSkeleton,
  ChartSkeleton,
  DashboardCardSkeleton,
} from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-72 animate-pulse rounded-lg bg-slate-200" />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>

      {/* Charts and Cards Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartSkeleton />
        <DashboardCardSkeleton />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
    </div>
  );
}
