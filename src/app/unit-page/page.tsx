import { HydrateClient } from "@/trpc/server";
import { UnitWrapper } from "@/app/components/UnitWrapper";

export default async function UnitCounter() {
    return (
        <HydrateClient>
            <UnitWrapper />
        </HydrateClient>
    );
}