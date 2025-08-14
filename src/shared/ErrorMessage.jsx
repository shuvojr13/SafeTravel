import React from "react";

export const ErrorMessage = ({ message = "Something went wrong." }) => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200">
    <div className="text-center p-8 bg-white rounded-lg shadow-lg">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <span className="text-xl font-bold text-red-600">{message}</span>
    </div>
  </div>
);