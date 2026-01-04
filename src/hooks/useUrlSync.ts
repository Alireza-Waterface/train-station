import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCityFilter } from "@/features/stations/slices/stationSlice";

export const useUrlSync = () => {
   const dispatch = useAppDispatch();
   const cityFilter = useAppSelector((state) => state.stations.cityFilter);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const cityParam = params.get("city");

      if (cityParam) {
         dispatch(setCityFilter(cityParam));
      }
   }, [dispatch]);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const currentUrlParam = params.get("city") || "";

      if (cityFilter !== currentUrlParam) {
         if (cityFilter) {
            params.set("city", cityFilter);
         } else {
            params.delete("city");
         }

         const newUrl = `${window.location.pathname}?${params.toString()}`;
         window.history.replaceState(null, "", newUrl);
      }
   }, [cityFilter]);
};
