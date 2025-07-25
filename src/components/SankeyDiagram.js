"use client";

import { ResponsiveSankey } from "@nivo/sankey";

export default function SankeyDiagram({ data }) {
  if (!data || !data.nodes || !data.links || data.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-600">No relationship data available</p>
      </div>
    );
  }

  // Use data directly since it's already in the correct format
  // Force innovations to be on the left and challenges on the right
  const nivoData = {
    nodes: data.nodes.map((node) => ({
      id: node.id,
      nodeColor: node.category === "innovation" ? "#3b82f6" : "#22c55e",
      // Force layout: innovations on left (0), challenges on right (1)
      layer: node.category === "innovation" ? 0 : 1,
    })),
    links: data.links,
  };

  // Debug logging to see the data structure
  console.log("Sankey Data:", nivoData);

  return (
    <div className="w-full h-[600px] bg-gray-50 rounded-lg p-4">
      <ResponsiveSankey
        data={nivoData}
        margin={{ top: 80, right: 250, bottom: 80, left: 200 }}
        align="justify"
        colors={{ scheme: "category10" }}
        layout="horizontal"
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.35}
        nodeThickness={18}
        nodeSpacing={28}
        nodeBorderWidth={1}
        nodeBorderRadius={4}
        nodeBorderColor={{
          from: "color",
          modifiers: [["darker", 1]],
        }}
        linkOpacity={0.6}
        linkHoverOthersOpacity={0.1}
        linkContract={2}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="horizontal"
        labelPadding={20}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.5]],
        }}
        animate={true}
        motionStiffness={140}
        motionDamping={13}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: "#777777",
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: "#333333",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
            },
            ticks: {
              line: {
                stroke: "#777777",
                strokeWidth: 1,
              },
              text: {
                fontSize: 11,
                fill: "#333333",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
            },
          },
          grid: {
            line: {
              stroke: "#dddddd",
              strokeWidth: 1,
            },
          },
          legends: {
            title: {
              text: {
                fontSize: 12,
                fill: "#333333",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
            },
            text: {
              fontSize: 11,
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
            ticks: {
              line: {},
              text: {
                fontSize: 10,
                fill: "#333333",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
            },
          },
          annotations: {
            text: {
              fontSize: 13,
              fill: "#333333",
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            link: {
              stroke: "#000000",
              strokeWidth: 1,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            outline: {
              stroke: "#000000",
              strokeWidth: 2,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            symbol: {
              fill: "#000000",
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
          },
          tooltip: {
            container: {
              background: "#ffffff",
              color: "#333333",
              fontSize: 12,
              borderRadius: 4,
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3)",
            },
            basic: {},
            chip: {},
            table: {},
            tableCell: {},
            tableCellValue: {},
          },
          labels: {
            text: {
              fontSize: 10,
              fill: "#1f2937",
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
              fontWeight: "500",
            },
          },
        }}
        tooltip={({ node, link }) => {
          if (node) {
            return (
              <div className="bg-white p-3 rounded-lg shadow-lg border">
                <div className="font-semibold text-gray-900">
                  {node.data.name}
                </div>
                <div className="text-sm text-gray-600">
                  Category: {node.data.category}
                </div>
              </div>
            );
          }
          if (link) {
            return (
              <div className="bg-white p-3 rounded-lg shadow-lg border">
                <div className="font-semibold text-gray-900">
                  {link.source.name} → {link.target.name}
                </div>
                <div className="text-sm text-gray-600">
                  Frequency: {link.value}
                </div>
              </div>
            );
          }
          return null;
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 180,
            translateY: -30,
            itemsSpacing: 10,
            itemDirection: "left-to-right",
            itemWidth: 140,
            itemHeight: 22,
            itemTextColor: "#374151",
            symbolSize: 22,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
