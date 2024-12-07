import React, { useState } from "react";
import { ModelTable } from "@/app/components/Cms/ModelTable";
import {Age, Civilization, Unit} from "@prisma/client";

type MainProps = {
    modelType: string;
    models: Civilization[] | Unit[] | Age[] | any[] | undefined;
    setCurrentModel: (newModel: number) => void;
    currentModel: number|null;
}

export const Main = ({ modelType, models, currentModel, setCurrentModel }: MainProps) => {
    return (
        <div className={`flex flex-col w-[80vw]`}>
            <div className={`flex flex-col items-center justify-center w-[100%] py-[32px] space-y-[32px]`}>
                {currentModel ? (
                    <p>{modelType.slice(0, -1)}: [ModelName]</p>
                ) : (
                    <>
                        <p className={'w-[300px] text-center text-[28px] self-center text-[#3B82F6] rounded-xl bg-[#1D417B] p-[16px] mb-[64px]'}>All {modelType}</p>
                        {models && (
                            <ModelTable setCurrentModel={setCurrentModel} modelType={modelType.slice(0, -1)} models={models} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};