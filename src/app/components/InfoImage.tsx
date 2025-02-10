import Image from "next/image";

interface InfoImageProps {
    text: string;
    imagePath: string;
    description: string;
}

export const InfoImage = ({text, imagePath, description}: InfoImageProps) => {

    return (
        <div className="container my-6 flex flex-row">
            <Image
                src="/archer.png"
                alt="Placeholder image"
                width={60}
                height={40}
                className="mx-8"
            />
            <div className="flex items-start">
                <h3 className="mx-2 whitespace-nowrap text-[#fada8b]">
                    {text}
                </h3>
                <p className="max-w-prose text-white">
                    {description}
                </p>
            </div>
        </div>
    )
}