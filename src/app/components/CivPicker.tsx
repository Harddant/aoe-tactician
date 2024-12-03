'use client'

import { useRouter } from "next/navigation";
import { api } from "../api/trpc/[trpc]/route";


export const CivPicker = () => {
    const {query} = useRouter();
    const { id } = query;

    const civilizationQuery = api.civilization.getbyId.useQuery(
        { id },
        {
            enabled: !!id,
        }
    );

    if (civilizationQuery.isLoading) return <p>Loading civilization...</p>;
    if (civilizationQuery.isError) return <p>Error loading civilization</p>;


    return (
        <div>
            <h1>{civilizationQuery.data?.name || "Civilization not found"}</h1>
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
