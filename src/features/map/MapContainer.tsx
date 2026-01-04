import { useEffect } from "react";
import {
   MapContainer as LeafletMap,
   TileLayer,
   ZoomControl,
} from "react-leaflet";
import { MapController } from "./MapController";
import { MapMarkers } from "./MapMarkers";
import { fixLeafletIcons } from "@/utils/leaflet-setup";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;

export const StationsMap = () => {
   useEffect(() => {
      fixLeafletIcons();
   }, []);

   return (
      <div className="h-full w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
         <LeafletMap
            center={GERMANY_CENTER}
            zoom={DEFAULT_ZOOM}
            className="h-full w-full z-0"
            zoomControl={false}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ZoomControl position="bottomright" />

            <MapController />
            <MapMarkers />
         </LeafletMap>
      </div>
   );
};
