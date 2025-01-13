import { PokemonStatsList } from "@/interfaces/pokemon";
import React from "react";
import ProgressBarComponent from "./progress-bar";

interface TablePokeomonStatProps {
  stats?: Array<PokemonStatsList>;
}

export default function TablePokemonStats(props: TablePokeomonStatProps) {
  const total = props?.stats?.reduce((pre, cur) => pre + cur.base_stat, 0);

  return (
    <div className="w-full md:flex items-start md:flex-row  basis-1/2 justify-center">
      <div className="w-full lg:px-10">
        <h1 className="font-bold text-3xl pt-7">Base stats</h1>
        <div className="mt-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className=" text-lg">
                <tr className="h-24">
                  <th className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                    Stats
                  </th>
                  <th className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"></th>
                  <th className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {props?.stats?.map((item) => {
                  return (
                    <tr
                      key={item.stat.name}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">
                        <h1 className="text-center font-bold w-32  text-sm">
                          {item.stat.name}
                        </h1>
                      </td>
                      <td className="px-6 py-4 w-full">
                        <ProgressBarComponent value={item.base_stat} />
                      </td>
                      <td className="px-6 py-4">
                        <h1 className="text-center font-bold w-24  text-sm">
                          {item.base_stat}
                        </h1>
                      </td>
                    </tr>
                  );
                }) ?? []}

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <h1 className="text-center font-bold w-32">Total</h1>
                  </td>
                  <td className="px-6 py-4 w-full"></td>
                  <td className="px-6 py-4">
                    <h1 className="text-center font-bold w-24">{total}</h1>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
