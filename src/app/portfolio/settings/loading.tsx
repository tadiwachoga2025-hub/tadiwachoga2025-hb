export default function SettingsLoading() {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="h-5 bg-gray-200 rounded w-24 mb-1.5" />
          <div className="h-3 bg-gray-200 rounded w-40" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-28" />
      </div>

      {/* Profile section skeleton */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-7 w-7 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-20 mb-1.5" />
              <div className="h-9 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications section skeleton */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-7 w-7 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-28 mb-1" />
                <div className="h-3 bg-gray-100 rounded w-40" />
              </div>
              <div className="h-5 w-10 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
