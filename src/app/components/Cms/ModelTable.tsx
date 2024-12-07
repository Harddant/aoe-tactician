import React from "react";

type ModelTableProps = {
    modelType: string;
    models: any[];
    setCurrentModel: (newModel: number) => void;
}

export const ModelTable = ({ modelType, models, setCurrentModel }: ModelTableProps) => {

    return (
        <table className={`w-[80%] text-center text-[28px] text-[#3B82F6] rounded-xl bg-[#1D417B]`}>
            <thead>
                <tr className={`border-[#F6AF3B] border-b-2`}>
                    <th className={`p-[16px]`}>{modelType} ID</th>
                    <th className={`p-[16px]`}>{modelType} Name</th>
                    <th className={`p-[16px]`}>{modelType} Logo</th>
                </tr>
            </thead>
            <tbody>
                {models.map((model, index) => (
                    <tr
                        className={`hover:cursor-pointer ${(index % 2) == 1 ? 'bg-[#345488]' : 'bg-[#1D417B]'}`}
                        onClick={() => setCurrentModel(model.id)} key={index}
                    >
                        <td className={`p-[16px]`}>{model.id}</td>
                        <td className={`p-[16px]`}>{model.name}</td>
                        <td className={`p-[16px]`}>{model.logo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};