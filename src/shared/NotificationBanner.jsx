import React from "react";

export const NotificationBanner = ({ message, type = "success" }) => {
  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  return (
    <div className="my-4 text-center">
      <span className={`inline-block ${bgColor} px-4 py-2 rounded-lg shadow`}>
        {message}
      </span>
    </div>
  );
};