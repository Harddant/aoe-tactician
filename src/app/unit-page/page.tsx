import { HydrateClient } from "@/trpc/server";
import { UnitSection } from "@/app/components/UnitSection"
import { Navbar } from "@/app/components/Navbar";

export default async function UnitCounters() {
    return (
        <HydrateClient>
            <div>
                <Navbar />
                <UnitSection />
            </div>
        </HydrateClient>
    );
}