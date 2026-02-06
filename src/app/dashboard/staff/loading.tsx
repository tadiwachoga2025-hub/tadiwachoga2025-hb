import {
  MetricCardSkeleton,
  DataTableSkeleton,
} from "@/components/ui/skeleton";

export default function StaffLoading() {
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

      {/* Staff Table */}
      <DataTableSkeleton rows={8} />
    </div>
  );
}
