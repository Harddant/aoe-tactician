"use client";

import { api } from "@/trpc/react";
import { Picker } from "./Picker";
import { type Civilization } from "@prisma/client";



export const CivilizationSection = () => {
  const civilizationQuery = api.civilization.getAll.useQuery<Civilization[]>();

  if (civilizationQuery.isLoading) {
    return (
      <div className="my-8 flex items-center justify-center text-center text-2xl text-[#d1a756]">
        Loading...
      </div>
    );
  }

  if (civilizationQuery.isError) {
    return <div>Error loading civilizations</div>;
  }
  return (
    <>
      <Picker<Civilization>
        title="Select your civilization"
        data={civilizationQuery.data ?? []}
        getItemKey={(civ) => civ.id.toString()}
        getItemLabel={(civ) => civ.name}
        getItemImage={(civ) => civ.logo || "/default-civ-logo.jpg"}
        onItemSelect={(civ) => console.log("Selected Civ:", civ)}
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

