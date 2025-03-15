import { createContext, ReactNode, useContext, useState } from "react";
import { Adventurer } from "../../types/adventurerTypes.ts";

type AdventurerContextProps = {
  activeAdventurer: Partial<Adventurer> | null;
  setActiveAdventurer: (newAdventurer: Partial<Adventurer> | null) => void;
};

const AdventurerContext = createContext<AdventurerContextProps | undefined>(
  undefined,
);
export function AdventurerProvider({ children }: { children: ReactNode }) {
  const [activeAdventurer, setActiveAdventurer] =
    useState<Partial<Adventurer> | null>(null);

  return (
    <AdventurerContext.Provider
      value={{
        activeAdventurer,
        setActiveAdventurer,
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
