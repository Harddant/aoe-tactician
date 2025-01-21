"use client";

import { Navbar } from "@/app/components/Navbar";
import { CivilizationSection } from "@/app/components/CivilizationSection";
import { CounterCiv } from "@/app/components/CounterCiv";
import { useState } from "react";
import { type Civilization } from "@prisma/client";

export const Wrapper = () => {
    const [selectedItem, setSelectedItem] = useState<Civilization | null>(null);
    return (
        <div className="h-screen w-full">
            <section className="h-screen w-full">
                <Navbar/>
                <CivilizationSection selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
            </section>

            {selectedItem && (
                <section id="civ-counters" className="h-screen w-full">
                    <CounterCiv selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                </section>
            )}
        </div>
    )
}
