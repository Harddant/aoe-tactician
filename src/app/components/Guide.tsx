import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { TextImage } from "@/app/components/TextImage";
import { InfoImage } from "@/app/components/InfoImage";
import { ListItem } from "@/app/components/ListItem";
import { UnitHierarchy } from "@/app/components/UnitHierarchy";
import {CivCompHierarchy} from "@/app/components/CivHierarchy";

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
    console.log("Civ: ", civ);
    console.log("Unit: ", unit);
    return (
        <>
            {civ && (
                <>
                    <h1 className="flex justify-center py-4 text-4xl text-[#d1a756]">
                        Guide
                    </h1>

                    {civ.unique_units.length > 0 && (
                        <>
                            <h2 className="mx-8 my-4 text-2xl font-bold text-white">
                                Unique Unit(s)
                            </h2>
                            {civ.unique_units.map((unit, index) => (
                                <InfoImage
                                    key={index}
                                    text={"unique unit" + ":"}
                                    imagePath={""}
                                    description={"Lorem ipsum dolor sit amet. Aut veritatis impedit et porro minima qui" +
                                        " illosint. Estconsectetur dolorem in itaquevoluptate quo doloremque harum. Et" +
                                        " ratione atque eaquidem illo et officiis consequatur. Non earum reiciendis ut" +
                                        " sint Quis aut voluptas laborum."}
                                />
                            ))}
                        </>
                    )}

                    {civ.unique_buildings.length > 0 && (
                        <>
                            <h2 className="mx-8 my-4 text-2xl font-bold text-white">
                                Unique Building(s)
                            </h2>
                            {civ.unique_buildings.map((building, index) => (
                                <InfoImage
                                    key={index}
                                    text={"unique Buildings" + ":"}
                                    imagePath={""}
                                    description={"Lorem ipsum dolor sit amet. Aut veritatis impedit et porro minima qui" +
                                        " illosint. Estconsectetur dolorem in itaquevoluptate quo doloremque harum. Et" +
                                        " ratione atque eaquidem illo et officiis consequatur. Non earum reiciendis ut" +
                                        " sint Quis aut voluptas laborum."}
                                />
                            ))}
                        </>
                    )}

                    {civ.unique_technologies.length > 0 && (
                        <>
                            <h2 className="mx-8 my-4 text-2xl font-bold text-white">
                                Unique Technologies
                            </h2>
                            {civ.unique_technologies.map((technology, index) => (
                                <InfoImage
                                    key={index}
                                    text={"unique technologies" + ":"}
                                    imagePath={""}
                                    description={"Lorem ipsum dolor sit amet. Aut veritatis impedit et porro minima qui" +
                                        " illosint. Estconsectetur dolorem in itaquevoluptate quo doloremque harum. Et" +
                                        " ratione atque eaquidem illo et officiis consequatur. Non earum reiciendis ut" +
                                        " sint Quis aut voluptas laborum."}
                                />
                            ))}
                        </>
                    )}

                    {civ.civilization_bonuses.length > 0 && (
                        <>
                            <h2 className="mx-8 my-4 text-2xl font-bold text-white">
                                Civilization Bonuses
                            </h2>
                                <div className="container flex flex-row mx-8">
                                    <ul className="list-none space-y-2 text-white">
                                        {civ.civilization_bonuses.map((bonus, index) => (
                                            <ListItem text={bonus.name} key={index} />
                                        ))}
                                    </ul>
                                </div>
                        </>
                    )}

                    {civ.team_bonuses.length > 0 && (
                        <>
                            <h2 className="mx-8 my-4 text-2xl font-bold text-white">
                                Team Bonuses
                            </h2>

                                <div className="container flex flex-row mx-8">
                                    <ul className="list-none space-y-2 text-white">
                                        {civ.team_bonuses.map((teamBonus, index) => (
                                            <ListItem text={teamBonus.name} key={index} />
                                        ))}
                                    </ul>
                                </div>

                        </>
                    )}
                    <div className="mx-8 my-4">
                        <h1 className="font-bold text-2xl text-white">Final Composition</h1>
                        <CivCompHierarchy civId={civ.id}/>
                    </div>

                </>
            )}

            {unit && (
                <>
                    <h1 className="flex justify-center py-4 text-4xl text-[#d1a756]">
                        Guide
                    </h1>
                    <>
                        <h2 className="mx-8 my-4 text-2xl font-bold text-white">
                            Unit Information
                        </h2>
                        <div className="flex flex-row space-x-6 mx-8">
                            <TextImage text={unit.unit_type.type} imagePath={unit.unit_type.type}/>
                            <TextImage text={"all civs"} imagePath={unit.unit_type.type}/>
                            <TextImage text={unit.age.name} imagePath={unit.age.icon}/>
                        </div>
                        <h2 className="mx-8 my-4 text-2xl font-bold text-white">
                            Training
                        </h2>
                        <div className="flex flex-row space-x-6 mx-8">
                            <TextImage text={unit.train_food.toString()} imagePath={unit.unit_type.type}/>
                            <TextImage text={unit.train_wood.toString()} imagePath={unit.unit_type.type}/>
                            <TextImage text={unit.train_gold.toString()} imagePath={unit.age.icon}/>
                            <TextImage text={unit.train_time.toString() + "s"} imagePath={unit.unit_type.type}/>
                            {/*TODO: Karlos fix backend ;)*/}
                        </div>
                        <h2 className="mx-8 my-4 text-2xl font-bold text-white">
                            Statistics
                        </h2>
                        <div className="flex flex-row space-x-6 mx-8">
                            <TextImage text={unit.hp.toString()} imagePath={unit.unit_type.type}/>
                            <TextImage text={unit.attack.toString()} imagePath={unit.unit_type.type}/>
                            <TextImage text={unit.armour.toString()} imagePath={unit.age.icon}/>
                            <TextImage text={unit.pierce.toString()} imagePath={unit.unit_type.type}/>
                            <TextImage text={unit.speed.toString()} imagePath={unit.age.icon}/>
                            <TextImage text={unit.line_of_site.toString()} imagePath={unit.age.icon}/>
                            {/*TODO: Attack type for pierce & melee, change 'site' to 'sight' ;)*/}
                        </div>
                        <UnitHierarchy unitId={unit.id} />
                    </>
                </>
            )}
        </>
    );
}