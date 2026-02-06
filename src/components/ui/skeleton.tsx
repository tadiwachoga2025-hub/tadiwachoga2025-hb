import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-200",
        className
      )}
      style={style}
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
      <Skeleton className="h-9 w-32" />
      <div className="flex items-center gap-1.5">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
      <div className="flex h-[300px] items-end gap-2 rounded-lg bg-slate-light-bg p-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <Skeleton
              className="w-full rounded-t-md"
              style={{ height: `${30 + (i * 7) % 60}%` }}
            />
            <Skeleton className="h-3 w-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DataTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-border">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-6 w-16 rounded-full ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
