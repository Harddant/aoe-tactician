import { HydrateClient } from "@/trpc/server";
import { Navbar } from "./components/Navbar"
import { CivilizationSection } from "./components/CivilizationSection";


export default async function Home() {
  return (
    <HydrateClient>
        <Navbar />
        <CivilizationSection />
      </div>
    </HydrateClient>
  );
}
