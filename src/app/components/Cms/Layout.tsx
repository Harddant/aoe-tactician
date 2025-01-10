"use client";

import { api } from "@/trpc/react";
import { Age, type Civilization, Unit } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/app/components/Cms/Sidebar";
import { Main } from "@/app/components/Cms/Main";

export const Layout = () => {
    const [currentModelType, setCurrentModelType] = useState<number>(0);
    const [currentModelId, setCurrentModelId] = useState<number|null>(null);

    useEffect(() => {
        setCurrentModelId(null);
    }, [currentModelType]);

    const ageQuery = api.age.getAll.useQuery();
    const civilizationQuery = api.civilization.getAll.useQuery();
    const unitQuery = api.unit.getAll.useQuery();

    const modelTypes = ['Ages', 'Civilizations', 'Units'];
    let models: Age[] | Civilization[] | Unit[] | undefined = undefined;

    switch (currentModelType) {
        case 0:
            models = ageQuery.data;
            break;
        case 1:
            models = civilizationQuery.data;
            break;
        case 2:
            models = unitQuery.data;
            break;
    }

    return (
        <div className={`flex flex-row w-[100vw]`}>
            <Sidebar currentModelType={currentModelType} setCurrentModelType={setCurrentModelType} models={modelTypes} />
            <Main modelType={modelTypes[currentModelType] ?? ""} models={models} currentModelId={currentModelId} setCurrentModelId={setCurrentModelId} />
        </div>
    );
};