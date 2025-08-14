import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchWeather = async (lat, lon) => {
  const url = `${
    import.meta.env.VITE_WEATHER_API
  }?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=auto`;
  const res = await axios.get(url);
  return res.data;
};

export const useWeather = (lat, lon) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 5 * 60 * 1000, // 5 minutes - weather changes more frequently
  });
};