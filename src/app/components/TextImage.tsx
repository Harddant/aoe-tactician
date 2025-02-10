import Image from "next/image";

interface TextImageProps {
    text: string;
    imagePath: string;
}

export const TextImage = ({text, imagePath}: TextImageProps) => {

    return (
        <div className="flex flex-wrap justify-center text-center items-center w-20 flex-col gap-2 border-2 border-white">
            <div>
                <Image
                    src="/archer.png"
                    width={40}
                    height={40}
                    alt={text}
                />
            </div>
            <p className="text-white text-sm first-letter:uppercase max-w-16">
                {text}
            </p>
        </div>
    )
}