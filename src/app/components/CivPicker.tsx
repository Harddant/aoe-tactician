"use client"


import { api } from "@/trpc/react";
import { type Civilization } from "@prisma/client";




export const CivPicker = () => {
    const civilizationQuery = api.civilization.getAll.useQuery();




    return (
        <div>
            {civilizationQuery.data?.map((civilization: Civilization, index: number) => (
              <p key={index}>{civilization.name}</p>
            ))}
        </div>
    );
};
























// "use client";
// import React, {useEffect, useState} from "react";
//
// export const CivPicker = () => {
//
//     const [name, setName] = useState("Select your Civilization");
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch("");
//                 const data = await response.json();
//                 setName(data.name);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setName("Error fetching name");
//             }
//         }
//         fetchData();
//     }, [setName]);
//
//
//     return (
//         <div className="flex justify-center text-center my-6 text-[#c2ab73]">
//             <h1 className="text-3xl font-bold">
//                 {name}
//             </h1>
//         </div>
//     );
// };
