import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetStationsQuery } from "../api/stationsApi";
import {
   setSelectedStationId,
   selectFilteredStations,
   toggleShowFavorites,
} from "../slices/stationSlice";
import { StationCard } from "./StationCard";
import { CityFilter } from "./CityFilter";
import { FaStar } from "react-icons/fa6";
import { clsx } from "clsx";

export const StationList = () => {
   const dispatch = useAppDispatch();
   const listContainerRef = useRef<HTMLDivElement>(null);

   const { data: allStations = [], isLoading, error } = useGetStationsQuery();

   const filteredStations = useAppSelector(selectFilteredStations);

   const selectedStationId = useAppSelector(
      (state) => state.stations.selectedStationId
   );
   const onlyFavorites = useAppSelector(
      (state) => state.stations.onlyFavorites
   );

   useEffect(() => {
      if (selectedStationId) {
         const element = document.getElementById(
            `station-row-${selectedStationId}`
         );
         if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
         }
      }
   }, [selectedStationId]);

   if (isLoading) {
      return (
         <div className="flex flex-col h-full p-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-3">
               {[1, 2, 3, 4, 5].map((i) => (
                  <div
                     key={i}
                     className="h-16 bg-gray-100 rounded-lg animate-pulse"
                  />
               ))}
            </div>
         </div>
      );
   }

   if (error) {
      return <div className="p-4 text-red-500">Error loading stations.</div>;
   }

   return (
      <div className="flex flex-col h-full bg-white">
         <div className="p-4 border-b border-gray-100 bg-white z-10 shadow-sm shrink-0">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Stations</h2>

            <div className="flex items-center justify-between mb-4">
               <p className="text-sm text-gray-500">
                  Showing {filteredStations.length} of {allStations.length}
               </p>

               <button
                  onClick={() => dispatch(toggleShowFavorites())}
                  className={clsx(
                     "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border cursor-pointer",
                     onlyFavorites
                        ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  )}
               >
                  <FaStar
                     className={
                        onlyFavorites ? "text-yellow-500" : "text-gray-400"
                     }
                  />
                  <span>Favorites Only</span>
               </button>
            </div>

            <CityFilter />
         </div>

         <div
            ref={listContainerRef}
            className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-300"
         >
            {filteredStations.length === 0 ? (
               <div className="p-8 text-center text-gray-500">
                  {onlyFavorites
                     ? "No favorites yet. Star some stations!"
                     : "No stations found."}
               </div>
            ) : (
               filteredStations.map((station) => (
                  <div key={station.id} id={`station-row-${station.id}`}>
                     <StationCard
                        station={station}
                        isSelected={station.id === selectedStationId}
                        onClick={() =>
                           dispatch(setSelectedStationId(station.id))
                        }
                        style={{}}
                     />
                  </div>
               ))
            )}
         </div>
      </div>
   );
};
