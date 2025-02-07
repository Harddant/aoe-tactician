import Image from "next/image";
import { type Unit} from "@prisma/client";


interface HierarchyProps {
    unit: Unit;
}

export const Hierarchy = ({ unit }: HierarchyProps) => {

    return (
        <div className="container my-6 flex flex-row">
            <Image
                src="/archer.png"
                alt="Placeholder image"
                width={60}
                height={40}
                className="mx-8"
            />
        </div>
    )
}