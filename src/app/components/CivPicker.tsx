"use client"

import { api } from "@/trpc/react";
import { type Civilization } from "@prisma/client";
import {useState} from "react";
import Image from "next/image";


export const CivPicker = () => {
  const civilizationQuery = api.civilization.getAll.useQuery();
  const [selectedCiv, setSelectedCiv] = useState<Civilization | null>(null);
  const [isGridVisible, setIsGridVisible] = useState<boolean>(false);

  return (
    // here I am showing the selected civilization that's pulled from the db.
    // when no civilization is selected it's going to show "Select your civilization".\\
    <>
      <div className="my-8 flex flex-col items-center justify-center text-2xl text-[#d1a756]">
        <h2 className="flex text-[#fada8b]">
          {selectedCiv ? selectedCiv.name : "Select your civilization"}
        </h2>
        <button onClick={() => setIsGridVisible(!isGridVisible)}>
          <Image
            src={!selectedCiv ? "/select-civ.jpg" : selectedCiv.logo}
            alt="civilization Logo"
            width={150}
            height={219}
          />
        </button>
        {isGridVisible && (
          <div className="absolute top-24 z-20 mt-14 h-full w-full overflow-auto">
            <div className="grid grid-cols-9 gap-2 border-2 border-white bg-[#243c43] p-28">
              <button
                onClick={() => setIsGridVisible(false)}
                className="absolute right-6 top-6 z-30 flex h-8 w-8 items-center justify-center"
              >
                <Image
                  src="/cross.svg"
                  alt="Close the selector"
                  width={20}
                  height={20}
                />
              </button>
              {civilizationQuery.data?.map((civilization: Civilization) => (
                <button
                  className="mx-8 my-2 flex flex-col items-center justify-center"
                  key={civilization.id}
                  onClick={() => {
                    setSelectedCiv(civilization);
                    setIsGridVisible(false);
                  }}
                >
                  <Image
                    src="/saracens_logo.png"
                    alt={civilization.name}
                    width={54}
                    height={54}
                  />
                  <span className="text-white">{civilization.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
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
