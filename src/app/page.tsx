import { HydrateClient } from "@/trpc/server";
import { Navbar } from "./components/Navbar"
import { CivilizationSection } from "./components/CivilizationSection";


export default async function Home() {
  return (
    <HydrateClient>
    <div>
        <Navbar />
        <CivilizationSection />
      </div>
    </HydrateClient>
  );
}
