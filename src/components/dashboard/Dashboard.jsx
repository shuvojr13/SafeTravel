import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useCountriesSearch } from "../../hooks/useCountriesSearch";
import SearchBar from "./SearchBar";
import CountryCard from "./CountryCard";
import Pagination from "./Pagination";
import CountryCardSkeleton from "./CountryCardSkeleton";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const {
    data = [],
    isLoading,
    isError,
  } = useCountriesSearch(page, searchTerm, perPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-8 text-center">
          Welcome, {user?.firstName || "Traveler"}!
        </h1>

        <SearchBar
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            setPage(1);
          }}
          onClear={() => {
            setSearchTerm("");
            setPage(1);
          }}
        />

        {!searchTerm ? (
          <p className="text-center text-lg text-gray-700 dark:text-gray-300 py-8">
            Enter a country or city name to start exploring!
          </p>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: perPage }).map((_, idx) => (
              <CountryCardSkeleton key={idx} />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-600 dark:text-red-400 py-8">
            Error loading data. Please try again.
          </p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300 py-8">
            No results found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((item) => (
                <CountryCard key={item.cca3} item={item} />
              ))}
            </div>
            <Pagination
              page={page}
              onPrev={() => setPage((p) => Math.max(p - 1, 1))}
              onNext={() => setPage((p) => p + 1)}
              hasNext={data.length === perPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
