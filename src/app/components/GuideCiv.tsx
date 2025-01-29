"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { type Civilization } from "@prisma/client";
import {api} from "@/trpc/react";

export const GuideCiv = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: Civilization
  setSelectedItem: (newItem: Civilization | null) => void
}) => {
  const civDetails = api.civilization.getCivilizationDetails.useQuery({civilizationId: selectedItem.id});
  console.log("civ: ", civDetails?.data);
  return(
    <div></div>
  )
}