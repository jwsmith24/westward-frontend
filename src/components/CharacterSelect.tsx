import { useState } from "react";
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
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select.tsx";

export default function CharacterSelect() {
  const { adventurers, loading, error, addAdventurer } = useAdventurers();

  const [selectedAdventurer, setSelectedAdventurer] =
    useState<Adventurer | null>(null);

  const [newAdventurer, setNewAdventurer] = useState({
    name: "",
    adventurerClass: "",
  });

  const [open, setOpen] = useState(false);

  async function handleCreateCharacter() {
    if (!newAdventurer.name || !newAdventurer.adventurerClass) {
      alert("Please enter a name and select a class.");
      return;
    }
    console.log("Creating Adventurer:", newAdventurer);

    try {
      const response = await fetch("http://localhost:8080/api/adventurers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdventurer),
      });

      if (!response.ok) {
        throw new Error("Failed to create character.");
      }

      const data = await response.json();
      console.log("Character created!", data);
      addAdventurer(data); // update state to immediately render

      setNewAdventurer({ name: "", adventurerClass: "" }); // reset form
      setOpen(false); // close modal
    } catch (error) {
      if (error instanceof Error) {
        alert(`Character creation error: ${error.message}`);
      } else {
        alert("Character creation failed for an unknown reason.. try again!");
      }
    }
  }

  if (loading)
    return <p className="text-center text-gray-500">Loading adventurers...</p>;
  if (error) {
    console.log(error);
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Card className={"w-1/3"}>
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
                className={`cursor-pointer transition-colors ${
                  selectedAdventurer?.id === adventurer.id
                    ? "bg-muted"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedAdventurer(adventurer)}
              >
                <TableCell>{adventurer.name}</TableCell>
                <TableCell>{adventurer.adventurerClass}</TableCell>
                <TableCell>{adventurer.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end mt-4 gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant={"secondary"}
                className={"cursor-pointer hover:bg-gray-300 transition-colors"}
              >
                Create New Character
              </Button>
            </DialogTrigger>
            <DialogContent className={"fixed flex flex-col"}>
              <DialogHeader>
                <DialogTitle>Create a New Adventurer</DialogTitle>
                <DialogDescription>
                  Choose a name and class for your adventurer.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newAdventurer.name}
                    onChange={(e) =>
                      setNewAdventurer({
                        ...newAdventurer,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter character name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={newAdventurer.adventurerClass}
                    onValueChange={(value) =>
                      setNewAdventurer({
                        ...newAdventurer,
                        adventurerClass: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WARRIOR">Warrior</SelectItem>
                      <SelectItem value="MAGE">Mage</SelectItem>
                      <SelectItem value="ROGUE">Rogue</SelectItem>
                      <SelectItem value="PRIEST">Priest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>

                <Button onClick={handleCreateCharacter} type={"submit"}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {selectedAdventurer && (
            <Button
              className={"cursor-pointer"}
              onClick={() =>
                alert(`Go Westward with ${selectedAdventurer.name}!`)
              }
            >
              Select {selectedAdventurer.name}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
