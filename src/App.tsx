import "./index.css";

import CharacterSelect from "@/components/CharacterSelect.tsx";

function App() {
  return (
    <div
      className={
        "bg-slate-600 w-screen min-h-screen flex items-center justify-center"
      }
    >
      <CharacterSelect />
    </div>
  );
}

export default App;
