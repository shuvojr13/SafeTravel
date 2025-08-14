import React from "react";

export const WeatherForecast = ({ weather, isLoading }) => (
  <div className="mt-10">
    <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-200 mb-4">
      Weather Forecast
    </h3>
    {isLoading ? (
      <div className="text-indigo-600">Loading weather...</div>
    ) : weather ? (
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 shadow flex flex-col md:flex-row gap-8">
        <CurrentWeather weather={weather.current_weather} />
        <WeatherTable daily={weather.daily} />
      </div>
    ) : (
      <div className="text-gray-600 dark:text-gray-300">
        Weather data not available.
      </div>
    )}
  </div>
);

const CurrentWeather = ({ weather }) => (
  <div>
    <div className="dark:text-white text-lg font-semibold mb-2">
      Current Weather
    </div>
    <div className="flex items-center gap-4">
      <span className="text-4xl font-bold text-indigo-700">
        {weather.temperature}°C
      </span>
      <span className="text-gray-600 dark:text-gray-300">
        Wind: {weather.windspeed} km/h
      </span>
    </div>
  </div>
);

const WeatherTable = ({ daily }) => (
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
          {daily.time.map((date, idx) => (
            <tr key={date} className="hover:bg-indigo-50 dark:hover:bg-gray-700">
              <td className="px-2 py-1 text-left">{date}</td>
              <td className="px-2 py-1 text-right">
                {daily.temperature_2m_min[idx]}°C
              </td>
              <td className="px-2 py-1 text-right">
                {daily.temperature_2m_max[idx]}°C
              </td>
              <td className="px-2 py-1 text-right">
                {daily.precipitation_sum[idx]} mm
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);