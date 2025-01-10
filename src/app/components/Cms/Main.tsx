import React, { useState } from "react";
import { ModelTable } from "@/app/components/Cms/ModelTable";
import {Age, Civilization, Unit} from "@prisma/client";
import {api} from "@/trpc/react";
import {ModelItem} from "@/app/components/Cms/ModelItem";

type MainProps = {
    modelType: string;
    models: Civilization[] | Unit[] | Age[] | any[] | undefined;
    setCurrentModelId: (newModel: number) => void;
    currentModelId: number|null;
}

export const Main = ({ modelType, models, currentModelId, setCurrentModelId }: MainProps) => {
    return (
        <div className={`flex flex-col w-[80vw]`}>
            <div className={`flex flex-col items-center justify-center w-[100%] py-[32px] space-y-[32px]`}>
                {currentModelId ? (
                    <ModelItem modelType={modelType} currentModelId={currentModelId} />
                ) : (
                    <>
                        <p className={'w-[300px] text-center text-[28px] self-center text-[#3B82F6] rounded-xl bg-[#1D417B] p-[16px] mb-[64px]'}>All {modelType}</p>
                        {models && (
                            <ModelTable setCurrentModelId={setCurrentModelId} modelType={modelType.slice(0, -1)} models={models} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};