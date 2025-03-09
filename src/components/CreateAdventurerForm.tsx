import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


const formSchema = z.object({
    adventurerName: z.string().min(2).max(50),
})

export function CreateAdventurerForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adventurerName: "",
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("submitted!", values);
    }
}