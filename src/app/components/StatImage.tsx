import Image from "next/image";

interface StatImageProps {
    text: string;
    imagePath: string;
    description: string;
}

export const StatImage = ({text, imagePath, description}: StatImageProps) => {
    const descList = description.split(",");
    const validImagePath = imagePath.startsWith("/") ? imagePath : `/archer.png`;
    return (
        <div className="my-6 flex flex-row text-white">
            <Image
                src={validImagePath}
                alt="Placeholder image"
                width={60}
                height={40}
                className="mx-8 h-10"
            />
            <div className="flex">
                <h3 className="mx-2 whitespace-nowrap text-[#fada8b]">
                    {text}
                </h3>
                <div className={"flex flex-col"}>
                    {descList.map((desc, index) => (
                    <p key={index}>
                        {desc}
                    </p>
                    ))}
                </div>
            </div>
        </div>
    )
}