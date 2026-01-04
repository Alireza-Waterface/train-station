import stationReducer, {
   setCityFilter,
   setSelectedStationId,
   resetFilters,
} from "./stationSlice";

describe("stationSlice", () => {
   const initialState = {
      selectedStationId: null,
      cityFilter: "",
   };

   it("should handle initial state", () => {
      expect(stationReducer(undefined, { type: "unknown" })).toEqual(
         initialState
      );
   });

   it("should handle setCityFilter", () => {
      const actual = stationReducer(initialState, setCityFilter("Berlin"));
      expect(actual.cityFilter).toEqual("Berlin");
   });

   it("should handle setSelectedStationId", () => {
      const actual = stationReducer(initialState, setSelectedStationId(123));
      expect(actual.selectedStationId).toEqual(123);
   });

   it("should handle resetFilters", () => {
      const modifiedState = { selectedStationId: 456, cityFilter: "Hamburg" };
      const actual = stationReducer(modifiedState, resetFilters());
      expect(actual).toEqual(initialState);
   });
});
