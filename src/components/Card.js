"use client";

import { useState } from "react";

export default function Card({ title, items, type, loading }) {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {items.length} unique {type}
        </span>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search ${type}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {filteredItems.map((item, index) => (
          <div
            key={`${item.text}-${index}`}
            className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
              type === "innovations"
                ? "border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                : "border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600 bg-red-50 dark:bg-red-900/20"
            }`}
            onClick={() => toggleExpanded(index)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      type === "innovations"
                        ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                        : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                    }`}
                  >
                    {item.value} {item.value === 1 ? "entry" : "entries"}
                  </span>
                </div>
                <p
                  className={`text-sm text-gray-900 dark:text-gray-100 ${
                    expandedItems.has(index) ? "" : "line-clamp-2"
                  }`}
                >
                  {item.text}
                </p>
              </div>
              <button
                className={`ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
                  expandedItems.has(index) ? "rotate-180" : ""
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Showing {filteredItems.length} of {items.length} {type}
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Clear search
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
