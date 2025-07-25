"use client";

import { useState, useEffect } from "react";

export default function Sidebar({ allCountries, onFiltersChange, loading }) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedInnovation, setSelectedInnovation] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  // Extract unique values for filters
  const uniqueCountries = [
    ...new Set(allCountries.map((item) => item.Country)),
  ].sort();
  const uniqueInnovations = [
    ...new Set(allCountries.map((item) => item.Innovations)),
  ].sort();
  const uniqueChallenges = [
    ...new Set(allCountries.map((item) => item.Challenges)),
  ].sort();

  // Apply filters when selections change
  useEffect(() => {
    const filteredData = allCountries.filter((item) => {
      const countryMatch = !selectedCountry || item.Country === selectedCountry;
      const innovationMatch =
        !selectedInnovation || item.Innovations === selectedInnovation;
      const challengeMatch =
        !selectedChallenge || item.Challenges === selectedChallenge;

      return countryMatch && innovationMatch && challengeMatch;
    });

    onFiltersChange(filteredData);
  }, [selectedCountry, selectedInnovation, selectedChallenge, allCountries]);

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedInnovation("");
    setSelectedChallenge("");
  };

  const hasActiveFilters =
    selectedCountry || selectedInnovation || selectedChallenge;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="w-5 h-5"
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
        <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">Loading filters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg z-40">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Filters
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
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

        {isOpen && (
          <div className="space-y-6">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-900 dark:text-white"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Innovation Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Innovation
              </label>
              <select
                value={selectedInnovation}
                onChange={(e) => setSelectedInnovation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-900 dark:text-white"
              >
                <option value="">All Innovations</option>
                {uniqueInnovations.map((innovation) => (
                  <option key={innovation} value={innovation}>
                    {innovation.length > 50
                      ? innovation.substring(0, 47) + "..."
                      : innovation}
                  </option>
                ))}
              </select>
            </div>

            {/* Challenge Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Challenge
              </label>
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-900 dark:text-white"
              >
                <option value="">All Challenges</option>
                {uniqueChallenges.map((challenge) => (
                  <option key={challenge} value={challenge}>
                    {challenge.length > 50
                      ? challenge.substring(0, 47) + "..."
                      : challenge}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-semibold hover:-translate-y-0.5"
              >
                Clear All Filters
              </button>
            )}

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Active Filters:
                </h4>
                <div className="space-y-2">
                  {selectedCountry && (
                    <div className="flex items-center justify-between text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700">
                      <span className="font-medium">
                        Country: {selectedCountry}
                      </span>
                      <button
                        onClick={() => setSelectedCountry("")}
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-200 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {selectedInnovation && (
                    <div className="flex items-center justify-between text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg border border-green-200 dark:border-green-700">
                      <span className="font-medium">
                        Innovation: {selectedInnovation.substring(0, 30)}...
                      </span>
                      <button
                        onClick={() => setSelectedInnovation("")}
                        className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-200 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {selectedChallenge && (
                    <div className="flex items-center justify-between text-sm bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg border border-red-200 dark:border-red-700">
                      <span className="font-medium">
                        Challenge: {selectedChallenge.substring(0, 30)}...
                      </span>
                      <button
                        onClick={() => setSelectedChallenge("")}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
