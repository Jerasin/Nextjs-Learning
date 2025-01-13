"use client";
import { PokemonTypeDetail } from "@/interfaces/pokemon";
import React, { useEffect, useState } from "react";
import LoadingPage from "./loading-page";

interface PokemonTypeTableProps {
  allTypes: Array<{ name: string }>;
  relationType?: PokemonTypeDetail | null;
}

export default function PokemonTypeTable(props: PokemonTypeTableProps) {
  const { allTypes, relationType } = props;
  const [newAllTypes, setNewAlltypes] = useState<{ name: string }[]>();

  useEffect(() => {
    if (relationType != null && allTypes != null) {
      console.log("relationType", relationType);
      const damageRelationKeys = Object.keys(relationType.damage_relations);

      const primaryTypes = new Set();
      damageRelationKeys.forEach((relation: any) => {
        const relationTypes = relationType.damage_relations as any;
        relationTypes[relation].forEach((i: any) => {
          primaryTypes.add(i.name);
        });
      });

      console.log("primaryTypes", primaryTypes);
      const filterTypes = allTypes.filter((item) =>
        primaryTypes.has(item.name)
      );
      console.log("filterTypes", filterTypes);
      setNewAlltypes(filterTypes);
    }
  }, [allTypes, relationType]);

  if (relationType == null || allTypes == null) {
    return LoadingPage();
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="border border-b w-auto p-8"></th>

            {newAllTypes?.map((type, index) => {
              return (
                <th key={index} className="px-6 py-4 border border-b">
                  <h1 className="text-center  font-bold w-auto">{type.name}</h1>
                </th>
              );
            }) ?? []}
          </tr>
        </thead>
        <tbody>
          {newAllTypes?.map((rowType, roleIndex) => {
            return (
              <tr
                key={roleIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <h1 className="text-center font-bold w-auto">
                    {rowType.name}
                  </h1>
                </td>

                {newAllTypes.map((colType, colIndex) => {
                  console.log("rowType", rowType);
                  console.log("colType", colType);
                  let multiplier = 0.5;
                  let bgColor = "bg-white";

                  if (
                    relationType.damage_relations.double_damage_from.some(
                      (i) => i.name == colType.name
                    )
                  ) {
                    multiplier = 2;
                    bgColor = "bg-green-500";
                  } else if (
                    relationType.damage_relations.half_damage_from.some(
                      (i) => i.name == colType.name
                    )
                  ) {
                    multiplier = 0.5;
                    bgColor = "bg-yellow-500";
                  } else if (
                    relationType.damage_relations.no_damage_from.some(
                      (i) => i.name == colType.name
                    )
                  ) {
                    multiplier = 0;
                    bgColor = "bg-gray-500";
                  } else {
                    multiplier = 1;
                    bgColor = "bg-pink-500";
                  }

                  return multiplier > 0 ? (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 p-2 ${bgColor} text-center`}
                    >
                      {multiplier === 2
                        ? "2x"
                        : multiplier === 0.5
                        ? "½x"
                        : "1x"}
                    </td>
                  ) : (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 p-2 ${bgColor} text-center`}
                    ></td>
                  );
                })}

                {/* <td className="px-6 py-4 w-full">
                      <ProgressBarComponent value={item.base_stat} />
                    </td>
                    <td className="px-6 py-4">
                      <h1 className="text-center font-bold w-24">
                        {item.base_stat}
                      </h1>
                    </td> */}
              </tr>
            );
          }) ?? []}

          {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">
              <h1 className="text-center font-bold w-32">Total</h1>
            </td>
            <td className="px-6 py-4 w-full"></td>
            <td className="px-6 py-4">
              <h1 className="text-center font-bold w-24">{0}</h1>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
