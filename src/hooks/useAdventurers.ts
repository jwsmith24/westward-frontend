import {useEffect, useState} from "react";

export interface Adventurer {
  id: number;
  name: string;
  adventurerClass: "WARRIOR" | "MAGE" | "PRIEST" | "ROGUE";
  level: number
}

/**
 * Hook to fetch all adventurers to the backend. Handles loading state and errors.
 */
export function useAdventurers() {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/adventurer")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch adventurers")
        }
        return res.json();
      })
      .then((data) => {
        setAdventurers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      })
  }, []);


  return { adventurers, loading, error}

}