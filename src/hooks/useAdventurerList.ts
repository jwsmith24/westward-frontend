import { useEffect, useState } from "react";
import { Adventurer } from "../../types/adventurerTypes.ts";
import { useAdventurer } from "@/context/AdventurerContext.tsx";

/**
 * Hook to manage the list of adventurers. Handles loading state and errors.
 */
export function useAdventurerList() {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const { setActiveAdventurer } = useAdventurer();

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
        setError(
          "Failed to retrieve adventurer list from the server. Please try again.",
        );
      } else {
        setError("An unknown error occurred while fetching adventurers.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function createAdventurer(adventurer: Partial<Adventurer>) {
    setCreating(true);
    setCreateError(null);
    console.log("passed to createAdventurer", adventurer);
    try {
      const response = await fetch("http://localhost:8080/api/adventurers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adventurer),
      });

      if (!response.ok)
        throw new Error(
          `Failed to create new adventurer: ${response.statusText}`,
        );

      const newAdventurer: Adventurer = await response.json();
      addAdventurer(newAdventurer);
      setActiveAdventurer(newAdventurer); // set latest new adventurer as active
    } catch (error) {
      setCreateError(
        error instanceof Error
          ? error.message
          : "An unknown error occurred during character creation.",
      );
    } finally {
      setCreating(false);
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
    console.log("New adventurer added!", newAdventurer);
  }

  return {
    adventurers,
    loading,
    error,
    addAdventurer,
    fetchAdventurers,
    createAdventurer,
    creating,
    createError,
  };
}
