"use client";

import { useEffect, useRef, useState } from "react";

export default function CountriesMap({ data, loading }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current || loading || !data || data.length === 0)
      return;

    // Dynamically import Leaflet only on client side
    const initMap = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Fix for default markers in Leaflet
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Initialize map
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2);

        // Add tile layer (OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstanceRef.current);
      }

      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add markers for each data point
      data.forEach((entry) => {
        if (entry.Latitude && entry.Longitude) {
          const marker = L.marker([entry.Latitude, entry.Longitude]).addTo(
            mapInstanceRef.current
          ).bindPopup(`
              <div class="p-2">
                <h3 class="font-semibold text-gray-900">${entry.Country}</h3>
                <p class="text-sm text-gray-600"><strong>Farmer:</strong> ${entry.Farmers}</p>
                <p class="text-sm text-gray-600"><strong>Innovation:</strong> ${entry.Innovations}</p>
                <p class="text-sm text-gray-600"><strong>Challenge:</strong> ${entry.Challenges}</p>
              </div>
            `);
        }
      });

      // Fit map to show all markers
      if (data.length > 0) {
        const validCoords = data.filter(
          (entry) => entry.Latitude && entry.Longitude
        );
        if (validCoords.length > 0) {
          const group = new L.featureGroup(
            validCoords.map((entry) =>
              L.marker([entry.Latitude, entry.Longitude])
            )
          );
          mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
        }
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient, loading, data?.length]); // Only depend on data length, not the entire data object

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Geographic Distribution
        </h2>
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Geographic Distribution
        </h2>
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Geographic Distribution
      </h2>
      <div
        ref={mapRef}
        className="h-96 rounded-lg border border-gray-200"
        style={{ zIndex: 1 }}
      />
    </div>
  );
}
