"use client"

import { api } from "@/trpc/react";
import { type Civilization } from "@prisma/client";

export const CivPicker = () => {
    const civilizationQuery = api.civilization.getAll.useQuery();

    return (
        <div>
            {civilizationQuery.data?.map((civilization: Civilization, index: number) => (
              <p key={index}>{civilization.name}</p>
            ))}
        </div>
    );
};
