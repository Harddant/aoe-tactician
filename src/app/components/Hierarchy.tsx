import Image from "next/image";
import { type Unit } from "@prisma/client";
import { api } from "@/trpc/react";
import type {inferProcedureOutput} from "@trpc/server";
import type {AppRouter} from "@/server/api/root";

interface HierarchyProps {
    unit: Unit;
}

export const Hierarchy = ({ unit }: HierarchyProps) => {
    let currentUnit = unit;
    const childUnitQuery = api.unit.getByParentId.useQuery<inferProcedureOutput<AppRouter["unit"]["getByParentId"]>>({parentId: currentUnit.id});
    console.log(childUnitQuery);
    //while ()
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