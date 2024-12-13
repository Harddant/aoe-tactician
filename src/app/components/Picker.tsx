import { useState } from "react";
import Image from "next/image";


interface PickerProps<T> {
    title: string;
    data: T[];
    getItemKey: (item: T) => string | number;
    getItemLabel: (item: T) => string;
    getItemImage: (item: T) => string;
    onItemSelect: (item: T) => void;
}

export const Picker = <T,>({
       title,
       data,
       getItemKey,
       getItemLabel,
       getItemImage,
       onItemSelect,
   }: PickerProps<T>) => {
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [isGridVisible, setIsGridVisible] = useState(false);

    return (
        <div className="my-8 flex flex-col items-center justify-center text-2xl text-[#d1a756]">
            <h2 className="text-[#fada8b]">
                {selectedItem ? getItemLabel(selectedItem) : title}
            </h2>
            <button onClick={() => setIsGridVisible(!isGridVisible)}>
                <Image
                    src={selectedItem ? getItemImage(selectedItem) : "/select-civ.jpg"}
                    alt={selectedItem ? getItemLabel(selectedItem) : "Default Selector"}
                    width={150}
                    height={219}
                />
            </button>
            {isGridVisible && (
                <div className="absolute top-24 z-20 mt-14 h-full w-full overflow-auto">
                    <div className="grid grid-cols-9 gap-2 border-2 border-white bg-[#243c43] p-28">
                        <button
                            onClick={() => setIsGridVisible(false)}
                            className="absolute right-6 top-6 z-30 flex h-8 w-8 items-center justify-center"
                        >
                            <Image
                                src="/cross.svg"
                                alt="Close the selector"
                                width={20}
                                height={20}
                            />
                        </button>
                        {data.map((item) => (
                            <button
                                className="mx-8 my-2 flex flex-col items-center justify-center"
                                key={getItemKey(item)}
                                onClick={() => {
                                    setSelectedItem(item);
                                    onItemSelect(item);
                                    setIsGridVisible(false);
                                }}
                            >
                                <Image
                                    src={getItemImage(item)}
                                    alt={getItemLabel(item)}
                                    width={54}
                                    height={54}
                                />
                                <span className="text-white">{getItemLabel(item)}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

