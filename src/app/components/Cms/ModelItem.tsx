"use client";

import React from "react";
import { api } from "@/trpc/react";

type ModelTableProps = {
    modelType: string;
    currentModelId: number;
};

export const ModelItem = ({ modelType, currentModelId }: ModelTableProps) => {
    const queryResult = (() => {
        switch (modelType.toLowerCase()) {
            case "civilizations":
                return api.civilization.getById.useQuery({ id: currentModelId });
            case "units":
                return api.unit.getById.useQuery({ id: currentModelId });
            case "ages":
                return api.age.getById.useQuery({ id: currentModelId });
            default:
                return null;
        }
    })();

    const currentModel = queryResult?.data;

    return (
        <>
            <p>Model Type: {modelType}</p>
            <p>Model ID: {currentModelId}</p>
            {currentModel && <p>Model Name: {currentModel.name}</p>}
        </>
    );
};