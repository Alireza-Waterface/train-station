import { StationList } from "@/features/stations/components/StationList";
import { StationsMap } from "@/features/map/MapContainer";
import { useUrlSync } from "./hooks/useUrlSync";

function App() {
   useUrlSync();

   return (
      <div className="flex flex-col md:flex-row h-screen w-full bg-gray-50 overflow-hidden">
         <aside className="w-full md:w-[400px] h-1/2 md:h-full shrink-0 bg-white shadow-xl z-10 relative flex flex-col border-r border-gray-200">
            <StationList />
         </aside>
         <main className="flex-1 h-1/2 md:h-full relative z-0 bg-gray-100">
            <StationsMap />
         </main>
      </div>
   );
}

export default App;
