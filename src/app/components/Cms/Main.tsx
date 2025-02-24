"use client";

import { useState, useEffect } from 'react';
import { ModelTable } from "@/app/components/Cms/ModelTable";
import { Age, Civilization, Unit } from "@prisma/client";
import { ModelItem } from "@/app/components/Cms/ModelItem";

type MainProps = {
    modelType: string;
    models: Civilization[] | Unit[] | Age[] | any[] | undefined;
    setCurrentModelId: (newModel: number|null) => void;
    currentModelId: number|null;
    newModel: boolean;
    setNewModel: (newModel: boolean) => void;
}

export const Main = ({ modelType, models, currentModelId, setCurrentModelId, newModel, setNewModel }: MainProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="flex flex-col w-[80vw]">
                <div className="flex flex-col items-center justify-center w-[100%] py-[32px] space-y-[32px]">
                    <div className="w-[100%] flex flex-col items-center justify-center">
                        <div className="w-[80%] flex justify-between items-center">
                            <div className="flex-1"></div>
                            <p className="w-[300px] text-center text-[28px] text-[#3B82F6] rounded-xl bg-[#1D417B] p-4 mb-[64px]">
                                All {modelType}
                            </p>
                            <div className="w-[300px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-[80vw]">
            <div className="flex flex-col items-center justify-center w-[100%] py-[32px] space-y-[32px]">
                {currentModelId ? (
                    <ModelItem
                        modelType={modelType}
                        currentModelId={currentModelId}
                        setCurrentModelId={setCurrentModelId}
                        setNewModel={setNewModel}
                    />
                ) : (
                    <>
                        {newModel ? (
                            <ModelItem
                                modelType={modelType}
                                currentModelId={null}
                                setCurrentModelId={setCurrentModelId}
                                setNewModel={setNewModel}
                            />
                        ) : (
                            <div className="w-[100%] flex flex-col items-center justify-center">
                                <div className="w-[80%] flex justify-between items-center">
                                    <div className="flex-1 w-[300px]"></div>
                                    <p className="w-[300px] text-center text-[28px] text-[#3B82F6] rounded-xl bg-[#1D417B] p-4 mb-[64px]">
                                        All {modelType}
                                    </p>
                                    <button
                                        onClick={() => setNewModel(true)}
                                        className="w-[300px] text-center text-[28px] text-[#3B82F6] rounded-xl bg-[#1D417B] p-4 mb-[64px]"
                                    >
                                        New
                                    </button>
                                </div>

                                {models && (
                                    <ModelTable
                                        setCurrentModelId={setCurrentModelId}
                                        models={models}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};