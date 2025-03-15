import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdventurerList } from "@/hooks/useAdventurerList.ts";
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
  const { createAdventurer, creating, createError } = useAdventurerList();
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!activeAdventurer) return;

    const newAdventurer = {
      ...activeAdventurer,
      stats: {
        ...values,
      },
    };
    await createAdventurer(newAdventurer);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-slate-700 p-4 rounded-2xl text-white shadow-xl"
      >
        {/** Strength */}
        <FormField
          control={form.control}
          name="strength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strength (STR)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  max={17}
                  min={0}
                  onChange={(event) =>
                    field.onChange(event.target.valueAsNumber)
                  }
                />
              </FormControl>
              <FormDescription className="text-gray-300">
                Determines melee attack damage and carrying capacity.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Dexterity */}
        <FormField
          control={form.control}
          name="dexterity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dexterity (DEX)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  max={17}
                  min={0}
                  onChange={(event) =>
                    field.onChange(event.target.valueAsNumber)
                  }
                />
              </FormControl>
              <FormDescription className="text-gray-300">
                Affects agility, reflexes, and ranged attack accuracy.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Constitution */}
        <FormField
          control={form.control}
          name="constitution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Constitution (CON)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  max={17}
                  min={0}
                  onChange={(event) =>
                    field.onChange(event.target.valueAsNumber)
                  }
                />
              </FormControl>
              <FormDescription className="text-gray-300">
                Determines health and resistance to physical hardships.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Intelligence */}
        <FormField
          control={form.control}
          name="intelligence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intelligence (INT)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  max={17}
                  min={0}
                  onChange={(event) =>
                    field.onChange(event.target.valueAsNumber)
                  }
                />
              </FormControl>
              <FormDescription className="text-gray-300">
                Affects spell casting power and knowledge-based skills.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Wisdom */}
        <FormField
          control={form.control}
          name="wisdom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wisdom (WIS)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  max={17}
                  min={0}
                  onChange={(event) =>
                    field.onChange(event.target.valueAsNumber)
                  }
                />
              </FormControl>
              <FormDescription className="text-gray-300">
                Affects perception, insight, and spiritual connection.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Charisma */}
        <FormField
          control={form.control}
          name="charisma"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charisma (CHA)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  max={17}
                  min={0}
                  onChange={(event) =>
                    field.onChange(event.target.valueAsNumber)
                  }
                />
              </FormControl>
              <FormDescription className="text-gray-300">
                Determines persuasion, leadership, and social influence.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type={"submit"}
          className={"cursor-pointer"}
          disabled={creating}
        >
          {creating ? "Creating..." : "Create Adventurer"}
        </Button>
        {createError && (
          <div className={"mt-2 text-sm text-red-500"}>
            Error: {createError}
          </div>
        )}
      </form>
    </Form>
  );
}
