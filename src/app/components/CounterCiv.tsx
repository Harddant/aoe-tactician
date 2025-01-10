"use client";

import { Counter } from "./Counter"
import { type Civilization } from "@prisma/client";
import {api} from "@/trpc/react";


export const CounterCiv = ({
    selectedItem,
    setSelectedItem,
}: {
    selectedItem: Civilization
    setSelectedItem: (newItem: Civilization | null) => void
}) => {
    const badAgainst = api.civilization.getCounters.useQuery({civilizationId: selectedItem.id});
    const goodAgainst = api.civilization.getEffectives.useQuery({civilizationId: selectedItem.id});
    const synergies = api.civilization.getSynergies.useQuery({civilizationId: selectedItem.id});
    return (
        <div>
            <Counter<Civilization>
                title="Counters"
                getItemKey={(civ) => civ.id.toString()}
                getItemLabel={(civ) => civ.name}
                getItemImage={(civ) => civ.logo || "/select-civ.jpg"}
                onItemSelect={(civ) => setSelectedItem(civ)}
                selectedItem={selectedItem}
                goodAgainst={goodAgainst?.data?.effectives}
                badAgainst={badAgainst?.data?.counters}
                synergies={synergies?.data?.synergies}
                customImage="/select-civ.jpg"
            />
        </div>
    )
}
