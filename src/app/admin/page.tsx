import { HydrateClient } from "@/trpc/server";
import { Main } from "@/app/components/Cms/Main";

export default async function Page() {

    return (
        <HydrateClient>
            <Main />
        </HydrateClient>
    );
}
