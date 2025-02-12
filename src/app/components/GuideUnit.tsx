"use client"

import { type Unit } from "@prisma/client";
import { api } from "@/trpc/react";
import { Guide } from "./Guide";

export const GuideUnit = ({
    selectedItem,
}: {
    selectedItem: Unit
}) => {
    const unitDetails = api.unit.getUnitDetails.useQuery({unitId: selectedItem.id});
    console.log("unit: ", unitDetails?.data);

    return (
        <div>
            <div>
                {unitDetails.data ? (
                    <Guide<Unit>
                        unitDetails={() => unitDetails.data}
                    />
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}