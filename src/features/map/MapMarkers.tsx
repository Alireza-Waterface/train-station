// src/features/map/MapMarkers.tsx
import { Marker, Popup, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
   setSelectedStationId,
   selectFilteredStations,
   toggleFavorite,
} from "@/features/stations/slices/stationSlice";
import { FaTrain, FaStar, FaRegStar } from "react-icons/fa6";

export const MapMarkers = () => {
   const dispatch = useAppDispatch();
   const filteredStations = useAppSelector(selectFilteredStations);
   const selectedStationId = useAppSelector(
      (state) => state.stations.selectedStationId
   );
   const favorites = useAppSelector((state) => state.stations.favorites);

   return (
      <MarkerClusterGroup chunkedLoading>
         {filteredStations.map((station) => {
            const isFavorite = favorites.includes(station.id);

            return (
               <Marker
                  key={station.id}
                  position={[station.lat, station.lng]}
                  eventHandlers={{
                     click: () => dispatch(setSelectedStationId(station.id)),
                  }}
                  opacity={selectedStationId === station.id ? 1.0 : 0.8}
               >
                  <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                     <span className="font-semibold">{station.name}</span>
                  </Tooltip>
                  <Popup>
                     <div className="p-1 min-w-[200px]">
                        <div className="flex justify-between items-start">
                           <h3 className="font-bold text-gray-800 pr-4">
                              {station.name}
                           </h3>
                           <button
                              onClick={(e) => {
                                 e.stopPropagation();
                                 dispatch(toggleFavorite(station.id));
                              }}
                              className="text-lg hover:scale-110 transition-transform"
                           >
                              {isFavorite ? (
                                 <FaStar className="text-yellow-400" />
                              ) : (
                                 <FaRegStar className="text-gray-400" />
                              )}
                           </button>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                           <FaTrain /> {station.city}
                        </p>
                     </div>
                  </Popup>
               </Marker>
            );
         })}
      </MarkerClusterGroup>
   );
};
