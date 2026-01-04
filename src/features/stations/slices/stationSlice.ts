import {
   createSlice,
   type PayloadAction,
   createSelector,
} from "@reduxjs/toolkit";
import type { StationState } from "../types";
import type { RootState } from "@/app/store";
import { stationsApi } from "../api/stationsApi";

const loadFavorites = (): number[] => {
   try {
      const stored = localStorage.getItem("panto-favorites");
      return stored ? JSON.parse(stored) : [];
   } catch (e) {
      console.warn("Failed to load favorites", e);
      return [];
   }
};

interface ExtendedStationState extends StationState {
   favorites: number[];
   onlyFavorites: boolean;
}

const initialState: ExtendedStationState = {
   selectedStationId: null,
   cityFilter: "",
   favorites: loadFavorites(),
   onlyFavorites: false,
};

export const stationSlice = createSlice({
   name: "stations",
   initialState,
   reducers: {
      setCityFilter: (state, action: PayloadAction<string>) => {
         state.cityFilter = action.payload;
      },
      setSelectedStationId: (state, action: PayloadAction<number | null>) => {
         state.selectedStationId = action.payload;
      },
      toggleFavorite: (state, action: PayloadAction<number>) => {
         const id = action.payload;
         if (state.favorites.includes(id)) {
            state.favorites = state.favorites.filter((favId) => favId !== id);
         } else {
            state.favorites.push(id);
         }
      },
      toggleShowFavorites: (state) => {
         state.onlyFavorites = !state.onlyFavorites;
      },
      resetFilters: (state) => {
         state.cityFilter = "";
         state.selectedStationId = null;
         state.onlyFavorites = false;
      },
   },
});

export const {
   setCityFilter,
   setSelectedStationId,
   resetFilters,
   toggleFavorite,
   toggleShowFavorites,
} = stationSlice.actions;

const selectAllStations = stationsApi.endpoints.getStations.select();
const selectCityFilter = (state: RootState) => state.stations.cityFilter;
const selectFavorites = (state: RootState) => state.stations.favorites;
const selectOnlyFavorites = (state: RootState) => state.stations.onlyFavorites;

export const selectFilteredStations = createSelector(
   [selectAllStations, selectCityFilter, selectOnlyFavorites, selectFavorites],
   (stationsResult, cityFilter, onlyFavorites, favorites) => {
      const stations = stationsResult.data || [];

      let result = onlyFavorites
         ? stations.filter((s) => favorites.includes(s.id))
         : stations;

      if (cityFilter) {
         const lowerFilter = cityFilter.toLowerCase();
         result = result.filter((s) => s.searchString.includes(lowerFilter));
      }

      return result;
   }
);

export default stationSlice.reducer;
