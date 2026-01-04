import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCityFilter } from "../slices/stationSlice";
import { useDebounce } from "@/hooks/useDebounce";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

export const CityFilter = () => {
   const dispatch = useAppDispatch();
   const globalFilter = useAppSelector((state) => state.stations.cityFilter);

   const [localValue, setLocalValue] = useState(globalFilter);

   const debouncedValue = useDebounce(localValue, 500);

   useEffect(() => {
      dispatch(setCityFilter(debouncedValue));
   }, [debouncedValue, dispatch]);

   useEffect(() => {
      setLocalValue(globalFilter);
   }, [globalFilter]);

   const handleClear = () => {
      setLocalValue("");
      dispatch(setCityFilter(""));
   };

   return (
      <div className="relative mb-4">
         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaMagnifyingGlass className="text-gray-400 text-sm" />
         </div>
         <input
            type="text"
            className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-shadow"
            placeholder="Filter by city..."
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            aria-label="Filter stations by city"
         />
         {localValue && (
            <button
               onClick={handleClear}
               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
               <FaXmark />
            </button>
         )}
      </div>
   );
};
