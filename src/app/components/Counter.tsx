
import Image from "next/image";



interface CounterProps<T> {
    title: string;
    getItemKey: (item: T) => string | number;
    getItemLabel: (item: T) => string;
    getItemImage: (item: T) => string;
    onItemSelect: (item: T) => void;
    selectedItem: T | null;
    goodAgainst: T[] | undefined;
    badAgainst: T[] | undefined;
    synergies: T[] | undefined;
    customImage?: string;
}

export const Counter = <T,>({
    title,
    getItemKey,
    getItemLabel,
    getItemImage,
    onItemSelect,
    selectedItem,
    goodAgainst,
    badAgainst,
    synergies,
    customImage,
}: CounterProps<T>) => {
    return (
      <>
        <div className="flex flex-row items-center justify-center py-4 text-4xl text-[#d1a756]">
          <h1 className=""> {title} </h1>
          <Image
            src={
              selectedItem
                ? getItemImage(selectedItem)
                : (customImage ?? "/select-civ.jpg")
            }
            alt={selectedItem ? getItemLabel(selectedItem) : "Default Selector"}
            height={40}
            width={40}
            className="mx-4"
          />
        </div>
        <div className="mx-4 grid grid-cols-3 grid-rows-1 gap-x-3.5 text-center text-white">
          <div className="border-2 border-white bg-[#243c43]">
            <div className="flex items-center justify-center gap-4 py-2">
              <Image
                src="/goodAgainst.svg"
                alt="checkmark"
                width={20}
                height={20}
                className="invert"
              />
              <h2 className="mx-8 text-3xl font-semibold">Good Against</h2>
              <Image
                src="/orange-line.jpg"
                alt="orange line"
                width={1}
                height={2}
                className="mt-6"
              />
            </div>
            {goodAgainst?.length ? (
              goodAgainst.map((item) => (
                <div
                  key={getItemKey(item)}
                  className="cursor-pointer p-2 hover:bg-[#2e4a4f] flex flex-row items-center justify-center"
                  onClick={() => onItemSelect(item)}
                >
                  <Image
                      src={selectedItem
                          ? getItemImage(selectedItem)
                          : customImage ?? "/Chinese_AoE2.png"
                      }
                    alt={getItemLabel(item)}
                    width={30}
                    height={30}
                    className="mx-4"
                  />
                  <span className="text-[#936A05]">{getItemLabel(item)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No data</p>
            )}
          </div>

          <div className="border-2 border-white bg-[#243c43]">
            <div className="flex items-center justify-center gap-4 py-2">
              <Image
                src="/badAgainst.svg"
                alt="Swords"
                width={20}
                height={20}
                className=""
              />
              <h2 className="mx-8 text-3xl font-semibold">Bad Against</h2>
              <Image
                src="/orange-line.jpg"
                alt="orange line"
                width={1}
                height={2}
                className="mt-6"
              />
            </div>
            {badAgainst?.length ? (
              badAgainst.map((item) => (
                <div
                  key={getItemKey(item)}
                  className="cursor-pointer p-2 hover:bg-[#2e4a4f] flex flex-row items-center justify-center"
                  onClick={() => onItemSelect(item)}
                >
                  <Image
                      src={selectedItem
                          ? getItemImage(selectedItem)
                          : customImage ?? "/Chinese_AoE2.png"
                      }
                    alt={getItemLabel(item)}
                    width={30}
                    height={30}
                    className="mx-4"
                  />
                  <span className="text-[#936A05]">{getItemLabel(item)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No data</p>
            )}
          </div>

            <div className="border-2 border-white bg-[#243c43]">
                <div className="flex items-center justify-center gap-4 py-2 ">
                    <Image
                        src="/Synergies.svg"
                        alt="checkmark"
                        width={20}
                        height={20}
                        className=""
                    />
                    <h2 className="text-3xl font-semibold mx-8">Synergies</h2>
                    <Image
                        src="/orange-line.jpg"
                        alt="orange line"
                        width={1}
                        height={2}
                        className="mt-6"
                    />
                </div>
                {synergies?.length ? (
                    synergies.map((item) => (
                        <div
                            key={getItemKey(item)}
                            className="cursor-pointer p-2 hover:bg-[#2e4a4f] flex flex-row items-center justify-center"
                            onClick={() => onItemSelect(item)}
                        >
                            <Image
                                src={selectedItem
                                    ? getItemImage(selectedItem)
                                    : customImage ?? "/Chinese_AoE2.png"
                                }
                                alt={getItemLabel(item)}
                                width={30}
                                height={30}
                                className="mx-4"
                            />
                            <span className="text-[#936A05]">{getItemLabel(item)}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400">No data</p>
                )}
            </div>
        </div>
      </>
    );
}