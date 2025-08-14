import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCountry = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_COUNTRY_API}/${id}`);
  return res.data[0];
};

export const useCountry = (id) => {
  return useQuery({
    queryKey: ["country", id],
    queryFn: () => fetchCountry(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes - country data doesn't change often
  });
};
