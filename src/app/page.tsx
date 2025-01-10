import { HydrateClient } from "@/trpc/server";
import {Wrapper} from "@/app/components/Wrapper";

export default async function Home() {
    return (
        <HydrateClient>
            <Wrapper />
        </HydrateClient>
    );
}