import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ConfirmDialog from "../../utils/ConfirmDialog";

const fetchCountry = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axios.get(`${import.meta.env.VITE_COUNTRY_API}/${id}`);
  return res.data[0];
};

const fetchWeather = async ({ queryKey }) => {
  const [, lat, lon] = queryKey;
  const url = `${import.meta.env.VITE_WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=auto`;
  const res = await axios.get(url);
  return res.data;
};

const saveItineraryToStorage = (trip) => {
  const existing = JSON.parse(localStorage.getItem("itinerary") || "[]");
  localStorage.setItem("itinerary", JSON.stringify([...existing, trip]));
};

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showItinerary, setShowItinerary] = useState(false);
  const [dates, setDates] = useState({ from: "", to: "" });
  const [notification, setNotification] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    data: country,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["country", id],
    queryFn: fetchCountry,
    enabled: !!id,
  });
  const lat = country?.capitalInfo?.latlng?.[0] || country?.latlng?.[0];
  const lon = country?.capitalInfo?.latlng?.[1] || country?.latlng?.[1];

  const { data: weather, isLoading: weatherLoading } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: fetchWeather,
    enabled: !!lat && !!lon,
  });

  const handleSave = () => {
    if (!dates.from || !dates.to) {
      setNotification("Please select both start and end dates.");
      setTimeout(() => setNotification(""), 2000);
      return;
    }
    setShowConfirm(true);
  };

  const confirmAdd = () => {
    const trip = {
      id: Date.now(),
      country,
      weather,
      dates,
    };
    saveItineraryToStorage(trip);
    setNotification("Added to your itinerary!");
    setShowItinerary(false);
    setShowConfirm(false);
    setTimeout(() => setNotification(""), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200">
        <span className="text-xl font-bold text-indigo-700">
          Loading destination...
        </span>
      </div>
    );
  }
  if (isError || !country) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200">
        <span className="text-xl font-bold text-red-600">
          Destination not found.
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
        {notification && (
          <div className="mb-4 text-center">
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow">
              {notification}
            </span>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={country.flags?.png}
            alt={country.name.common}
            className="w-full md:w-72 h-48 object-cover rounded-2xl shadow-lg border border-indigo-200 dark:border-gray-700"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
              {country.name.common}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Country:</span>{" "}
              {country.name.official}
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-1">
              <span className="font-semibold">Population:</span>{" "}
              {country.population?.toLocaleString()}
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-1">
              <span className="font-semibold">Timezone:</span>{" "}
              {country.timezones?.join(", ")}
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-1">
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-1">
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </p>
            <button
              onClick={() => setShowItinerary(true)}
              className="cursor-pointer mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition font-semibold"
            >
              Add to My Itinerary
            </button>
            {showItinerary && (
              <div className="mt-4 bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                <label className="block mb-2 text-gray-700 dark:text-gray-200 font-semibold">
                  Select Travel Dates:
                </label>
                <div className="flex gap-4">
                  <input
                    type="date"
                    value={dates.from}
                    onChange={(e) =>
                      setDates((d) => ({ ...d, from: e.target.value }))
                    }
                    className="p-2 rounded border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="date"
                    value={dates.to}
                    onChange={(e) =>
                      setDates((d) => ({ ...d, to: e.target.value }))
                    }
                    className="p-2 rounded border border-gray-300 dark:border-gray-600"
                  />
                  <button
                    className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    onClick={() => setShowItinerary(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-200 mb-4">
            Weather Forecast
          </h3>
          {weatherLoading ? (
            <div className="text-indigo-600">Loading weather...</div>
          ) : weather ? (
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 shadow flex flex-col md:flex-row gap-8">
              <div>
                <div className="dark:text-white text-lg font-semibold mb-2">
                  Current Weather
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-indigo-700">
                    {weather.current_weather.temperature}°C
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Wind: {weather.current_weather.windspeed} km/h
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="dark:text-white text-lg font-semibold mb-2">
                  7-Day Forecast
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
                    <thead>
                      <tr>
                        <th className="px-2 py-1 text-left">Date</th>
                        <th className="px-2 py-1 text-right">Min</th>
                        <th className="px-2 py-1 text-right">Max</th>
                        <th className="px-2 py-1 text-right">Precipitation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weather.daily.time.map((date, idx) => (
                        <tr
                          key={date}
                          className="hover:bg-indigo-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-2 py-1 text-left">{date}</td>
                          <td className="px-2 py-1 text-right">
                            {weather.daily.temperature_2m_min[idx]}°C
                          </td>
                          <td className="px-2 py-1 text-right">
                            {weather.daily.temperature_2m_max[idx]}°C
                          </td>
                          <td className="px-2 py-1 text-right">
                            {weather.daily.precipitation_sum[idx]} mm
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-600 dark:text-gray-300">
              Weather data not available.
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            className="cursor-pointer px-5 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
            onClick={() => navigate("/itinerary")}
          >
            Go to My Itinerary
          </button>
        </div>
        {showConfirm && (
          <ConfirmDialog
            open={showConfirm}
            title="Add to My Itinerary"
            description={`Are you sure you want to add ${country.name.common} to your itinerary from ${dates.from} to ${dates.to}?`}
            confirmText="Add"
            cancelText="Cancel"
            type="add"
            onConfirm={confirmAdd}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DestinationDetails;
