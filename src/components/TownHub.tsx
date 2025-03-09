import {useAdventurer} from "@/context/AdventurerContext.tsx";

export default function TownHub() {

    const {activeAdventurer} = useAdventurer();

    return (<div>{`Welcome to town, ${activeAdventurer?.name ?? "hero"}!`}</div>)
}