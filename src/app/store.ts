import {
   configureStore,
   combineReducers,
   type Middleware,
} from "@reduxjs/toolkit";
import { stationsApi } from "@/features/stations/api/stationsApi";
import stationReducer, {
   toggleFavorite,
} from "@/features/stations/slices/stationSlice";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
   const result = next(action);

   if (toggleFavorite.match(action)) {
      const state = store.getState() as RootState;
      localStorage.setItem(
         "panto-favorites",
         JSON.stringify(state.stations.favorites)
      );
   }

   return result;
};

const rootReducer = combineReducers({
   [stationsApi.reducerPath]: stationsApi.reducer,
   stations: stationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
   return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
         })
            .concat(stationsApi.middleware)
            .concat(localStorageMiddleware),
      preloadedState,
   });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
