"use client";

import { UnitSection } from "@/app/components/UnitSection"
import { Navbar } from "@/app/components/Navbar";
import { useState } from "react";
import  { type Unit} from "@prisma/client";
import { CounterUnit } from "@/app/components/CounterUnit";

export const UnitWrapper = () =>  {
    const [selectedItem, setSelectedItem] = useState<Unit | null>(null);
    return (
        <div className="h-screen w-full">
            <section className="h-full w-full">
                <Navbar />
                <UnitSection selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
            </section>

            {selectedItem && (
                <section id="unit-counters" className="h-screen w-full">
                    <CounterUnit selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                </section>
            )}
        </div>
    );
}