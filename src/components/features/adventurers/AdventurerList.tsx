import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";

import { useNavigate } from "react-router-dom";
import { useAdventurer } from "@/context/AdventurerContext.tsx";
import { useAdventurerList } from "@/hooks/useAdventurerList.ts";

export default function AdventurerList() {
  const { activeAdventurer, setActiveAdventurer } = useAdventurer();
  const { loading, error, adventurers } = useAdventurerList();
  const navigate = useNavigate();

  if (loading)
    return <p className="text-center text-gray-500">Loading adventurers...</p>;
  if (error) {
    console.log(error);
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Card className={"container"}>
      <CardHeader>
        <CardTitle className={"text-2xl"}>Character Select</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {adventurers.length === 0 && (
          <div>
            <p>No adventurers are saved on the server. Create a new one!</p>
          </div>
        )}
        {adventurers.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adventurers.map((adventurer) => (
                <TableRow
                  key={adventurer.id}
                  className={`cursor-pointer transition-colors ${
                    activeAdventurer?.id === adventurer.id
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveAdventurer(adventurer)}
                >
                  <TableCell>{adventurer.adventurerName}</TableCell>
                  <TableCell>{adventurer.adventurerClass}</TableCell>
                  <TableCell>{adventurer.level}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className={"flex gap-4 justify-end"}>
          <Button
            onClick={() => {
              setActiveAdventurer(null); // start fresh
              navigate("/create-adventurer"); // move to character creation view
            }}
          >
            Create Adventurer
          </Button>
          {activeAdventurer && (
            <Button
              className={"cursor-pointer"}
              onClick={() => navigate("/town")}
            >
              Select {activeAdventurer.adventurerName}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
