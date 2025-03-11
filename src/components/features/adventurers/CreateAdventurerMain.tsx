import { CreateAdventurerForm } from "@/components/features/adventurers/CreateAdventurerForm.tsx";
import { useState } from "react";
import { StatSelectorForm } from "@/components/features/adventurers/StatSelectorForm.tsx";
import { useAdventurerList } from "@/hooks/useAdventurerList.ts";
import { Adventurer } from "../../../../types/adventurerTypes.ts";
import { useAdventurer } from "@/context/AdventurerContext.tsx";

/**
 * Will contain the character creator form and stat selector form.
 */
export default function CreateAdventurerMain() {
  const [statSelectorActive, setStatSelectorActive] = useState(false);

  const { activeAdventurer, setActiveAdventurer } = useAdventurer();
  const { createAdventurer, creating, createError } = useAdventurerList();

  const setAdventurerInfo = (adventurer: Adventurer) => {
    setActiveAdventurer({
      adventurerName: adventurer.adventurerName,
      adventurerClass: adventurer.adventurerClass,
      level: adventurer.level,
      id: adventurer.id,
    });

    console.log("New adventurer info set:", adventurer);
  };

  return (
    <div className="container">
      <div>Active adventurer: {activeAdventurer?.adventurerName}</div>
      {!statSelectorActive && (
        <CreateAdventurerForm
          toggleStats={setStatSelectorActive}
          setInfo={setAdventurerInfo}
        />
      )}

      {statSelectorActive && <StatSelectorForm />}
    </div>
  );
}
