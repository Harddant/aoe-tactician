import Image from 'next/image';
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="border-b-[1px] border-t-[1px] border-white text-white ">
            <div className="flex items-center justify-between container mx-auto py-2">
                <div className="flex items-center px-20 mt-2">
                    <Image
                        src="/tactician-logo.png"
                        width={50}
                        height={30}
                        alt="logo"
                    />
                </div>

                <div className="flex items-center justify-between flex-grow">
                    <Link href="/" className="px-4 hover:text-[#d1a756]"> Civilization Counter </Link>


                    <h1 className="text-center font-bold flex-grow text-xl mx-6 text-[#fada8b]">
                        AoE Tactician
                    </h1>

                    <div className="flex items-center space-x-6">
                        <Link href="/" className="px-6 hover:text-[#d1a756]"> Unit Counter </Link>
                        <div className="flex flex-wrap">
                            <Link
                                href="https://www.ageofempires.com/news/age-of-empires-iv-patch-12-1-2454/"
                                target="_blank"
                                className="pr-2 pl-16 hover:text-[#d1a756]">
                                Patch Notes
                            </Link>
                            <Image className="dark:invert -rotate-[32deg] mr-16"
                                   src="/right-arrow.svg"
                                   width={10}
                                   height={20}
                                   alt="Arrow image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};