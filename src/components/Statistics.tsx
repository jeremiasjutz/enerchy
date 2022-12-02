import { useStore } from "../store";
import totalCapacity from "../assets/totalCapacity.json";
import { numberFormatter } from "../utils";

export default function Statistics() {
  const categories = useStore((state) => state.categories);
  const totalCapacityOfAllCategories = totalCapacity;

  return (
    <div className="absolute top-0 left-[24rem] z-10 w-[calc(100%-24rem)] p-4 text-white">
      <div className="mb-2 text-sm">
        Leistung aller Kraftwerke:{" "}
        {numberFormatter.format(totalCapacityOfAllCategories)}
      </div>
      <div className="grid grid-cols-8 gap-4">
        {categories.map((category) => {
          return (
            <div className="inline-block w-[100%]">
              <div className="text-xs">{category.label}</div>
              <div className="h-4 rounded-md border">
                <div
                  style={{
                    width:
                      (category.totalCapacity / totalCapacityOfAllCategories) *
                        100 +
                      "%",
                  }}
                  className="
                    relative top-[-4px] inline-block h-[100%]  rounded-l-md border-r"
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="h-4 w-[calc(100%)] rounded-md border border-accent">
        <div className="relative top-[-4px] inline-block h-[100%] w-[50%] rounded-l-md border-r border-accent"></div>
        <div className="relative top-[-4px] inline-block h-[100%] w-[20%] border-r border-accent"></div>
        <div className="relative top-[-4px] inline-block h-[100%] w-[15%] border-r border-accent"></div>
        <div className="relative top-[-4px] inline-block h-[100%] w-[15%] rounded-r-md"></div>
      </div>

      <div className="grid grid-cols-8">
        <div className="inline-block text-xs">
          <div className=" mr-1 inline-block h-2 w-2 rounded-full bg-red-500" />
          Wasserkraft
        </div>

        <div className="inline-block text-xs">
          <div className=" mr-1 inline-block h-2 w-2 rounded-full bg-yellow-500" />
          Solarenergie
        </div>
      </div> */}
    </div>
  );
}
