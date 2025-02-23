import React from "react";
import Image from "next/image";

type ModelTableProps = {
    models: any[];
    setCurrentModelId: (newModel: number|null) => void;
}

export const ModelTable = ({ models, setCurrentModelId }: ModelTableProps) => {

    return (
        <table className={`w-[80%] text-center text-[28px] text-[#3B82F6] rounded-xl bg-[#1D417B]`}>
            <thead>
                <tr className={`border-[#F6AF3B] border-b-2`}>
                    <th className={`p-[16px]`}>ID</th>
                    <th className={`p-[16px]`}>Name</th>
                    <th className={`p-[16px]`}>Logo</th>
                </tr>
            </thead>
            <tbody>
                {models.map((model, index) => (
                    <tr
                        className={`hover:cursor-pointer ${(index % 2) == 1 ? 'bg-[#345488]' : 'bg-[#1D417B]'}`}
                        onClick={() => setCurrentModelId(model.id)} key={index}
                    >
                        <td className={`p-[16px]`}>{model.id}</td>
                        <td className={`p-[16px]`}>{model.name}</td>
                        <td className={`p-[16px] flex flex-row justify-center`}>
                            {(model.logo || model.icon) && (
                                <div className={`h-[100px] w-[100px] flex flex-row justify-center`}>
                                    <Image
                                        src={model.logo || model.icon}
                                        alt={model.name}
                                        width={100}
                                        height={100}
                                        className="object-contain h-[100px] w-[100px] inset-[0%]"
                                    />
                                </div>
                            )}

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};