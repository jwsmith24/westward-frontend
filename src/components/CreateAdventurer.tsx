import {useAdventurers} from "@/hooks/useAdventurers.ts";

export default function CreateAdventurer() {

    const {adventurers} = useAdventurers(); // access to global adventurers list


    return (<div>hi</div>)
}