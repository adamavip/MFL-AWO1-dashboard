"use client";
import { useCountries } from "@/context/CountriesContext";
import CountriesMap from "@/components/CountriesMap";
import Card from "@/components/Card";
import WordCloudComp from "@/components/WordCloud";

export default function Overview() {
  const { allCountries, loading, error, getStatistics } = useCountries();
  console.log(allCountries);

  // Get real statistics from the data
  const stats = (() => {
    if (loading || allCountries.length === 0) {
      return [
        { name: "Total Entries", value: "Loading..." },
        { name: "Countries", value: "Loading..." },
        { name: "Farmers", value: "Loading..." },
        { name: "Innovations", value: "Loading..." },
      ];
    }

    return [
      { name: "Total Entries", value: getStatistics.totalEntries.toString() },
      { name: "Countries", value: getStatistics.uniqueCountries.toString() },
      { name: "Farmers", value: getStatistics.uniqueFarmers.toString() },
      {
        name: "Innovations",
        value: getStatistics.uniqueInnovations.toString(),
      },
    ];
  })();

  const recentActivities = [
    {
      id: 1,
      activity: "New farm registration",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 2,
      activity: "Harvest completed",
      time: "4 hours ago",
      type: "success",
    },
    {
      id: 3,
      activity: "Irrigation system maintenance",
      time: "1 day ago",
      type: "warning",
    },
    {
      id: 4,
      activity: "Data sync completed",
      time: "2 days ago",
      type: "info",
    },
  ];

  // Process data for Card components
  const processCardData = (data, field) => {
    if (!data || !Array.isArray(data) || data.length === 0) return [];

    // Extract and clean the field data
    const fieldValues = data
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        return item[field];
      })
      .filter(Boolean)
      .map((text) => {
        if (typeof text !== "string") return null;
        return text.trim().toLowerCase();
      })
      .filter(Boolean);

    // Count unique entry frequency
    const entryCount = {};
    fieldValues.forEach((entry) => {
      if (entry && typeof entry === "string") {
        entryCount[entry] = (entryCount[entry] || 0) + 1;
      }
    });

    // Convert to card format
    return Object.entries(entryCount)
      .map(([text, value]) => ({
        text: text.length > 100 ? text.substring(0, 97) + "..." : text,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  };

  const innovationsData = processCardData(allCountries, "Innovations");
  const challengesData = processCardData(allCountries, "Challenges");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600 mt-2">Statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div className="mb-8">
        <CountriesMap data={allCountries} loading={loading} />
      </div>

      {/* Interactive Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <WordCloudComp
          data={allCountries}
          type="innovations"
          loading={loading}
        />
        <WordCloudComp
          data={allCountries}
          type="challenges"
          loading={loading}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Add New Farm
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Generate Report
              </button>
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.activity}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
