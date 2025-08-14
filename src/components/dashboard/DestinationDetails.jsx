import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmDialog from "../../utils/ConfirmDialog";

// Custom hooks
import { useCountry } from "../../hooks/useCountry";
import { useWeather } from "../../hooks/useWeather";
import { useItinerary } from "../../hooks/useItinerary";
import { useDateValidation } from "../../hooks/useDateValidation";

// Components
import { LoadingSpinner } from "../../shared/LoadingSpinner";
import { ErrorMessage } from "../../shared/ErrorMessage";
import { NotificationBanner } from "../../shared/NotificationBanner";
import { CountryInfo } from "../destinationDetails/CountryInfo";
import { ItineraryForm } from "../destinationDetails/ItineraryForm";
import { WeatherForecast } from "../destinationDetails/WeatherForecast";
import { ExistingTripsSummary } from "../destinationDetails/ExistingTripsSummary";

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State
  const [showItinerary, setShowItinerary] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notification, setNotification] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom hooks
  const { data: country, isLoading, isError } = useCountry(id);
  const { saveTrip, isAlreadySaved, getExistingTrips, hasDateConflict } = useItinerary();
  const { dates, setDates, validateDates, resetDates } = useDateValidation();
  
  // Weather data
  const lat = country?.capitalInfo?.latlng?.[0] || country?.latlng?.[0];
  const lon = country?.capitalInfo?.latlng?.[1] || country?.latlng?.[1];
  const { data: weather, isLoading: weatherLoading } = useWeather(lat, lon);

  const alreadySaved = isAlreadySaved(id);
  const existingTrips = getExistingTrips(id);

  // Handlers
  const handleDateValidation = () => {
    const dateConflictChecker = (newDates) => hasDateConflict(id, newDates);
    const validation = validateDates(dateConflictChecker);
    if (!validation.isValid) {
      setNotification(validation.message);
      setTimeout(() => setNotification(""), 4000);
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmAdd = async () => {
    setIsSubmitting(true);
    
    try {
      const trip = {
        id: Date.now(),
        country,
        weather,
        dates,
      };
      
      saveTrip(trip);
      
      setNotification("Added to your itinerary!");
      toast.success("Added to your itinerary!");
      
      // Reset state
      setShowItinerary(false);
      setShowConfirm(false);
      resetDates();
      
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      toast.error("Failed to add to itinerary. Please try again.");
      console.error("Error saving trip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setShowItinerary(false);
    resetDates();
    setNotification("");
  };

  // Loading and Error states
  if (isLoading) {
    return <LoadingSpinner message="Loading destination..." />;
  }

  if (isError || !country) {
    return <ErrorMessage message="Destination not found." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
        

        <CountryInfo country={country} />

        {/* Add to Itinerary Button */}
        <div className="mt-6">
          {/* Show existing trips summary */}
          {alreadySaved && (
            <ExistingTripsSummary 
            trips={existingTrips} 
            countryName={country.name.common} 
            />
          )}
          <button
            onClick={() => setShowItinerary(true)}
            className="cursor-pointer px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition font-semibold"
          >
            {alreadySaved ? "Add Another Trip" : "Add to My Itinerary"}
          </button>
          
        </div>
          <NotificationBanner 
            message={notification} 
            type={notification.includes("Error") || notification.includes("must be") ? "error" : "success"} 
          />

        {/* Itinerary Form */}
        {showItinerary && (
          <ItineraryForm
            dates={dates}
            setDates={setDates}
            onSave={handleDateValidation}
            onCancel={handleCancelForm}
            isLoading={isSubmitting}
          />
        )}

        {/* Weather Forecast */}
        <WeatherForecast weather={weather} isLoading={weatherLoading} />

        {/* Navigation Button */}
        <div className="mt-8 flex justify-end">
          <button
            className="cursor-pointer px-5 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
            onClick={() => navigate("/itinerary")}
          >
            Go to My Itinerary
          </button>
        </div>

        {/* Confirmation Dialog */}
        {showConfirm && (
          <ConfirmDialog
            open={showConfirm}
            title="Add to My Itinerary"
            description={`Are you sure you want to add ${country.name.common} to your itinerary from ${dates.from} to ${dates.to}?`}
            confirmText={isSubmitting ? "Adding..." : "Add"}
            cancelText="Cancel"
            type="add"
            onConfirm={handleConfirmAdd}
            onCancel={() => setShowConfirm(false)}
            disabled={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default DestinationDetails;