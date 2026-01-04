import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useAppSelector } from "@/app/hooks";
import { useGetStationsQuery } from "@/features/stations/api/stationsApi";

export const MapController = () => {
   const map = useMap();
   const selectedStationId = useAppSelector(
      (state) => state.stations.selectedStationId
   );
   const { data: stations } = useGetStationsQuery();

   useEffect(() => {
      if (!selectedStationId || !stations) return;

      const station = stations.find((s) => s.id === selectedStationId);
      if (station) {
         map.flyTo([station.lat, station.lng], 13, {
            animate: true,
            duration: 1,
         });
      }
   }, [selectedStationId, stations, map]);

   return null;
};
