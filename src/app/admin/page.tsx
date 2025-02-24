import { HydrateClient } from "@/trpc/server";
import { Layout } from "@/app/components/Cms/Layout";

export default async function Page() {

    return (
        <HydrateClient>
            <Layout />
        </HydrateClient>
    );
}
