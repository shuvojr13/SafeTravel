import React from "react";

export const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700 mx-auto mb-4"></div>
      <span className="text-xl font-bold text-indigo-700">{message}</span>
    </div>
  </div>
);