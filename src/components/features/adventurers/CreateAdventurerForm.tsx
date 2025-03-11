import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Dispatch, SetStateAction } from "react";
import { Adventurer } from "../../../../types/adventurerTypes.ts";

type CreateAdventurerFormProps = {
  toggleStats: Dispatch<SetStateAction<boolean>>;
  setInfo: (adventurer: Adventurer) => void;
};

const formSchema = z.object({
  adventurerName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be less than 50" + " characters."),
  adventurerClass: z.enum(["WARRIOR", "MAGE", "PRIEST", "ROGUE"], {
    required_error: "You must select a class.",
  }),
});

const PLACEHOLDER = 0;
const STARTING_LEVEL = 1;

export function CreateAdventurerForm({
  toggleStats,
  setInfo,
}: CreateAdventurerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adventurerName: "",
      adventurerClass: undefined, // initial value is nothing selected
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setInfo({
      adventurerName: values.adventurerName,
      adventurerClass: values.adventurerClass,
      level: STARTING_LEVEL,
      id: PLACEHOLDER,
    });
    form.reset();
    toggleStats(true);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={
          "space-y-4 bg-slate-700 p-4 rounded-2xl text-white shadow-xl"
        }
      >
        <FormField
          control={form.control}
          name="adventurerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adventurer Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className={"text-gray-300"}>
                Choose a name for your character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adventurerClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adventurer Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className={"cursor-pointer"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"MAGE"}>Mage</SelectItem>
                  <SelectItem value={"WARRIOR"}>Warrior</SelectItem>
                  <SelectItem value={"ROGUE"}>Rogue</SelectItem>
                  <SelectItem value={"PRIEST"}>Priest</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className={"text-gray-300"}>
                Your class determines your starting stats and abilities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className={"cursor-pointer"}>
          Pick Stats
        </Button>
      </form>
    </Form>
  );
}
