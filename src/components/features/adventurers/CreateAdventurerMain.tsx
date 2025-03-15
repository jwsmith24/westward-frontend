import { CreateAdventurerForm } from "@/components/features/adventurers/CreateAdventurerForm.tsx";
import { useState } from "react";
import { StatSelectorForm } from "@/components/features/adventurers/StatSelectorForm.tsx";

import { useAdventurer } from "@/context/AdventurerContext.tsx";

/**
 * Will contain the character creator form and stat selector form.
 */
export default function CreateAdventurerMain() {
  const [statSelectorActive, setStatSelectorActive] = useState(false);

  const { activeAdventurer } = useAdventurer();

  return (
    <div className="container">
      <div>Active adventurer: {activeAdventurer?.adventurerName}</div>
      {!statSelectorActive && (
        <CreateAdventurerForm toggleStats={setStatSelectorActive} />
      )}

      {statSelectorActive && activeAdventurer && <StatSelectorForm />}
    </div>
  );
}
