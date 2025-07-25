"use client";

export default function PhraseProgressBar({
  title,
  data,
  loading,
  color = "blue",
}) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  // Get the maximum value for percentage calculation
  const maxValue = Math.max(...data.map((item) => item.value));

  // Color mapping
  const colorMap = {
    blue: "bg-blue-600",
    red: "bg-red-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    yellow: "bg-yellow-600",
  };

  const progressColor = colorMap[color] || "bg-blue-600";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {data.length}
        </span>
      </div>

      <div className="space-y-3">
        {data.slice(0, 5).map((item, index) => (
          <div
            key={`${item.text}-${index}`}
            className="flex items-center space-x-4"
          >
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium text-gray-900 truncate"
                title={item.text}
              >
                {item.text}
              </p>
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className={`${progressColor} h-4 rounded-full transition-all duration-300`}
                style={{
                  width: `${Math.min((item.value / maxValue) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <div className="w-16 text-sm font-medium text-gray-900 text-right">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <span>
            Showing top {Math.min(data.length, 5)} of {data.length} {title}
          </span>
        </div>
      </div>
    </div>
  );
}
