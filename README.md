# PANTOhealth Frontend Assignment - Train Stations Map

A high-performance React application visualizing German train stations using Leaflet, Redux Toolkit, and Tailwind CSS.

## Features implemented

-  🗺️ **Interactive Map:** Leaflet integration with Clustering for performance.
-  ⚡ **State Management:** Redux Toolkit + RTK Query for caching and global state.
-  🔍 **Smart Filtering:** Debounced search that syncs with the URL (`?city=Berlin`).
-  🚀 **Performance:** Virtualized list rendering for handling large datasets.
-  📱 **Responsive:** Mobile-optimized layout (Map/List split).
-  🧪 **Testing:** Unit and Integration tests with Vitest.

## Tech Stack

-  React 19 + TypeScript
-  Bun + Vite
-  Redux Toolkit (RTK Query)
-  Leaflet + React Leaflet Cluster
-  Tailwind CSS v4

## How to run

1. `bun install`
2. `bun run dev`
3. `bun run test` (to run test suite)
