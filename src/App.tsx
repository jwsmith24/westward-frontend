import "./index.css";

import AdventurerList from "@/components/features/adventurers/AdventurerList.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CreateAdventurerMain from "@/components/features/adventurers/CreateAdventurerMain.tsx";
import { AdventurerProvider } from "@/context/AdventurerContext.tsx";
import TownHub from "@/components/features/town/TownHub.tsx";

function App() {
  return (
    <AdventurerProvider>
      <BrowserRouter>
        <div
          className={
            "bg-slate-600 w-screen min-h-screen flex items-center justify-center"
          }
        >
          <Routes>
            <Route path={"/"} element={<AdventurerList />} />
            <Route
              path={"/create-adventurer"}
              element={<CreateAdventurerMain />}
            />
            <Route path={"/town"} element={<TownHub />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AdventurerProvider>
  );
}

export default App;
