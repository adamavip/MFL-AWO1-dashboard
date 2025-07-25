"use client";
import { useState, useCallback } from "react";
import { useCountries } from "@/context/CountriesContext";
import CountriesMap from "@/components/CountriesMap";
import PhraseProgressBar from "@/components/PhraseProgressBar";
import Sidebar from "@/components/Sidebar";

export default function Overview() {
  const { allCountries, loading, error, getStatistics } = useCountries();
  const [filteredData, setFilteredData] = useState(allCountries);

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

  const innovationsData = processCardData(filteredData, "Innovations");
  const challengesData = processCardData(filteredData, "Challenges");

  const handleFiltersChange = useCallback((newFilteredData) => {
    setFilteredData(newFilteredData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600 mt-2">Statistics</p>
      </div>

      {/* Main Content with Sidebar */}
      <div className="lg:ml-80">
        {/* Sidebar */}
        <Sidebar
          allCountries={allCountries}
          onFiltersChange={handleFiltersChange}
          loading={loading}
        />

        {/* Main Content */}
        <div className="w-full">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
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
            <CountriesMap data={filteredData} loading={loading} />
          </div>

          {/* Progress Bars Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PhraseProgressBar
              title="Innovations"
              data={innovationsData}
              loading={loading}
              color="blue"
            />
            <PhraseProgressBar
              title="Challenges"
              data={challengesData}
              loading={loading}
              color="red"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
