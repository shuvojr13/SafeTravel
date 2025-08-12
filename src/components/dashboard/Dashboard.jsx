import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const fetchData = async (page, search) => {
    if (!search) return [];
    try {
      const [countryResponse, capitalResponse] = await Promise.all([
        axios
          .get(`${import.meta.env.VITE_COUNTRY_BY_NAME}/${search}`)
          .catch(() => ({ data: [] })),
        axios
          .get(`${import.meta.env.VITE_COUNTRY_BY_CAPITAL}/${search}`)
          .catch(() => ({ data: [] })),
      ]);
      const countries = countryResponse.data || [];
      const capitals = capitalResponse.data || [];
      const allResults = [
        ...countries.map((country) => ({ type: "country", ...country })),
        ...capitals.map((country) => ({ type: "capital", ...country })),
      ].filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.cca3 === item.cca3)
      );
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return allResults.slice(start, end);
    } catch {
      return [];
    }
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchResults", page, searchTerm],
    queryFn: () => fetchData(page, searchTerm),
    keepPreviousData: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-8 text-center drop-shadow">
          Welcome, {user?.firstName || "Traveler"}!
        </h1>
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Search for a country or capital city..."
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setPage(1);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear
            </button>
          )}
        </div>
        {!searchTerm ? (
          <div className="text-center text-lg text-gray-700 dark:text-gray-300 font-medium py-8">
            Enter a country or city name to start exploring!
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-12">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </div>
        ) : isError ? (
          <div className="text-center text-red-600 dark:text-red-400 font-semibold py-8">
            Error loading data. Please try a different search.
          </div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-700 dark:text-gray-300 font-medium py-8">
            No results found. Try another country or city name.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((item) => (
                <div
                  key={item.cca3}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden group flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={item.flags?.png}
                      alt={`${item.name.common} flag`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                      {item.type === "capital" ? "Capital" : "Country"}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {item.name.common}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {item.capital?.[0]
                        ? `Capital: ${item.capital[0]}`
                        : "No capital"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      Region: {item.region} | Population:{" "}
                      {item.population?.toLocaleString()}
                    </p>
                    <Link
                      to={`/destination/${item.cca3}`}
                      className="mt-auto inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition font-semibold text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center items-center gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="cursor-pointer px-5 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-semibold">
                Page {page}
              </span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={data.length < perPage}
                className="cursor-pointer px-5 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
