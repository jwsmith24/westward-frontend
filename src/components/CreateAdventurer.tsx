
import {useState} from "react";
import {useAdventurer} from "@/context/AdventurerContext.tsx";

export default function CreateAdventurer() {

    const {activeAdventurer} = useAdventurer();

    // form values
    const [newAdventurer, setNewAdventurer] = useState({
        name: "",
        adventurerClass: "",
    });

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

            setNewAdventurer({ name: "", adventurerClass: "" }); // reset form
        } catch (error) {
            if (error instanceof Error) {
                alert(`Character creation error: ${error.message}`);
            } else {
                alert("Character creation failed for an unknown reason.. try again!");
            }
        }
    }

    console.log("character: ", activeAdventurer);
    return (<div>Hi {activeAdventurer?.name}</div>)
}