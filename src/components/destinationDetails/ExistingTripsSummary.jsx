import React from "react";

export const ExistingTripsSummary = ({ trips, countryName }) => {
  if (!trips || trips.length === 0) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateDuration = (from, to) => {
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
        Existing trips to {countryName}:
      </h4>
      <div
        className={`space-y-3  ${
          trips.length > 2 ? "overflow-y-scroll h-40" : ""
        }`}
      >
        {trips.map((trip, index) => (
          <div
            key={trip.id || index}
            className="bg-white dark:bg-gray-800 p-3 rounded border border-blue-100 dark:border-blue-800 "
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ">
              <div className="flex flex-col">
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {formatDate(trip.dates.from)} - {formatDate(trip.dates.to)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Duration: {calculateDuration(trip.dates.from, trip.dates.to)}{" "}
                  days
                </div>
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Trip #{index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm text-blue-700 dark:text-blue-300">
        💡 You can add another trip with different dates
      </div>
    </div>
  );
};
