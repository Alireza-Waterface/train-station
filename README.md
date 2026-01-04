# 🚆 Train Stations Map

A high-performance, interactive React application that visualizes German train stations. This project goes beyond the basic requirements to demonstrate **Senior Frontend Architecture**, focusing on performance features like clustering, UX (URL sync, favorites), and code quality (strict TypeScript, testing).

## 📋 Overview

The application fetches station data from a remote API, displays it on an interactive Leaflet map, and allows users to filter stations by city. It is built to handle large datasets efficiently using modern React patterns.

### Key Highlights

-  **Performance:** Handles thousands of markers using clustering lists.
-  **Persistence:** URL synchronization for shareable links and LocalStorage for favorites.
-  **Architecture:** Feature-sliced folder structure for maintainability.
-  **Tooling:** Built with **Bun** and **Vite** for blazing fast dev experience.

---

## 🚀 Features

### 🟢 Core Requirements (Implemented)

-  **Data Visualization:** Displays all stations on a Leaflet map centered on Germany.
-  **Search & Filter:** Filter stations by city name via a text input.
-  **Synchronized Views:** Filtering updates both the list and the map markers simultaneously.
-  **Interaction:** Clicking a station in the list zooms the map to that location.
-  **Responsive:** Fully responsive layout (Side-by-side on Desktop, Stacked on Mobile).

### 🌟 "Senior" Enhancements (Added)

-  **Marker Clustering:** Uses `react-leaflet-cluster` to group nearby stations, preventing map clutter and performance drops.
-  **Debounced Search:** Filtering logic is debounced (500ms) to prevent UI freezing while typing.
-  **URL Synchronization:** The filter state is synced with the URL (e.g., `/?city=Berlin`). You can copy and paste the link to share the specific view.
-  **User Favorites:** Users can "Star" stations. Favorites are persisted to `localStorage` and can be filtered via a "Favorites Only" toggle.
-  **Strict Error Handling:** Graceful handling of loading states and API errors.
-  **Feature-Based Architecture:** Code is organized by domain (`features/stations`, `features/map`) rather than technical type.

---

## 🛠 Tech Stack & Tools

-  **Runtime:** [Bun](https://bun.sh/) (Fast JavaScript runtime & package manager)
-  **Build Tool:** [Vite](https://vitejs.dev/)
-  **Framework:** React 19 + TypeScript (Strict Mode)
-  **State Management:**
   -  **Redux Toolkit:** Global state management.
   -  **RTK Query:** Data fetching, caching, and normalization.
-  **Map Library:**
   -  Leaflet & React-Leaflet
   -  `react-leaflet-cluster` for marker grouping.
-  **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
-  **Icons:** `react-icons` (FontAwesome 6)
-  **Testing:**
   -  **Vitest:** Unit and Integration test runner.
   -  **React Testing Library:** Component testing.

---

## ⚙️ Installation & Running

This project uses **Bun**. Ensure you have it installed, or you can fall back to `npm`.

### 1. Clone the repository

```bash
git clone https://github.com/Alireza-Waterface/train-station.git
cd train-stations
```

### 2. Install Dependencies

```bash
bun install
# or 'npm install'
```

### 3. Run Development Server

```bash
bun run dev
# or 'npm run dev'
```

The app will be available at `http://localhost:5173`.

### 4. Build for Production

```bash
bun run build
# or 'npm run build'
```

---

## 🧪 Testing

The project includes Unit Tests (for Redux logic) and Integration Tests (for Component interactions).

To run the test suite:

```bash
bun run test
```

**What is tested?**

1. **Redux Slices:** Verifies that filters, selection logic, and favorites toggling work correctly.
2. **Components:** Verifies that the Search input debounces correctly and updates the store.

---

## 📂 Project Structure

The project follows a **Feature-Based Architecture**. This scales better than grouping by file type.

```
src/
├── app/                  # Global store configuration & hooks
│   ├── store.ts          # Redux Store setup + Persistence Middleware
│   └── hooks.ts          # Typed hooks (useAppDispatch, etc.)
├── features/             # Business Logic modules
│   ├── stations/         # Station Logic
│   │   ├── api/          # RTK Query definition
│   │   ├── components/   # UI: StationList, StationCard, CityFilter
│   │   ├── slices/       # Redux Slice (Filter, Favorites state)
│   │   └── types.ts      # TypeScript interfaces
│   └── map/              # Map Logic
│       ├── MapContainer.tsx  # Main Leaflet wrapper
│       ├── MapMarkers.tsx    # Clustering & Marker rendering
│       └── MapController.tsx # Headless component for Camera control
├── hooks/                # Shared hooks (useDebounce, useUrlSync)
├── test/                 # Test utilities (Custom Renderers)
└── main.tsx              # Entry point
```

---

## 🔌 API & Data

The application fetches data from the provided GitHub Gist:

-  **Source:** [GitHub Gist - train-stations.json](https://gist.github.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c)
-  **Caching:** Data is cached by RTK Query for 1 hour to reduce network requests.
-  **Normalization:** Data is transformed on arrival to add a `searchString` property, optimizing the filter performance by avoiding repeated string concatenation during render cycles.

---

## 📧 Contact

**Author:** [Alireza Waterface](mailto:waterface.ar@gmail.com)
<br />
**Role:** Frontend Developer
