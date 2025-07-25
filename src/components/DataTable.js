"use client";

import { useEffect, useRef } from "react";
import { Grid } from "gridjs-react";

export default function DataTable({ data, loading, error }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && data && data.length > 0) {
      // Grid.js will automatically re-render when data changes
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-600">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  // Prepare data for Grid.js
  const gridData = data.map((item, index) => [
    item.ID || index + 1,
    item.Country || "N/A",
    item.Farmers || "N/A",
    item.Longitude && item.Latitude
      ? `${item.Longitude}, ${item.Latitude}`
      : "N/A",
    item.Innovations || "N/A",
    item.Challenges || "N/A",
  ]);

  return (
    <div className="w-full">
      <Grid
        ref={gridRef}
        data={gridData}
        columns={[
          {
            name: "ID",
            sort: true,
            width: "80px",
          },
          {
            name: "Country",
            sort: true,
            width: "150px",
          },
          {
            name: "Farmers",
            sort: true,
            width: "200px",
          },
          {
            name: "Coordinates",
            sort: true,
            width: "150px",
          },
          {
            name: "Innovations",
            sort: true,
            width: "300px",
          },
          {
            name: "Challenges",
            sort: true,
            width: "300px",
          },
        ]}
        search={true}
        pagination={{
          limit: 5,
          sizes: [10, 20, 50, 100],
        }}
        sort={true}
        export={{
          csv: {
            filename: "mfl-dashboard-data.csv",
          },
          json: {
            filename: "mfl-dashboard-data.json",
          },
        }}
        style={{
          table: {
            width: "100%",
          },
          th: {
            backgroundColor: "#f9fafb",
            color: "#374151",
            fontWeight: "600",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
          td: {
            fontSize: "14px",
            color: "#374151",
          },
        }}
        language={{
          search: {
            placeholder: "Search data...",
          },
          pagination: {
            showing: "Showing",
            results: () => "Records",
          },
        }}
        className={{
          container: "custom-grid-container",
          table: "custom-grid-table",
          thead: "custom-grid-thead",
          tbody: "custom-grid-tbody",
          th: "custom-grid-th",
          td: "custom-grid-td",
        }}
      />
    </div>
  );
}
