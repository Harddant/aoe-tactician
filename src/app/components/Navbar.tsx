"use client"

import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";


export const Navbar = () => {
    const currentPath = usePathname();

    const getLinkStyle = (path: string) => {
        return currentPath === path ? "#d1a756" : "white";
    };

    return (
        <nav className="border-b-[1px] border-t-[1px] border-white text-white ">
            <div className="flex items-center justify-between mx-auto">
                <div className="flex items-center justify-center pr-24 pl-6 my-2">
                    <Image
                        src="/tactician-logo.png"
                        width={60}
                        height={40}
                        alt="logo"
                    />
                </div>

                <div className="flex items-center justify-between flex-grow">
                    <Link
                        href="/"
                        style={{ color: getLinkStyle("/")}}
                        className="px-4"
                        >
                        Civilization Counters
                    </Link>

                    <h1 className="text-center font-bold flex-grow text-2xl ml-10 text-[#fada8b]">
                        AoE Tactician
                    </h1>

                    <div className="flex items-center space-x-6">
                        <Link
                            href="/unit-page"
                            style={{ color: getLinkStyle("/unit-page")}}
                            className="px-6"
                            >
                            Unit Counters
                         </Link>
                        <div className="flex flex-wrap">
                            <Link
                                href="https://www.ageofempires.com/news/category/releases/"
                                target="_blank"
                                className="pr-2 pl-16 hover:text-[#d1a756]"
                                >
                                Patch Notes
                            </Link>
                            <Image className="invert -rotate-[32deg] mr-16"
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