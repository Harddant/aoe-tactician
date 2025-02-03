import Image from "next/image";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@/server/api/root";

interface GuideProps<T> {
    civDetails?: () => inferProcedureOutput<AppRouter["civilization"]["getCivilizationDetails"]>;
    unitDetails?: () => inferProcedureOutput<AppRouter["unit"]["getUnitDetails"]>;

}

export const Guide = <T,>({
    civDetails,
    unitDetails,
}: GuideProps<T>) => {
    const civ = civDetails ? civDetails() : null;
    const unit = unitDetails ? unitDetails() : null;

    return (
        <>
            {civ && (
                <>
                    <h1 className="flex justify-center py-4 text-4xl text-[#d1a756]">
                        Guide
                    </h1>

                    {civ.unique_units.length > 0 && (
                        <>
                            <h2 className="mx-8 my-4 text-2xl font-bold text-[#ffffff]">
                                Unique Unit(s)
                            </h2>
                            {civ.unique_units.map((unit, index) => (
                                <div key={index} className="container my-6 flex flex-row">
                                    <Image
                                        src="/archer.png"
                                        alt="Placeholder image"
                                        width={60}
                                        height={40}
                                        className="mx-8"
                                    />
                                    <div className="flex items-start">
                                        <h3 className="mx-2 whitespace-nowrap text-[#fada8b]">
                                            Unique Unit:
                                        </h3>
                                        <p className="max-w-prose text-[#ffffff]">
                                            Lorem ipsum dolor sit amet. Aut veritatis impedit et porro
                                            minima qui illo sint. Est consectetur dolorem in itaque
                                            voluptate quo doloremque harum. Et ratione atque ea quidem
                                            illo et officiis consequatur. Non earum reiciendis ut sint
                                            Quis aut voluptas laborum.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {civ.unique_buildings.length > 0 && (
                        <>
                            <h2 className="mx-8 my-4 text-2xl font-bold text-[#ffffff]">
                                Unique Building(s)
                            </h2>
                            {civ.unique_buildings.map((building, index) => (
                                <div key={index} className="container flex flex-row">
                                    <Image
                                        src="/archer.png"
                                        alt="Placeholder image"
                                        width={60}
                                        height={40}
                                        className="mx-8"
                                    />
                                    <div className="flex items-start">
                                        <h3 className="mx-2 whitespace-nowrap text-[#fada8b]">
                                            Unique Building:
                                        </h3>
                                        <p className="max-w-prose text-[#ffffff]">
                                            Lorem ipsum dolor sit amet. Aut veritatis impedit et porro
                                            minima qui illo sint. Est consectetur dolorem in itaque
                                            voluptate quo doloremque harum. Et ratione atque ea quidem
                                            illo et officiis consequatur. Non earum reiciendis ut sint
                                            Quis aut voluptas laborum.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {civ.unique_technologies.length > 0 && (
                        <>
                            <h2 className="mx-8 my-4 text-2xl font-bold text-[#ffffff]">
                                Unique Technologies
                            </h2>
                            {civ.unique_technologies.map((technology, index) => (
                                <div key={index} className="container flex flex-row">
                                    <Image
                                        src="/archer.png"
                                        alt="Placeholder image"
                                        width={60}
                                        height={40}
                                        className="mx-8"
                                    />
                                    <div className="flex items-start">
                                        <h3 className="mx-2 whitespace-nowrap text-[#fada8b]">
                                            Unique Technologies:
                                        </h3>
                                        <p className="max-w-prose text-[#ffffff]">
                                            Lorem ipsum dolor sit amet. Aut veritatis impedit et porro
                                            minima qui illo sint. Est consectetur dolorem in itaque
                                            voluptate quo doloremque harum. Et ratione atque ea quidem
                                            illo et officiis consequatur. Non earum reiciendis ut sint
                                            Quis aut voluptas laborum.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    <h2 className="mx-8 my-4 text-2xl font-bold text-[#ffffff]">
                        Civilization Bonuses
                    </h2>
                    <div className="container flex flex-row mx-8">
                        <ul className="list-none space-y-2 text-[#ffffff]">
                            <li className="flex">
                                <span className="mr-2 text-[#d1a756]">•</span>
                                <span>Start with +100 stone.</span>
                            </li>
                        </ul>
                    </div>
                </>
            )}
            <h2 className="mx-8 my-4 text-2xl font-bold text-[#ffffff]">
                Team Bonuses
            </h2>
            <div className="container flex flex-row mx-8">
                <ul className="list-none space-y-2 text-[#ffffff]">
                    <li className="flex">
                        <span className="mr-2 text-[#d1a756]">•</span>
                        <span>Transport Ships have +5 Line of Sight and cost -50%.</span>
                    </li>
                </ul>
            </div>

            <h2 className="mx-8 my-4 text-2xl font-bold text-[#ffffff]">
                End-Game Composition
            </h2>
            {unitDetails && <div></div>}
        </>
    );
}