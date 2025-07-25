"use client";

import { useState } from "react";
import { useCountries } from "@/context/CountriesContext";
import SankeyDiagram from "@/components/SankeyDiagram";
import DataTable from "@/components/DataTable";

export default function Analytics() {
  const { allCountries, loading, error, getStatistics } = useCountries();
  const [selectedFormat, setSelectedFormat] = useState("csv");

  // Download functionality
  const downloadData = (format) => {
    if (!allCountries || allCountries.length === 0) return;

    let content = "";
    const headers = [
      "ID",
      "Country",
      "Farmers",
      "Longitude",
      "Latitude",
      "Innovations",
      "Challenges",
    ];

    if (format === "csv") {
      content = headers.join(",") + "\n";
      allCountries.forEach((item) => {
        const row = [
          item.ID || "",
          `"${item.Country || ""}"`,
          `"${item.Farmers || ""}"`,
          item.Longitude || "",
          item.Latitude || "",
          `"${item.Innovations || ""}"`,
          `"${item.Challenges || ""}"`,
        ];
        content += row.join(",") + "\n";
      });
    } else if (format === "json") {
      content = JSON.stringify(allCountries, null, 2);
    }

    const blob = new Blob([content], {
      type: format === "csv" ? "text/csv" : "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mfl-dashboard-data.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Prepare Sankey diagram data
  const prepareSankeyData = () => {
    if (!allCountries || allCountries.length === 0)
      return { nodes: [], links: [] };

    const innovations = new Set();
    const challenges = new Set();
    const relationships = {};

    allCountries.forEach((item) => {
      if (item.Innovations && item.Challenges) {
        const innovation = item.Innovations.trim();
        const challenge = item.Challenges.trim();

        if (innovation && challenge) {
          innovations.add(innovation);
          challenges.add(challenge);

          const key = `${innovation}|${challenge}`;
          relationships[key] = (relationships[key] || 0) + 1;
        }
      }
    });

    // Create nodes with unique IDs based on names
    // Ensure innovations come first (left side) and challenges second (right side)
    const nodes = [
      ...Array.from(innovations).map((innovation) => ({
        id: innovation, // Use the actual innovation name as ID
        name: innovation,
        category: "innovation",
      })),
      ...Array.from(challenges).map((challenge) => ({
        id: challenge, // Use the actual challenge name as ID
        name: challenge,
        category: "challenge",
      })),
    ];

    // Sort nodes to ensure innovations are first (left) and challenges are second (right)
    nodes.sort((a, b) => {
      if (a.category === "innovation" && b.category === "challenge") return -1;
      if (a.category === "challenge" && b.category === "innovation") return 1;
      return 0;
    });

    const links = Object.entries(relationships)
      .map(([key, value]) => {
        const [innovation, challenge] = key.split("|");
        return {
          source: innovation, // Use innovation name directly
          target: challenge, // Use challenge name directly
          value: value,
        };
      })
      .filter((link) => link.source && link.target);

    console.log("Sankey Data:", { nodes, links });
    return { nodes, links };
  };

  const sankeyData = prepareSankeyData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Data analysis and relationship visualization
        </p>
      </div>

      {/* Download Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Download Data
          </h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="csv">CSV Format</option>
              <option value="json">JSON Format</option>
            </select>
            <button
              onClick={() => downloadData(selectedFormat)}
              disabled={loading || !allCountries || allCountries.length === 0}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Download Data
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Download the complete dataset in {selectedFormat.toUpperCase()} format
        </p>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Complete Dataset
        </h2>
        <DataTable data={allCountries} loading={loading} error={error} />
      </div>

      {/* Sankey Diagram */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Innovation-Challenge Relationships
        </h2>
        {loading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-600 dark:text-gray-300">
              Loading relationship data...
            </p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center py-8">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}
        {!loading && !error && sankeyData.nodes.length > 0 && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This diagram shows the relationships between innovations and the
                challenges they address. The width of each connection represents
                the frequency of that relationship.
              </p>
            </div>
            <div className="h-[700px] bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <SankeyDiagram data={sankeyData} />
            </div>
          </div>
        )}
        {!loading && !error && sankeyData.nodes.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-600 dark:text-gray-300">
              No relationship data available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
