import { useEffect, useState } from "react";
import { Quest } from "../../types/Quest.ts";

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve all available quests on mount
  useEffect(() => {
    void fetchQuests();
  }, []);

  const fetchQuests = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/quests");
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      console.log("Quests received!", data);
      setQuests(data);
      setError(null); // reset error state on success
    } catch (error) {
      if (error instanceof Error) {
        setError("Failed to retrieve quests from the server.");
      } else {
        setError("An unknown error occurred while fetching quests.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    quests,
    loading,
    error,
  };
}
