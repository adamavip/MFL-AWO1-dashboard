"use client";

import { useCountries } from "@/context/CountriesContext";

export default function Analytics() {
  const { allCountries, loading, error, getStatistics } = useCountries();
  const chartData = [
    { month: "Jan", yield: 120, efficiency: 85 },
    { month: "Feb", yield: 135, efficiency: 88 },
    { month: "Mar", yield: 145, efficiency: 90 },
    { month: "Apr", yield: 160, efficiency: 92 },
    { month: "May", yield: 175, efficiency: 89 },
    { month: "Jun", yield: 190, efficiency: 91 },
  ];

  const topPerformers = [
    {
      name: "Farm Alpha",
      yield: "245 tons",
      efficiency: "94%",
      growth: "+15%",
    },
    { name: "Farm Beta", yield: "198 tons", efficiency: "91%", growth: "+12%" },
    { name: "Farm Gamma", yield: "187 tons", efficiency: "89%", growth: "+8%" },
    { name: "Farm Delta", yield: "176 tons", efficiency: "87%", growth: "+6%" },
  ];

  const analyticsMetrics = [
    {
      name: "Average Yield per Hectare",
      value: "8.2 tons",
      trend: "up",
      percentage: "+12%",
    },
    {
      name: "Water Usage Efficiency",
      value: "92%",
      trend: "up",
      percentage: "+5%",
    },
    {
      name: "Fertilizer Utilization",
      value: "78%",
      trend: "down",
      percentage: "-3%",
    },
    { name: "Crop Health Index", value: "85%", trend: "up", percentage: "+7%" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">
          Detailed insights and performance analysis
        </p>
      </div>

      {/* Analytics Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsMetrics.map((metric) => (
          <div key={metric.name} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {metric.name}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
              <div
                className={`text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.percentage}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Yield Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Yield Trend (Last 6 Months)
          </h2>
          <div className="space-y-3">
            {chartData.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium text-gray-600">
                  {data.month}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(data.yield / 200) * 100}%` }}
                  ></div>
                </div>
                <div className="w-20 text-sm font-medium text-gray-900">
                  {data.yield} tons
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Efficiency Trend (Last 6 Months)
          </h2>
          <div className="space-y-3">
            {chartData.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium text-gray-600">
                  {data.month}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${data.efficiency}%` }}
                  ></div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900">
                  {data.efficiency}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Top Performing Farms
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farm Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yield
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformers.map((farm, index) => (
                <tr
                  key={farm.name}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {farm.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {farm.yield}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {farm.efficiency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {farm.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agricultural Data Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Agricultural Data
        </h2>
        {loading && (
          <p className="text-gray-600">Loading agricultural data...</p>
        )}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {getStatistics.totalEntries}
                </div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {getStatistics.uniqueCountries}
                </div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {getStatistics.uniqueFarmers}
                </div>
                <div className="text-sm text-gray-600">Farmers</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {getStatistics.uniqueInnovations}
                </div>
                <div className="text-sm text-gray-600">Innovations</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCountries.slice(0, 9).map((entry, index) => (
                <div
                  key={entry.ID || index}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {entry.Country}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Farmer:</span> {entry.Farmers}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Innovation:</span>{" "}
                    {entry.Innovations}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Challenge:</span>{" "}
                    {entry.Challenges}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter and Export Options */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Data Export & Filters
        </h2>
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Farms</option>
            <option>High Performers</option>
            <option>Low Performers</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Export Data
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
