export default function PortfolioLoading() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-40 mb-1.5" />
        <div className="h-3 bg-gray-200 rounded w-52" />
      </div>

      {/* KPI Cards skeleton */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="h-3 bg-gray-200 rounded w-20 mb-2" />
            <div className="h-5 bg-gray-200 rounded w-24" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-lg p-3 border border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-40 mb-3" />
          <div className="h-[200px] bg-gray-100 rounded" />
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-28 mb-3" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Activity ticker skeleton */}
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-28 mb-3" />
        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded w-[200px] flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}
