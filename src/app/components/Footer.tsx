"use client";

import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="w-full bg-[#d9d9d9]">
            <div className="container flex flex-row items-center justify-between py-2 ">

                <div className="ml-4">
                    <h1>Privacy Policy</h1>
                </div>

                <div
                    className="flex flex-row gap-4 mx-2 cursor-pointer text-[#936a05]"
                    onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                >
                    <h1>Scroll Back To Top</h1>
                    <Image src="/arrow_up.png" alt="arrow up" height={20} width={20}/>
                </div>

                <div className="flex flex-row items-center gap-4 mr-4">
                    <h1>Discord</h1>
                    <Image src="/tactician-logo.png" alt="Logo" width={60} height={60}/>
                </div>

            </div>
        </footer>
    );
};