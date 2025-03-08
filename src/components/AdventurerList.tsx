import { useAdventurers } from "@/hooks/useAdventurers.ts";
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

export default function AdventurerList() {
  const { adventurers, loading, error } = useAdventurers();

  if (loading)
    return <p className="text-center text-gray-500">Loading adventurers...</p>;
  if (error) {
    console.log(error);
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Card className="max-w-4xl mx-auto mt-8 p-4">
      <CardHeader>
        <CardTitle>Adventurers</CardTitle>
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
              <TableRow key={adventurer.id}>
                <TableCell>{adventurer.name}</TableCell>
                <TableCell>{adventurer.adventurerClass}</TableCell>
                <TableCell>{adventurer.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
