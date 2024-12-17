import { HydrateClient } from "@/trpc/server";
import { UnitSection } from "src/app/unit-page/UnitSection"
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