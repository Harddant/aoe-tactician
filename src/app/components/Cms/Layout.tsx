"use client";

import { api } from "@/trpc/react";
import {Age, type Civilization, CivilizationBonus, Unit, UnitType} from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/app/components/Cms/Sidebar";
import { Main } from "@/app/components/Cms/Main";

export const Layout = () => {
    const [currentModelType, setCurrentModelType] = useState<number>(0);
    const [currentModelId, setCurrentModelId] = useState<number|null>(null);
    const [newModel, setNewModel] = useState<boolean>(false);
    const modelTypes = [
        'Ages',
        'Civilizations',
        'CivilizationBonuses',
        'TeamBonuses',
        'TrainingBuildings',
        'UniqueBuildings',
        'UniqueTechnologies',
        'Units',
        'UnitTypes',
    ];
    let models: Age[] | Civilization[] | CivilizationBonus[] | Unit[] | UnitType[] | undefined = undefined;

    const ageQuery = api.age.getAll.useQuery();
    const civilizationQuery = api.civilization.getAll.useQuery();
    const civilizationBonusQuery = api.civilizationBonus.getAll.useQuery();
    const teamBonusesQuery = api.teamBonus.getAll.useQuery();
    const trainingBuildings = api.trainingBuilding.getAll.useQuery();
    const uniqueBuildings = api.uniqueBuilding.getAll.useQuery();
    const uniqueTechnologies = api.uniqueTechnology.getAll.useQuery();
    const unitQuery = api.unit.getAll.useQuery();
    const unitTypeQuery = api.unitType.getAll.useQuery();


    useEffect(() => {
        setCurrentModelId(null);
    }, [currentModelType]);


    switch (currentModelType) {
        case 0:
            models = ageQuery.data;
            break;
        case 1:
            models = civilizationQuery.data;
            break;
        case 2:
            models = civilizationBonusQuery.data;
            break;
        case 3:
            models = teamBonusesQuery.data;
            break;
        case 4:
            models = trainingBuildings.data;
            break;
        case 5:
            models = uniqueBuildings.data;
            break;
        case 6:
            models = uniqueTechnologies.data;
            break;
        case 7:
            models = unitQuery.data;
            break;
        case 8:
            models = unitTypeQuery.data;
            break;
    }

    return (
        <div className={`flex flex-row w-[100vw] h-[100%]`}>
            <Sidebar
                currentModelType={currentModelType}
                setCurrentModelType={setCurrentModelType}
                models={modelTypes}
                setNewModel={setNewModel}
            />
            <Main
                modelType={modelTypes[currentModelType] ?? ""}
                models={models}
                currentModelId={currentModelId}
                setCurrentModelId={setCurrentModelId}
                newModel={newModel}
                setNewModel={setNewModel}
            />
        </div>
    );
};