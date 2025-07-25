"use client";

import { useEffect, useState } from "react";
import { Word, WordCloud } from "@isoterik/react-word-cloud";

export default function WordCloudComp({ data, type, loading }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Process data to create unique entry frequency
  const processData = (data, field) => {
    console.log(`processData called with:`, {
      dataLength: data?.length,
      field,
    });

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("No valid data array");
      return [];
    }

    // Extract and clean the field data
    const fieldValues = data
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        return item[field];
      })
      .filter(Boolean)
      .map((text) => {
        if (typeof text !== "string") return null;
        // Clean and normalize the text
        return text.trim().toLowerCase();
      })
      .filter(Boolean);

    console.log(`Field values found:`, fieldValues.slice(0, 3));

    // Count unique entry frequency (not individual words)
    const entryCount = {};
    fieldValues.forEach((entry) => {
      if (entry && typeof entry === "string") {
        entryCount[entry] = (entryCount[entry] || 0) + 1;
      }
    });

    console.log(`Entry count:`, Object.keys(entryCount).slice(0, 5));

    // Convert to wordcloud format
    const result = Object.entries(entryCount)
      .map(([text, value]) => ({
        text: text, // Truncate long entries
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 30); // Limit to top 30 entries (since they're longer)

    console.log(`Final result:`, result.slice(0, 3));
    return result;
  };

  const words = processData(
    data,
    type === "innovations" ? "Innovations" : "Challenges"
  );

  // Debug logging
  console.log(`WordCloud ${type}:`, {
    dataLength: data?.length,
    field: type === "innovations" ? "Innovations" : "Challenges",
    entriesLength: words?.length,
    entries: words?.slice(0, 3), // Show first 3 entries
    sampleData: data?.slice(0, 2), // Show first 2 data items
  });

  // Test data if no words found
  const testWords =
    words.length === 0
      ? [
          { text: "test", value: 10 },
          { text: "sample", value: 8 },
          { text: "data", value: 6 },
          { text: "word", value: 4 },
          { text: "cloud", value: 2 },
        ]
      : words;

  if (loading || !isClient) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {type === "innovations" ? "Innovations" : "Challenges"} Word Cloud
        </h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Loading word cloud...</p>
        </div>
      </div>
    );
  }

  if (
    !data ||
    !Array.isArray(data) ||
    data.length === 0 ||
    testWords.length === 0
  ) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {type === "innovations" ? "Innovations" : "Challenges"} Word Cloud
        </h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {type === "innovations" ? "Innovations" : "Challenges"} Word Cloud
      </h2>
      <div className="h-64 rounded-lg border border-gray-200 overflow-hidden">
        {testWords && testWords.length > 0 ? (
          <div className="h-full w-full flex items-center justify-center">
            {(() => {
              try {
                console.log("Rendering WordCloud with:", {
                  words: testWords.slice(0, 3),
                });
                return (
                  <WordCloud
                    words={testWords}
                    width={300}
                    height={200}
                    font="Inter"
                    fontWeight="bold"
                    fontSize={(word) =>
                      Math.max(12, Math.min(40, word.value * 2))
                    }
                    spiral="archimedean"
                    rotate={(word) => word.value % 90}
                    padding={2}
                    fill={(word, index) =>
                      type === "innovations"
                        ? `hsl(${200 + index * 20}, 70%, 50%)`
                        : `hsl(${0 + index * 20}, 70%, 50%)`
                    }
                    onWordClick={(word) => {
                      console.log(
                        `Clicked on word: ${word.text} (frequency: ${word.value})`
                      );
                    }}
                  />
                );
              } catch (error) {
                console.error("Error rendering word cloud:", error);
                return (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">
                      Error rendering word cloud: {error.message}
                    </p>
                  </div>
                );
              }
            })()}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">
              No words to display (testWords length: {testWords?.length || 0})
            </p>
          </div>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Top {Math.min(testWords.length, 10)} most frequent{" "}
          {type === "innovations" ? "innovations" : "challenges"}:
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {testWords.slice(0, 10).map((word, index) => (
            <span
              key={word.text}
              className="px-2 py-1 bg-gray-100 rounded text-xs"
            >
              {word.text} ({word.value})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
