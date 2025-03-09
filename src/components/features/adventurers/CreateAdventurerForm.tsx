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

import { useAdventurerList } from "@/hooks/useAdventurerList.ts";

const formSchema = z.object({
  adventurerName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be less than 50" + " characters."),
  adventurerClass: z.enum(["WARRIOR", "MAGE", "PRIEST", "ROGUE"], {
    required_error: "You must select a class.",
  }),
});

export function CreateAdventurerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adventurerName: "",
      adventurerClass: undefined, // initial value is nothing selected
    },
  });

  const { createAdventurer, creating, createError } = useAdventurerList();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    alert("submit clicked!");
    console.log("values passed to onSubmit:", values);
    await createAdventurer({
      adventurerName: values.adventurerName,
      adventurerClass: values.adventurerClass,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="adventurerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adventurer Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
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
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select a class"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"MAGE"}>Mage</SelectItem>
                  <SelectItem value={"WARRIOR"}>Warrior</SelectItem>
                  <SelectItem value={"ROGUE"}>Rogue</SelectItem>
                  <SelectItem value={"PRIEST"}>Priest</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Your class determines your starting stats and abilities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {createError && <p className={"text-red-500"}>{createError}</p>}
        <Button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
