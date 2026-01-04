// src/test/test-utils.tsx
import React from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "@/app/store";
import type { AppStore, RootState } from "@/app/store";

// Define strict types for the options
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
   preloadedState?: Partial<RootState>;
   store?: AppStore;
}

export function renderWithProviders(
   ui: React.ReactElement,
   extendedRenderOptions: ExtendedRenderOptions = {}
) {
   const {
      preloadedState = {},
      // Uses the factory from store.ts -> Types are guaranteed to match now
      store = setupStore(preloadedState),
      ...renderOptions
   } = extendedRenderOptions;

   function Wrapper({ children }: { children: React.ReactNode }) {
      return <Provider store={store}>{children}</Provider>;
   }

   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
