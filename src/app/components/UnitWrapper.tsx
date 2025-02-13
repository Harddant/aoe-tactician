"use client";

import { UnitSection } from "@/app/components/UnitSection"
import { Navbar } from "@/app/components/Navbar";
import { useState } from "react";
import  { type Unit} from "@prisma/client";
import { CounterUnit } from "@/app/components/CounterUnit";
import { GuideUnit } from "@/app/components/GuideUnit";
import {Footer} from "@/app/components/Footer";

export const UnitWrapper = () =>  {
    const [selectedItem, setSelectedItem] = useState<Unit | null>(null);
    return (
      <div className="w-full">
        <section className="w-full">
          <Navbar />
          <UnitSection
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </section>

        {selectedItem && (
          <section id="unit-counters" className="w-full">
            <CounterUnit
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </section>
        )}

        {selectedItem && (
          <section id="unit-guide" className="w-full">
            <GuideUnit selectedItem={selectedItem} />
            <Footer />
          </section>
        )}
      </div>
    );
}