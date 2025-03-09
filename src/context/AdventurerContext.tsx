import { Adventurer, useAdventurerList } from "@/hooks/useAdventurerList.ts";
import { createContext, ReactNode, useContext, useState } from "react";

type AdventurerContextProps = {
  activeAdventurer: Adventurer | null;
  setActiveAdventurer: (newAdventurer: Adventurer | null) => void;
  adventurers: Adventurer[];
  loading: boolean;
  error: string | null;
  addAdventurer: (adventurer: Adventurer) => void;
  fetchAdventurers: () => void;
};

const AdventurerContext = createContext<AdventurerContextProps | undefined>(
  undefined,
);
export function AdventurerProvider({ children }: { children: ReactNode }) {
  const [activeAdventurer, setActiveAdventurer] = useState<Adventurer | null>(
    null,
  );
  const { adventurers, loading, error, addAdventurer, fetchAdventurers } =
    useAdventurerList(); // wrap API calls and related state in the context provider

  return (
    <AdventurerContext.Provider
      value={{
        activeAdventurer,
        setActiveAdventurer,
        adventurers,
        loading,
        error,
        addAdventurer,
        fetchAdventurers,
      }}
    >
      {children}
    </AdventurerContext.Provider>
  );
}

export function useAdventurer() {
  const context = useContext(AdventurerContext);
  if (!context)
    throw new Error("useAdventurer must be used within AdventurerProvider");
  return context;
}
