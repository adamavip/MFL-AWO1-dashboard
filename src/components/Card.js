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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {filteredItems.map((item, index) => (
          <div
            key={`${item.text}-${index}`}
            className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
              type === "innovations"
                ? "border-blue-200 hover:border-blue-300 bg-blue-50"
                : "border-red-200 hover:border-red-300 bg-red-50"
            }`}
            onClick={() => toggleExpanded(index)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      type === "innovations"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {item.value} {item.value === 1 ? "entry" : "entries"}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    expandedItems.has(index) ? "" : "line-clamp-2"
                  }`}
                >
                  {item.text}
                </p>
              </div>
              <button
                className={`ml-2 text-gray-400 hover:text-gray-600 transition-colors ${
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
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Showing {filteredItems.length} of {items.length} {type}
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
