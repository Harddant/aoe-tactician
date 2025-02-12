"use client"

import { type Civilization } from "@prisma/client";
import { api } from "@/trpc/react";
import { Guide } from "./Guide";

export const GuideCiv = ({
  selectedItem,
}: {
  selectedItem: Civilization
}) => {
  const civDetails = api.civilization.getCivilizationDetails.useQuery({civilizationId: selectedItem.id});
  console.log("civ: ", civDetails?.data);

  return(
      <div>
        <div>
          {civDetails.data ? (
              <Guide<Civilization>
                  civDetails={() => civDetails.data}
              />
          ) : (
              <div>Loading...</div>
          )}
        </div>
      </div>
  )
}