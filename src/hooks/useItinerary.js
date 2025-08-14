import {  useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

const ITINERARY_KEY = "itinerary";

export const useItinerary = () => {
  const queryClient = useQueryClient();

  const getItinerary = useCallback(() => {
    return JSON.parse(localStorage.getItem(ITINERARY_KEY) || "[]");
  }, []);

  const saveTrip = useCallback((trip) => {
    const existing = getItinerary();
    const updated = [...existing, trip];
    localStorage.setItem(ITINERARY_KEY, JSON.stringify(updated));
    
    // Invalidate itinerary queries if you have them
    queryClient.invalidateQueries({ queryKey: ["itinerary"] });
    
    return updated;
  }, [queryClient, getItinerary]);

  const getExistingTrips = useCallback((countryId) => {
    return getItinerary().filter((trip) => trip.country?.cca3 === countryId);
  }, [getItinerary]);

  const isAlreadySaved = useCallback((countryId) => {
    return getItinerary().some((trip) => trip.country?.cca3 === countryId);
  }, [getItinerary]);

  const hasDateConflict = useCallback((countryId, newDates) => {
    const existingTrips = getExistingTrips(countryId);
    const newStart = new Date(newDates.from);
    const newEnd = new Date(newDates.to);

    return existingTrips.some(trip => {
      const existingStart = new Date(trip.dates.from);
      const existingEnd = new Date(trip.dates.to);
      
      // Check for any overlap
      return (
        (newStart >= existingStart && newStart <= existingEnd) ||
        (newEnd >= existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  }, [getExistingTrips]);

  return {
    getItinerary,
    saveTrip,
    isAlreadySaved,
    getExistingTrips,
    hasDateConflict,
  };
};