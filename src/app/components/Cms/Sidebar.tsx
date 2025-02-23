import React from "react";

type CmsSidebarProps = {
    currentModelType: number;
    setCurrentModelType: (newModel: number) => void;
    models: string[];
    setNewModel: (newModel: boolean) => void;
}

export const Sidebar = ({currentModelType, setCurrentModelType, models, setNewModel}: CmsSidebarProps) => {
    return (
        <nav className={`flex flex-col w-[20vw] p-[16px] text-left items-start bg-[#173462] h-[100vh] sticky top-0 z-50`}>
            <p className={`text-[28px] self-center text-[#3B82F6] rounded-xl bg-[#1D417B] p-[16px] mb-[64px]`}>AOE Tactician - Admin</p>
            {models.map((model: string, index: number) => (
                <button
                    className={`${index === 0 ? 'border-t-2' : ''} w-[100%] border-b-2 border-[#F6AF3B] text-[28px]
                        duration-[500] hover:text-[#F6AF3B] p-[16px]
                        ${currentModelType === index ? 'text-[#F6AF3B]' : 'text-[#3B82F6]'}`}
                    key={index}
                    onClick={() => {
                        setNewModel(false);
                        setCurrentModelType(index);
                    }}
                >
                    {model}
                </button>
            ))}
        </nav>
    );
};