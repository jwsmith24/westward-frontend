import { useEffect, useState } from "react";

export interface Adventurer {
  id: number;
  name: string;
  adventurerClass: "WARRIOR" | "MAGE" | "PRIEST" | "ROGUE";
  level: number;
}

/**
 * Hook to fetch all adventurers to the backend. Handles loading state and errors.
 */
export function useAdventurers() {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAdventurers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/adventurers", {
          signal,
        });

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
    };

    void fetchAdventurers();

    return () => {
      controller.abort(); // cleanup function to cancel fetch request when component unmounts during a request
    };
  }, []);

  return { adventurers, loading, error };
}
