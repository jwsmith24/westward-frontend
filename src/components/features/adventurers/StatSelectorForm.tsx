import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdventurer } from "@/context/AdventurerContext.tsx";

const formSchema = z.object({
  strength: z
    .number()
    .min(0, "Base stats must be greater than 0.")
    .max(17, "Starting stats cannot be higher than 17."),
  dexterity: z
    .number()
    .min(0, "Base stats must be greater than 0.")
    .max(17, "Starting stats cannot be higher than 17."),
  constitution: z
    .number()
    .min(0, "Base stats must be greater than 0.")
    .max(17, "Starting stats cannot be higher than 17."),
  intelligence: z
    .number()
    .min(0, "Base stats must be greater than 0.")
    .max(17, "Starting stats cannot be higher than 17."),
  wisdom: z
    .number()
    .min(0, "Base stats must be greater than 0.")
    .max(17, "Starting stats cannot be higher than 17."),
  charisma: z
    .number()
    .min(0, "Base stats must be greater than 0.")
    .max(17, "Starting stats cannot be higher than 17."),
});

const BASE_STAT_VALUE = 10;

export function StatSelectorForm() {
  const { activeAdventurer } = useAdventurer();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      strength: BASE_STAT_VALUE,
      dexterity: BASE_STAT_VALUE,
      constitution: BASE_STAT_VALUE,
      intelligence: BASE_STAT_VALUE,
      wisdom: BASE_STAT_VALUE,
      charisma: BASE_STAT_VALUE,
    },
  });

  return <div>STATS for {activeAdventurer?.adventurerName ?? "hero"}</div>;
}
