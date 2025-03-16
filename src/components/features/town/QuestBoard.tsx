import { useQuests } from "@/hooks/useQuests.ts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const QuestBoard = () => {
  const { quests, loading, error } = useQuests();

  if (loading)
    return <div className="text-center mt-10">Loading quests...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;

  return (
    <div className=" p-10 bg-gray-300 rounded-2xl bg-cover">
      <h2 className="text-3xl font-bold text-center mb-8 font-cinzel">
        Town Notice Board
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quests.map((quest) => (
          <Card
            key={quest.id}
            className="relative bg-yellow-50 p-4 border-2 cursor-pointer border-dashed border-gray-300 shadow-lg transform rotate-[-2deg] hover:rotate-0 hover:scale-105 transition duration-200 ease-in-out hover:bg-yellow-100"
          >
            <CardHeader>
              <CardTitle className="text-xl font-cinzel">
                {quest.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 font-garamond">{quest.description}</p>
              <p className="text-sm italic">Status: {quest.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
