"use client";

import { Counter } from "./Counter"
import { type Unit } from "@prisma/client";
import {api} from "@/trpc/react";


export const CounterUnit = ({
   selectedItem,
   setSelectedItem,
}: {
    selectedItem: Unit
    setSelectedItem: (newItem: Unit | null) => void
}) => {
    const badAgainst = api.unit.getCounters.useQuery({unitId: selectedItem.id});
    const goodAgainst = api.unit.getEffectives.useQuery({unitId: selectedItem.id});
    const synergies = api.unit.getSynergies.useQuery({unitId: selectedItem.id});
    return (
        <div>
            <Counter<Unit>
                title="Counters"
                getItemKey={(unit) => unit.id.toString()}
                getItemLabel={(unit) => unit.name}
                getItemImage={(unit) => unit.icon || "/select-civ.jpg"}
                onItemSelect={(unit) => setSelectedItem(unit)}
                selectedItem={selectedItem}
                goodAgainst={goodAgainst?.data?.effectives}
                badAgainst={badAgainst?.data?.counters}
                synergies={synergies?.data?.synergies}
                customImage="/select-civ.jpg"
            />
        </div>
    )
}