import { type Station } from "../types";
import { clsx } from "clsx";
import { FaTrainSubway, FaStar, FaRegStar } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleFavorite } from "../slices/stationSlice";

interface StationCardProps {
   station: Station;
   isSelected: boolean;
   onClick: () => void;
   style: React.CSSProperties;
}

export const StationCard = ({
   station,
   isSelected,
   onClick,
   style,
}: StationCardProps) => {
   const dispatch = useAppDispatch();
   const isFavorite = useAppSelector((state) =>
      state.stations.favorites.includes(station.id)
   );

   const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(toggleFavorite(station.id));
   };

   return (
      <div style={style} className="px-2 py-1">
         <div
            onClick={onClick}
            className={clsx(
               "w-full text-left p-3 rounded-lg transition-all duration-200 border relative group cursor-pointer",
               "hover:bg-brand-50 hover:border-brand-200",
               isSelected
                  ? "bg-gray-100 border-brand-500 shadow-sm ring-1 ring-brand-500"
                  : "bg-brand-50 border-gray-100 shadow-sm"
            )}
         >
            <div className="flex items-center justify-between pr-8">
               <div>
                  <h3
                     className={clsx(
                        "font-semibold text-sm",
                        isSelected ? "text-brand-900" : "text-gray-900"
                     )}
                  >
                     {station.name}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                     <FaTrainSubway className="text-gray-400" />
                     {station.city}
                  </p>
               </div>
            </div>

            <button
               onClick={handleFavoriteClick}
               className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-yellow-400"
               aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
               }
            >
               {isFavorite ? (
                  <FaStar className="text-yellow-400 text-lg" />
               ) : (
                  <FaRegStar className="text-lg" />
               )}
            </button>
         </div>
      </div>
   );
};
