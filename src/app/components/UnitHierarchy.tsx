import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import {Unit} from "@prisma/client";
import {Hierarchy} from "@/app/components/Hierarchy";

interface UnitHierarchyProps {
    unitId: number;
}

export const UnitHierarchy = ({ unitId }: UnitHierarchyProps) => {
    const [hierarchy, setHierarchy] = useState<Array<{ model: Unit; isCurrent: boolean }>>([]);
    const hierarchyQuery = api.unit.getHierarchy.useQuery({ unitId });

    useEffect(() => {
        if (hierarchyQuery.data) {
            setHierarchy(hierarchyQuery.data);
        }
    }, [hierarchyQuery.data]);

    if (hierarchyQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (hierarchyQuery.isError) {
        return <div>Error: {hierarchyQuery.error.message}</div>;
    }

    return (
        <Hierarchy hierarchy={hierarchy} />
    );
};