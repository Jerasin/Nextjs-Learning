"use client";
import { PokemonTypeRelation, PokemonTypes } from "@/interfaces/pokemon";
import React, { useEffect, useState } from "react";
import LoadingPage from "./loading-page";
import { useRouter } from "next/router";
import getPathId from "@/utils/useQuery";

interface PokemonTypeTableProps {
  allTypes: PokemonTypes;
  relationType: PokemonTypeRelation[];
}

export default function PokemonTypeTable(props: PokemonTypeTableProps) {
  const { allTypes, relationType } = props;
  const router = useRouter();

  useEffect(() => {}, [allTypes, relationType]);

  const mappingColor: { [key: string]: string } = {
    normal: "p-4 w-32 h-16 rounded-md bg-[#aa9;] cursor-pointer",
    fire: "p-4 w-32 h-16 rounded-md bg-[#f42] cursor-pointer",
    fighting: "p-4 w-32 h-16 rounded-md bg-[#b54] cursor-pointer",
    flying: "p-4 w-32 h-16 rounded-md bg-[#89f] cursor-pointer",
    poison: "p-4 w-32 h-16 rounded-md bg-[#a59] cursor-pointer",
    ground: "p-4 w-32 h-16 rounded-md bg-[#db5] cursor-pointer",
    rock: "p-4 w-32 h-16 rounded-md bg-[#ba6] cursor-pointer",
    bug: "p-4 w-32 h-16 rounded-md bg-[#ab2] cursor-pointer",
    ghost: "p-4 w-32 h-16 rounded-md bg-[#66b] cursor-pointer",
    steel: "p-4 w-32 h-16 rounded-md bg-[#aab] cursor-pointer",
    water: "p-4 w-32 h-16 rounded-md bg-[#39f] cursor-pointer",
    grass: "p-4 w-32 h-16 rounded-md bg-[#7c5] cursor-pointer",
    electric: "p-4 w-32 h-16 rounded-md bg-[#fc3] cursor-pointer",
    psychic: "p-4 w-32 h-16 rounded-md bg-[#f59] cursor-pointer",
    ice: "p-4 w-32 h-16 rounded-md bg-[#6cf] cursor-pointer",
    dragon: "p-4 w-32 h-16 rounded-md bg-[#76e] cursor-pointer",
    dark: "p-4 w-32 h-16 rounded-md bg-[#754] cursor-pointer",
    fairy: "p-4 w-32 h-16 rounded-md bg-[#e9e] cursor-pointer",
    stellar: "p-4 w-32 h-16 rounded-md bg-[#aab] cursor-pointer",
  };

  const mappingValue: { [key: string]: string } = {
    "0": "mt-1 p-4 border-2 rounded-md w-32 h-16 flex items-center justify-center bg-[#2e3436]",
    "½": "mt-1 p-4 border-2 rounded-md w-32 h-16 flex items-center justify-center bg-[#a40000]",
    "2": "mt-1 p-4 border-2 rounded-md w-32 h-16 flex items-center justify-center bg-[#4e9a06]",
    "¼": "mt-1 p-4 border-2 rounded-md w-32 h-16 flex items-center justify-center bg-[#7c0000]",
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="flex flex-row">
        {allTypes?.results
          .filter((i) => i.name != "unknown" && i.name != "stellar")
          ?.map((type, index) => {
            return (
              <div
                key={index}
                className="w-full border-2  border-solid bg-white"
              >
                <div
                  className={`${
                    mappingColor[type.name] ??
                    "p-4 w-32 h-16 rounded-md bg-red-500 cursor-pointer"
                  }`}
                  onClick={() => {
                    router.push(`/type/${parseInt(getPathId(type?.url) ?? "")}`);
                  }}
                >
                  <h1 className="text-center font-bold w-auto">
                    {type.name.toUpperCase().split("").slice(0, 3)}
                  </h1>
                </div>

                {relationType.find((i) => i.name == type.name) != null ? (
                  <div
                    className={`${
                      mappingValue[
                        relationType.find((i) => i.name == type.name)?.value ??
                          0
                      ]
                    }`}
                  >
                    <h1 className="text-center font-bold text-white">
                      {relationType.find((i) => i.name == type.name)?.value}
                    </h1>
                  </div>
                ) : (
                  <div className="mt-1 p-4 border-2 rounded-md w-32 h-16 flex items-center justify-center"></div>
                )}
              </div>
            );
          }) ?? []}
      </div>
    </div>
  );
}
