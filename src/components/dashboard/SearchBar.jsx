const SearchBar = ({ value, onChange, onClear }) => (
  <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search for a country or capital city..."
      className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
    />
    {value && (
      <button
        onClick={onClear}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Clear
      </button>
    )}
  </div>
);

export default SearchBar;
