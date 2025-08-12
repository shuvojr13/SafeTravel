import { useEffect, useState } from "react";
import ConfirmDialog from "../../utils/ConfirmDialog";

const getItinerary = () =>
  JSON.parse(localStorage.getItem("itinerary") || "[]");

const Itinerary = () => {
  const [trips, setTrips] = useState(getItinerary());
  const [sortBy, setSortBy] = useState("date");
  const [notification, setNotification] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingRemoveId, setPendingRemoveId] = useState(null);

  useEffect(() => {
    setTrips(getItinerary());
  }, []);


  const handleRemove = (id) => {
    setPendingRemoveId(id);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    const updated = trips.filter((t) => t.id !== pendingRemoveId);
    setTrips(updated);
    localStorage.setItem("itinerary", JSON.stringify(updated));
    setNotification("Trip removed!");
    setShowConfirm(false);
    setPendingRemoveId(null);
    setTimeout(() => setNotification(""), 2000);
  };

  const sortedTrips = [...trips].sort((a, b) => {
    if (sortBy === "date") return a.dates.from.localeCompare(b.dates.from);
    if (sortBy === "name")
      return a.country.name.common.localeCompare(b.country.name.common);
    return 0;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-200 mb-8 text-center">
          My Itinerary
        </h1>
        {notification && (
          <div className="mb-4 text-center">
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow">
              {notification}
            </span>
          </div>
        )}
        <div className="flex justify-end mb-6">
          <label className="mr-2 font-semibold text-gray-700 dark:text-gray-200">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded border border-gray-300 dark:border-gray-600 dark:text-gray-400"
          >
            <option value="date">Start Date</option>
            <option value="name">Destination Name</option>
          </select>
        </div>
        {sortedTrips.length === 0 ? (
          <div className="text-center text-lg text-gray-700 dark:text-gray-300 font-medium py-8">
            No trips saved yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg border border-indigo-200 dark:border-gray-700 p-6 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={trip.country.flags?.png}
                    alt={trip.country.name.common}
                    className="w-20 h-14 object-cover rounded-lg border border-indigo-200 dark:border-gray-700"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-200">
                      {trip.country.name.common}
                    </h2>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                      {trip.country.region}
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    Travel Dates:
                  </span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {formatDate(trip.dates.from)} to {formatDate(trip.dates.to)}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    Population:
                  </span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {trip.country.population?.toLocaleString()}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    Timezone:
                  </span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {trip.country.timezones?.join(", ")}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    Weather Summary:
                  </span>
                  {trip.weather?.current_weather ? (
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      {trip.weather.current_weather.temperature}°C, Wind{" "}
                      {trip.weather.current_weather.windspeed} km/h
                    </span>
                  ) : (
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      N/A
                    </span>
                  )}
                </div>
                <button
                  className="cursor-pointer mt-auto px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                  onClick={() => handleRemove(trip.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <ConfirmDialog
          open={showConfirm}
          title="Remove Trip"
          description="Are you sure you want to remove this trip from your itinerary?"
          confirmText="Remove"
          cancelText="Cancel"
          type="remove"
          onConfirm={confirmRemove}
          onCancel={() => setShowConfirm(false)}
        />
      </div>
    </div>
  );
};

export default Itinerary;
