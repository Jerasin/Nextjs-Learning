"use client";
import React from "react";

interface PokemonTypeTableProps {
  types: Array<any>;
}

export default function PokemonTypeTable(props: PokemonTypeTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          {/* {props?.stats?.map((item) => {
                return (
                  <tr
                    key={item.stat.name}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      <h1 className="text-center font-bold w-32">
                        {item.stat.name}
                      </h1>
                    </td>
                    <td className="px-6 py-4 w-full">
                      <ProgressBarComponent value={item.base_stat} />
                    </td>
                    <td className="px-6 py-4">
                      <h1 className="text-center font-bold w-24">
                        {item.base_stat}
                      </h1>
                    </td>
                  </tr>
                );
              }) ?? []} */}

          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">
              <h1 className="text-center font-bold w-32">Total</h1>
            </td>
            <td className="px-6 py-4 w-full"></td>
            <td className="px-6 py-4">
              <h1 className="text-center font-bold w-24">{0}</h1>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
