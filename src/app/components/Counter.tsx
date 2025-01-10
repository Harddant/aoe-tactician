
import Image from "next/image";
import { type Civilization} from "@prisma/client";


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
        <div className="flex flex-row items-center justify-center py-4 text-3xl text-[#d1a756]">
          <h1 className=""> {title} </h1>
          <Image
            src={
              selectedItem
                ? getItemImage(selectedItem)
                : (customImage ?? "/select-civ.jpg")
            }
            alt={
              selectedItem ? getItemLabel(selectedItem) : "Default Selector"
            }
            height={40}
            width={40}
            className="mx-4"
          />
        </div>
        <div className="mx-4 grid grid-cols-3 grid-rows-1 gap-x-3.5 text-center text-white">
          <div className="border-2 border-white bg-[#243c43]">
              <Image
                  src="/goodAgainst.svg"
                  alt="Good Against"
                  width={20}
                  height={20}
                  className="mx-4 dark:invert"
              />
            <h2 className="text-lg font-semibold">Good Against</h2>
            {goodAgainst?.length ? (
              goodAgainst.map((item) => (
                <div
                  key={getItemKey(item)}
                  className="cursor-pointer p-2 hover:bg-[#2e4a4f]"
                  onClick={() => onItemSelect(item)}
                >
                  <Image
                    src={getItemImage(item)}
                    alt={getItemLabel(item)}
                    width={50}
                    height={50}
                    className="mx-auto"
                  />
                  <span>{getItemLabel(item)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No data</p>
            )}
          </div>

          <div className="border-2 border-white bg-[#243c43]">
            <h2 className="text-lg font-semibold">Bad Against</h2>
              {badAgainst?.length ? (
                  badAgainst.map((item) => (
                      <div
                        key={getItemKey(item)}
                        className="cursor-pointer p-2 hover:bg-[#2e4a4f]"
                        onClick={() => onItemSelect(item)}
                      >
                          <Image
                          src={getItemImage(item)}
                          alt={getItemLabel(item)}
                          width={50}
                          height={50}
                          className="mx-auto"
                          />
                          <span>{getItemLabel(item)}</span>
                      </div>
                  ))
              ) : (
                  <p className="text-sm text-gray-400">No data</p>
              )}
          </div>

          <div className="border-2 border-white bg-[#243c43]">
            <h2 className="text-lg font-semibold">Synergies</h2>
              {synergies?.length ? (
                  synergies.map((item) => (
                      <div
                          key={getItemKey(item)}
                          className="cursor-pointer p-2 hover:bg-[#2e4a4f]"
                          onClick={() => onItemSelect(item)}
                      >
                          <Image
                              src={getItemImage(item)}
                              alt={getItemLabel(item)}
                              width={50}
                              height={50}
                              className="mx-auto"
                          />
                          <span>{getItemLabel(item)}</span>
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