import { Link } from "react-router-dom";

const CountryCard = ({ item }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden group flex flex-col">
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
        {item.capital?.[0] ? `Capital: ${item.capital[0]}` : "No capital"}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Region: {item.region} | Population: {item.population?.toLocaleString()}
      </p>
      <Link
        to={`/destination/${item.cca3}`}
        className="mt-auto inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition font-semibold text-center"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default CountryCard;
