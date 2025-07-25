"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";

const CountriesContext = createContext();

export const useCountries = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }
  return context;
};

export const CountriesProvider = ({ children }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch countries data
  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use Supabase browser client to fetch data
      const supabase = createClient();

      const { data: countries, error } = await supabase
        .from("awo1-data-all-countries")
        .select();

      if (error) {
        throw new Error(error.message);
      }

      setAllCountries(countries || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching countries:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Add a country entry
  const addCountry = (countryData) => {
    setAllCountries((prev) => [...prev, countryData]);
  };

  // Update a country entry by ID
  const updateCountry = (id, updatedCountry) => {
    setAllCountries((prev) =>
      prev.map((country) =>
        country.ID === id ? { ...country, ...updatedCountry } : country
      )
    );
  };

  // Delete a country entry by ID
  const deleteCountry = (id) => {
    setAllCountries((prev) => prev.filter((country) => country.ID !== id));
  };

  // Get country entry by ID
  const getCountryById = (id) => {
    return allCountries.find((country) => country.ID === id);
  };

  // Get unique countries
  const getUniqueCountries = () => {
    const uniqueCountries = [
      ...new Set(allCountries.map((country) => country.Country)),
    ];
    return uniqueCountries.sort();
  };

  // Get entries by country name
  const getEntriesByCountry = (countryName) => {
    return allCountries.filter(
      (country) => country.Country.toLowerCase() === countryName.toLowerCase()
    );
  };

  // Get entries by farmer
  const getEntriesByFarmer = (farmerName) => {
    return allCountries.filter((country) =>
      country.Farmers.toLowerCase().includes(farmerName.toLowerCase())
    );
  };

  // Get entries by innovation type
  const getEntriesByInnovation = (innovationType) => {
    return allCountries.filter((country) =>
      country.Innovations.toLowerCase().includes(innovationType.toLowerCase())
    );
  };

  // Get entries by challenge
  const getEntriesByChallenge = (challenge) => {
    return allCountries.filter((country) =>
      country.Challenges.toLowerCase().includes(challenge.toLowerCase())
    );
  };

  // Filter countries by multiple criteria
  const filterCountries = (criteria) => {
    return allCountries.filter((country) => {
      return Object.keys(criteria).every((key) => {
        if (!criteria[key]) return true; // Skip empty criteria

        if (typeof criteria[key] === "string") {
          return country[key]
            ?.toLowerCase()
            .includes(criteria[key].toLowerCase());
        }
        return country[key] === criteria[key];
      });
    });
  };

  // Get statistics
  const getStatistics = useMemo(() => {
    const totalEntries = allCountries.length;
    const uniqueCountries = getUniqueCountries().length;
    const uniqueFarmers = [
      ...new Set(allCountries.map((country) => country.Farmers)),
    ].length;
    const uniqueInnovations = [
      ...new Set(allCountries.map((country) => country.Innovations)),
    ].length;

    return {
      totalEntries,
      uniqueCountries,
      uniqueFarmers,
      uniqueInnovations,
    };
  }, [allCountries]);

  const value = {
    allCountries,
    loading,
    error,
    setAllCountries,
    fetchCountries,
    addCountry,
    updateCountry,
    deleteCountry,
    getCountryById,
    getUniqueCountries,
    getEntriesByCountry,
    getEntriesByFarmer,
    getEntriesByInnovation,
    getEntriesByChallenge,
    filterCountries,
    getStatistics,
  };

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  );
};
