"use client";

import { Counter } from "./Counter"
import { type Civilization } from "@prisma/client";
import {useState} from "react";
import {api} from "@/trpc/react";


export const CounterCiv = ({
    selectedItem,
}: {
    selectedItem: Civilization
}) => {
    const [selectedCiv, setSelectedCiv] = useState<Civilization | null>(null);
    // const goodAgainst = api.civilization.getCounters.useQuery({civilizationId: selectedItem.id});
    return (
        <div>
            <Counter<Civilization>
                title="Counters"
                data={selectedItem}
                getItemKey={(civ) => civ.id.toString()}
                getItemLabel={(civ) => civ.name}
                getItemImage={(civ) => civ.logo || "/select-civ.jpg"}
                onItemSelect={(civ) => setSelectedCiv(civ)}
                selectedItem={selectedCiv}
                // goodAgainst={goodAgainst?.data?.counters}
                // badAgainst={badAgainst}
                // synergies={synergies}
                customImage="/select-civ.jpg"
            />
        </div>
    )
}
