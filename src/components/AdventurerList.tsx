import { Adventurer, useAdventurers } from "@/hooks/useAdventurers.ts";
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
import { useState } from "react";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";

export default function AdventurerList() {
  const { adventurers, loading, error } = useAdventurers();
  const [selectedAdventurer, setSelectedAdventurer] =
    useState<Adventurer | null>(null);

  if (loading)
    return <p className="text-center text-gray-500">Loading adventurers...</p>;
  if (error) {
    console.log(error);
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Card className="min-w-1/2 mx-auto mt-8 p-4 shadow-xl">
      <CardHeader>
        <CardTitle>Character Select</CardTitle>
      </CardHeader>
      <CardContent>
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
                className={cn(
                  "cursor-pointer transition-colors", // Always applied
                  selectedAdventurer?.id === adventurer.id
                    ? "bg-gray-300 hover:bg-gray-300" // If selected, keep the selection color
                    : "hover:bg-muted", // If not selected, apply hover effect
                )}
                onClick={() => setSelectedAdventurer(adventurer)}
              >
                <TableCell>{adventurer.name}</TableCell>
                <TableCell>{adventurer.adventurerClass}</TableCell>
                <TableCell>{adventurer.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className={"flex justify-end mt-4 gap-4"}>
          <Button className={"cursor-pointer"}>Create New Character</Button>
          {selectedAdventurer && (
            <Button className={"cursor-pointer"}>
              Select {selectedAdventurer.name}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
