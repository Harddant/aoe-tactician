import { HydrateClient } from "@/trpc/server";
import { Navbar } from "./components/Navbar"
import { CivPicker } from "@/app/components/CivPicker";

export default async function Home() {
  return (
    <HydrateClient>
      <div>
        <Navbar />
        <CivPicker />
      </div>
    </HydrateClient>
  );
}
