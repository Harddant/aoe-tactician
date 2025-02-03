"use client";

import React, {useState} from "react";
import { api } from "@/trpc/react";

type ModelTableProps = {
    modelType: string;
    currentModelId: number;
};

type ModelSchema = {
    Field: string;
    Type: string;
    Null: string;
};

export const ModelItem = ({ modelType, currentModelId }: ModelTableProps) => {
    const modelSchema = api.schema.getModelSchema.useQuery({ modelType: modelType });
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
    const [formValues, setFormValues] = useState({});
    const fieldTypes: [string, string][] = [
        ["varchar", "text"],
        ["int", "number"],
        ["datetime", "date"],
    ];

    const overrideTypes: [string, string][] = [
        ["id", "null"],
        ["icon", "image"],
    ];



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };



    // Helper function to determine input type
    const getInputType = (field: string, dbType: string): string => {
        // Check overrideTypes first
        for (const [fieldName, inputType] of overrideTypes) {
            if (field.toLowerCase() === fieldName.toLowerCase()) {
                return inputType;
            }
        }

        // Fallback to fieldTypes matching the database type
        for (const [dbMatch, inputType] of fieldTypes) {
            if (dbType.toLowerCase().includes(dbMatch)) {
                return inputType;
            }
        }

        // Default input type
        return "text";
    };

    return (
        <>
            {currentModel && modelSchema?.data && (
                <div className={`flex flex-col space-y-[64px]`}>
                    {modelSchema.data.map((item: ModelSchema, index: number) => {
                        const type = getInputType(item.Field, item.Type);

                        return (
                            <div key={index} className={"flex flex-row space-x-10 text-white text-[36px]"}>
                                <p>{item.Field.charAt(0).toUpperCase() + item.Field.slice(1)}:</p>
                                {type !== "null" ? (
                                    //@ts-ignore
                                    <input
                                        className={'text-black'}
                                        type={type}
                                        name={item.Field}
                                        defaultValue={currentModel[item.Field] || 'Not sure yet'}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    //@ts-ignore
                                    <p>{currentModel[item.Field]}</p>
                                )}
                            </div>
                        );
                    })}
                    <button className={`text-white text-[36px] border-[2px] border-white py-2 px-12 rounded-md`}>Save</button>
                </div>
            )}
        </>
    );
};