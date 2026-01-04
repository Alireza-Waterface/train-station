import stationReducer, {
   setCityFilter,
   setSelectedStationId,
   resetFilters,
   toggleFavorite,
   toggleShowFavorites,
} from "./stationSlice";

describe("stationSlice", () => {
   const initialState = {
      selectedStationId: null,
      cityFilter: "",
      favorites: [],
      onlyFavorites: false,
   };

   it("should handle initial state", () => {
      const result = stationReducer(undefined, { type: "unknown" });
      expect(result).toEqual(initialState);
   });

   it("should handle setCityFilter", () => {
      const actual = stationReducer(initialState, setCityFilter("Berlin"));
      expect(actual.cityFilter).toEqual("Berlin");
   });

   it("should handle setSelectedStationId", () => {
      const actual = stationReducer(initialState, setSelectedStationId(123));
      expect(actual.selectedStationId).toEqual(123);
   });

   it("should add a favorite when toggled ON", () => {
      const actual = stationReducer(initialState, toggleFavorite(101));
      expect(actual.favorites).toContain(101);
   });

   it("should remove a favorite when toggled OFF", () => {
      const startState = { ...initialState, favorites: [101, 202] };
      const actual = stationReducer(startState, toggleFavorite(101));
      expect(actual.favorites).not.toContain(101);
      expect(actual.favorites).toContain(202);
   });

   it("should toggle onlyFavorites mode", () => {
      const actual = stationReducer(initialState, toggleShowFavorites());
      expect(actual.onlyFavorites).toBe(true);

      const actual2 = stationReducer(actual, toggleShowFavorites());
      expect(actual2.onlyFavorites).toBe(false);
   });

   it("should handle resetFilters", () => {
      const modifiedState = {
         selectedStationId: 456,
         cityFilter: "Hamburg",
         favorites: [999],
         onlyFavorites: true,
      };

      const actual = stationReducer(modifiedState, resetFilters());

      expect(actual.cityFilter).toBe("");
      expect(actual.selectedStationId).toBeNull();
      expect(actual.onlyFavorites).toBe(false);

      expect(actual.favorites).toEqual([999]);
   });
});
