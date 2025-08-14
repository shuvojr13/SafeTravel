const CountryCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>

      {/* Text placeholders */}
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4"></div>
      </div>
    </div>
  );
};

export default CountryCardSkeleton;
