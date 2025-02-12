"use client";

import { Navbar } from "@/app/components/Navbar";
import { CivilizationSection } from "@/app/components/CivilizationSection";
import { CounterCiv } from "@/app/components/CounterCiv";
import { GuideCiv } from "@/app/components/GuideCiv";
import { useState } from "react";
import { type Civilization } from "@prisma/client";
import {Footer} from "@/app/components/Footer";


export const Wrapper = () => {
    const [selectedItem, setSelectedItem] = useState<Civilization | null>(null);
    return (
        <div className="w-full">
            <section className="w-full">
                <Navbar/>
                <CivilizationSection selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
            </section>

            {selectedItem && (
                <section id="civ-counters" className="w-full">
                    <CounterCiv selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                </section>
            )}

            {selectedItem && (
                <section id="civ-guide" className="w-full">
                    <GuideCiv selectedItem={selectedItem}/>
                    <Footer />
                </section>
            )}
        </div>
    )
}
