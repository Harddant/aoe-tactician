import Image from "next/image";
import { Civilization, Unit } from "@prisma/client";

interface HierarchyProps {
    hierarchy: Array<{ model: Unit|Civilization; isCurrent: boolean }>;
    type: string;
}

export const Hierarchy = ({ hierarchy, type }: HierarchyProps) => {
    console.log(hierarchy);
    return (
        <div className="my-6 flex flex-row items-center justify-center text-center">
            {hierarchy.map(({ model, isCurrent }, index) => (
                <div key={model.id} className="flex items-center justify-center mx-4">
                    <div className={`flex flex-col items-center justify-center text-center ${type === "civ" ? "mx-12" : "mx-0"}`}>
                        <div className={`rounded-full p-5 w-full flex flex-col justify-center items-center  ${isCurrent && "border-[#d1a756] border-2"}`}>
                            <Image src="/archer.png" alt="Unit" width={60} height={60}/>
                        </div>
                        <span className={`${isCurrent ? "text-[#d1a756]" : "text-white"}`}>{model.name}</span>
                    </div>

                    {index < hierarchy.length - 1 && type === "unit" && (
                        <Image src="/right-arrow.svg" alt="arrow" width={20} height={20} className="invert mx-8 my-4" />
                    )}
                </div>
            ))}
        </div>
    );
};