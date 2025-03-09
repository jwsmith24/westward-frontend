import "./index.css";

import AdventurerList from "@/components/AdventurerList.tsx";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import CreateAdventurer from "@/components/CreateAdventurer.tsx";
import {AdventurerProvider} from "@/context/AdventurerContext.tsx";

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
                  <Route path={"/"} element={<AdventurerList/>}/>
                  <Route path={"/create-adventurer"} element={<CreateAdventurer/>}/>
              </Routes>
          </div>
      </BrowserRouter>
      </AdventurerProvider>
  );
}

export default App;
