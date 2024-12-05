import { HydrateClient } from "@/trpc/server";
import { Navbar } from "./components/Navbar"


export default async function Home() {
  return (
    <HydrateClient>
      <div>
        <Navbar />
      </div>
    </HydrateClient>
  );
}
