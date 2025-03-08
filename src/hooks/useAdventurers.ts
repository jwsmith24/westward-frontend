import { useEffect, useState } from "react";

export interface Adventurer {
  id: number;
  name: string;
  adventurerClass: "WARRIOR" | "MAGE" | "PRIEST" | "ROGUE";
  level: number;
}

/**
 * Hook to manage the list of adventurers. Handles loading state and errors.
 */
export function useAdventurers() {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchAdventurers() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/adventurers");

      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const data = await response.json();
      console.log("Adventurers received!", data);
      setAdventurers(data);
      setError(null); // clear any existing error on success
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setError(error.message);
      } else {
        setError("An unknown error occurred while fetching adventurers.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchAdventurers();
  }, []);

  /**
   * Updates the list of adventurers after one is created.
   */
  function addAdventurer(newAdventurer: Adventurer) {
    setAdventurers((prevState) => [...prevState, newAdventurer]);
  }

  return { adventurers, loading, error, addAdventurer };
}
