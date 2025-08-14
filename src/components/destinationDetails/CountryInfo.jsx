import React from "react";

export const CountryInfo = ({ country }) => (
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
      <div className="space-y-1 text-gray-600 dark:text-gray-400">
        <InfoItem label="Country" value={country.name.official} />
        <InfoItem label="Population" value={country.population?.toLocaleString()} />
        <InfoItem label="Timezone" value={country.timezones?.join(", ")} />
        <InfoItem label="Region" value={country.region} />
        <InfoItem label="Capital" value={country.capital?.[0] || "N/A"} />
      </div>
    </div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <p className="text-md">
    <span className="font-semibold">{label}:</span> {value}
  </p>
);