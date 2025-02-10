import Image from "next/image";
import {Civilization, Unit} from "@prisma/client";

interface HierarchyProps {
    hierarchy: Array<{ model: Unit|Civilization; isCurrent: boolean }>;
}

export const Hierarchy = ({ hierarchy }: HierarchyProps) => {
    console.log(hierarchy);
    return (
        // TODO: This needs styling, remember we need to take into account
        //  we are displaying both Unit Hierarchy & Civ Final Comp!! :D
        <div className="container my-6 flex flex-row">
            {hierarchy.map(({ model, isCurrent }, index) => (
                <div key={model.id} className="flex items-center">
                    <div className="flex flex-col items-center justify-center">
                        <span>{model.name}</span>
                        {isCurrent && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        )}
                    </div>
                    {index < hierarchy.length - 1 && (
                        <Image src="/right-arrow.svg" alt="arrow" width={20} height={20} />
                    )}
                </div>
            ))}
        </div>
    );
};