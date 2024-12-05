"use client";

import React, {useState} from "react";
import { Sidebar } from "@/app/components/Cms/Sidebar";

export const Main = () => {
    const [currentModel, setCurrentModel] = useState<number>(0);

    const models = [
        'Ages',
        'Civilizations',
        'Units',
    ];

    return (
        <div className={`flex flex-row space-x-0 w-[100vw]`}>
            <Sidebar currentModel={currentModel} setCurrentModel={setCurrentModel} />
            <main>

            </main>
        </div>
    );
};