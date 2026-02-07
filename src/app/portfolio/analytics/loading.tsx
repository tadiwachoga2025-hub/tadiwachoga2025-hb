export default function AnalyticsLoading() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-32 mb-1.5" />
        <div className="h-3 bg-gray-200 rounded w-48" />
      </div>

      {/* Metric header row skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="h-3 bg-gray-200 rounded w-16 mb-1.5" />
            <div className="h-5 bg-gray-200 rounded w-20" />
          </div>
        ))}
      </div>

      {/* Charts row 1 skeleton */}
      <div className="grid gap-3 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-28 mb-3" />
            <div className="h-[140px] bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Charts row 2 skeleton */}
      <div className="grid gap-3 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-28 mb-3" />
            <div className="h-[140px] bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
