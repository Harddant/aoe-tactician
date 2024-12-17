"use client";

import { api } from "@/trpc/react";
import { Picker } from "../components/Picker";
import { Unit } from "@prisma/client";

export const UnitSection = () => {
    const unitQuery = api.unit.getAll.useQuery<Unit[]>();

    if (unitQuery.isLoading) {
        return (
            <div className="my-8 flex items-center justify-center text-center text-2xl text-[#d1a756]">
                Loading...
            </div>
        );
    }

    if (unitQuery.isError) {
        return (
            <div className="my-8 flex items-center justify-center text-center text-2xl text-[#d1a756]">
                Error loading units
            </div>
        );
    }

    return (
        <>
            <Picker<Unit>
                title="Select your Unit"
                data={unitQuery.data ?? []}
                getItemKey={(unit) => unit.id.toString()}
                getItemLabel={(unit) => unit.name}
                getItemImage={(unit) => unit.icon || "/default-civ-logo.jpg"}
                onItemSelect={(unit) => (unit)}
            />
            <div className="flex flex-row items-center justify-center gap-32 text-white">
                <button className="rounded-3xl border-4 border-[#d1a756] px-[4rem] py-6">
                    Counters
                </button>
                <button className="rounded-3xl border-4 border-[#d1a756] px-[4.5rem] py-6">
                    Guide
                </button>
            </div>
        </>
    );
};
