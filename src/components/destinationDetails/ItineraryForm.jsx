import React from "react";

export const ItineraryForm = ({ dates, setDates, onSave, onCancel, isLoading = false }) => (
  <div className="mt-4 bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg shadow">
    <label className="block mb-2 text-gray-700 dark:text-gray-200 font-semibold">
      Select Travel Dates:
    </label>
    <div className="flex gap-4 flex-wrap">
      <input
        type="date"
        value={dates.from}
        onChange={(e) => setDates((d) => ({ ...d, from: e.target.value }))}
        className="p-2 rounded border border-gray-300 dark:border-gray-600"
        disabled={isLoading}
      />
      <input
        type="date"
        value={dates.to}
        onChange={(e) => setDates((d) => ({ ...d, to: e.target.value }))}
        className="p-2 rounded border border-gray-300 dark:border-gray-600"
        disabled={isLoading}
      />
      <button
        className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
        onClick={onSave}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
      <button
        className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </button>
    </div>
  </div>
);
