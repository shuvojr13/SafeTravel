import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCountries = async ({ page, search, perPage }) => {
  if (!search) return [];
  
  try {
    const [byName, byCapital] = await Promise.all([
      axios.get(`${import.meta.env.VITE_COUNTRY_BY_NAME}/${search}`).catch(() => ({ data: [] })),
      axios.get(`${import.meta.env.VITE_COUNTRY_BY_CAPITAL}/${search}`).catch(() => ({ data: [] })),
    ]);

    const allResults = [
      ...byName.data.map(c => ({ type: "country", ...c })),
      ...byCapital.data.map(c => ({ type: "capital", ...c })),
    ].filter((item, idx, arr) => idx === arr.findIndex(t => t.cca3 === item.cca3));

    const start = (page - 1) * perPage;
    return allResults.slice(start, start + perPage);
  } catch {
    return [];
  }
};

export const useCountriesSearch = (page, search, perPage = 9) => {
  return useQuery({
    queryKey: ["searchResults", page, search],
    queryFn: () => fetchCountries({ page, search, perPage }),
    keepPreviousData: true,
  });
};
