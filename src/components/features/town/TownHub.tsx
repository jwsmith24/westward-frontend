import { useAdventurer } from "@/context/AdventurerContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export default function TownHub() {
  const { activeAdventurer } = useAdventurer();
  const navigate = useNavigate();

  return (
    <div className={"grid gap-4 bg-white p-6 rounded-2xl border-0 shadow-2xl"}>
      <div>{`Welcome to town, ${activeAdventurer?.adventurerName ?? "hero"}!`}</div>
      <Button
        className={"cursor-pointer"}
        onClick={() => navigate("/town/quest-board")}
      >
        View the Quest Board
      </Button>
    </div>
  );
}
