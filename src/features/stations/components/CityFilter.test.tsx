import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CityFilter } from "./CityFilter";
import { renderWithProviders } from "@/test/test-utils";

describe("CityFilter Component", () => {
   it("updates the store after user types (debounce check)", async () => {
      const { store } = renderWithProviders(<CityFilter />);

      const input = screen.getByPlaceholderText(/filter by city/i);
      expect(input).toBeInTheDocument();

      await userEvent.type(input, "Munich");

      expect(input).toHaveValue("Munich");
      expect(store.getState().stations.cityFilter).toBe("");

      await waitFor(
         () => {
            expect(store.getState().stations.cityFilter).toBe("Munich");
         },
         { timeout: 1000 }
      );
   });

   it("clears input and store when clear button is clicked", async () => {
      const { store } = renderWithProviders(<CityFilter />, {
         preloadedState: {
            stations: {
               cityFilter: "Berlin",
               selectedStationId: null,
               favorites: [],
               onlyFavorites: false,
            },
         },
      });

      const input = screen.getByPlaceholderText(/filter by city/i);
      expect(input).toHaveValue("Berlin");

      const clearBtn = screen.getByRole("button");
      await userEvent.click(clearBtn);

      expect(input).toHaveValue("");
      expect(store.getState().stations.cityFilter).toBe("");
   });
});
