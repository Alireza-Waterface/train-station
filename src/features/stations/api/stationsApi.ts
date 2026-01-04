import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Station } from "../types";

const GIST_URL =
   "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/train-stations.json";

export const stationsApi = createApi({
   reducerPath: "stationsApi",
   baseQuery: fetchBaseQuery({ baseUrl: "/" }),
   endpoints: (builder) => ({
      getStations: builder.query<Station[], void>({
         query: () => GIST_URL,
         transformResponse: (response: Omit<Station, "searchString">[]) => {
            if (!Array.isArray(response)) {
               console.error("API response is not an array:", response);
               return [];
            }

            return response.map((station) => ({
               ...station,
               searchString: `${station.name.toLowerCase()} ${station.city.toLowerCase()}`,
            }));
         },
         keepUnusedDataFor: 3600,
      }),
   }),
});

export const { useGetStationsQuery } = stationsApi;
