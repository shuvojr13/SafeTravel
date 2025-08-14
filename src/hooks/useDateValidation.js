import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export const useDateValidation = () => {
  const [dates, setDates] = useState({ from: "", to: "" });

  const validateDates = useCallback((hasDateConflict) => {
    if (!dates.from || !dates.to) {
      const message = "Please select both start and end dates.";
      toast.error(message);
      return { isValid: false, message };
    }

    if (new Date(dates.from) >= new Date(dates.to)) {
      const message = "Start date must be before end date.";
      toast.error(message);
      return { isValid: false, message };
    }

    // Check for date conflicts if function is provided
    if (hasDateConflict && hasDateConflict(dates)) {
      const message = "You already have a trip to this destination during these dates. Please choose different dates.";
      toast.error(message);
      return { isValid: false, message };
    }

    return { isValid: true, message: null };
  }, [dates]);

  const resetDates = useCallback(() => {
    setDates({ from: "", to: "" });
  }, []);

  return {
    dates,
    setDates,
    validateDates,
    resetDates,
  };
};