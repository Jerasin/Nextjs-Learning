"use client";

import {
  Pokedexnumber,
  PokemonDetail,
  PokemonSpecyDetail,
} from "@/interfaces/pokemon";
import React, { useEffect, useState } from "react";
import PokeomonListBadge from "./pokeomon-list-badge";
import getPathId from "@/utils/useQuery";
import Badge from "./badge";

interface PokemonPropertyTableInterface {
  pokemonData: PokemonSpecyDetail;
  data: PokemonDetail;
  pokemonId: number;
}

interface CustomPokedexnumber extends Omit<Pokedexnumber, "entry_number"> {
  entry_number: string;
}

export default function PokemonPropertyTable(
  props: PokemonPropertyTableInterface
) {
  const { pokemonData, data, pokemonId } = props;
  const x: string[] = [];
  const [colorId, setColorId] = useState<number | null>(null);
  const [pokedexNumbers, setPokedexNumbers] = useState<
    CustomPokedexnumber[] | null
  >(null);

  useEffect(() => {
    if (pokemonData?.color?.url != null) {
      const colorPathId = getPathId(pokemonData?.color.url);

      if (colorPathId != null) {
        setColorId(parseInt(colorPathId));
      }
    }

    if (pokemonData?.pokedex_numbers != null) {
      const mappingPokedexNumbers = pokemonData?.pokedex_numbers.map((item) => {
        const maxLength = 4;
        const entryNumberStr = JSON.stringify(item.entry_number);
        console.log("padStart", entryNumberStr.padStart(maxLength, "0"));
        return {
          ...item,
          entry_number: entryNumberStr.padStart(maxLength, "0"),
        };
      });

      setPokedexNumbers(mappingPokedexNumbers);
    }
  }, [pokemonData]);

  return (
    <div className="w-auto md:flex items-start  md:flex-row basis-1/2 justify-center">
      <div className="w-full lg:px-10">
        <h1 className="font-bold text-3xl pt-7">Base Property</h1>
        <div className="mt-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-center bg-white table-auto border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border border-black w-auto p-8">Property</th>
                  <th className="border border-black w-auto">Value</th>
                  <th className="border border-black w-auto px-8">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black">Weight</td>
                  <td className="border border-black">{data?.weight}</td>
                  <td className="border border-black"></td>
                </tr>

                <tr>
                  <td className="border border-black">Height</td>
                  <td className="border border-black">{data?.height}</td>
                  <td className="border border-black"></td>
                </tr>

                <tr>
                  <td className="border border-black">Capture Rate</td>
                  <td className="border border-black">
                    {pokemonData?.capture_rate}
                  </td>
                  <td className="border border-black"></td>
                </tr>

                <tr>
                  <td className="border border-black">Local No.</td>
                  <td className="border border-black">
                    <div className="flex flex-col items-center w-full">
                      <div className="overflow-auto max-h-48 h-auto 2xl:w-1/2 p-2 2xl:p-4">
                        {pokedexNumbers?.map((item) => {
                          return (
                            <div
                              className="text-left w-full"
                              key={`${item?.entry_number}-${item?.pokedex?.name}`}
                            >
                              <table className="w-full table-auto">
                                <tbody>
                                  <tr>
                                    <td className="w-1/3">
                                      <b className="text-xs md:text-xl">
                                        {item?.entry_number}
                                      </b>
                                    </td>
                                    <td className="w-2/3 truncate">
                                      <div className="text-left text-xs md:text-base">
                                        ({item?.pokedex?.name})
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="border border-black">Color</td>
                  <td className="border border-black">
                    <Badge
                      name={pokemonData?.color.name}
                      url={pokemonData?.color.url}
                      pathname={`/color/${colorId}`}
                    />
                  </td>
                  <td className="border border-black"></td>
                </tr>

                <tr>
                  <td className="border border-black">Base Happiness</td>
                  <td className="border border-black">
                    {pokemonData?.base_happiness}
                  </td>
                  <td className="border border-black"></td>
                </tr>

                {pokemonData?.evolves_from_species != null ? (
                  <tr>
                    <td className="border border-black">Evolves From</td>
                    <td className="border border-black">
                      <div className="p-5 overflow-auto max-h-48 h-auto">
                        <PokeomonListBadge
                          key={pokemonData?.evolves_from_species?.name}
                          forms={pokemonData?.evolves_from_species}
                        />
                      </div>
                    </td>
                    <td className="border border-black"></td>
                  </tr>
                ) : (
                  <></>
                )}

                {data?.base_experience != null ? (
                  <tr>
                    <td className="border border-black">Base Experience</td>
                    <td className="border border-black">
                      {data?.base_experience}
                    </td>
                    <td className="border border-black"></td>
                  </tr>
                ) : (
                  <></>
                )}

                {data?.forms?.length != null &&
                data?.forms?.filter((item) => {
                  const id = getPathId(item.url);
                  if (id != null && pokemonId != parseInt(id)) {
                    return item;
                  }
                }) &&
                data?.forms?.filter((item) => {
                  const id = getPathId(item.url);
                  if (id != null && pokemonId != parseInt(id)) {
                    return item;
                  }
                }).length > 0 ? (
                  <tr>
                    <td className="border border-black">Forms</td>
                    <td className="border border-black">
                      <div className="p-5 overflow-auto max-h-48 h-auto">
                        {data?.forms
                          ?.filter((item) => {
                            const id = getPathId(item.url);
                            if (id != null && pokemonId != parseInt(id)) {
                              return item;
                            }
                          })
                          ?.map((i: any) => {
                            return <PokeomonListBadge key={i.name} forms={i} />;
                          }) ?? []}
                      </div>
                    </td>
                    <td className="border border-black"></td>
                  </tr>
                ) : (
                  <></>
                )}

                {data?.abilities?.length != null &&
                data?.abilities?.length > 0 ? (
                  <tr>
                    <td className="border border-black">Abilities</td>
                    <td className="border border-black">
                      <div className="p-5 overflow-auto max-h-48 h-auto">
                        {data?.abilities?.map((i: any) => {
                          if (!x.includes(i.ability.name)) {
                            x.push(i.ability.name);
                            return (
                              <PokeomonListBadge
                                key={`${i.ability.name}-${i.slot}`}
                                ability={i.ability}
                              />
                            );
                          }
                        }) ?? []}
                      </div>
                    </td>
                    <td className="border border-black"></td>
                  </tr>
                ) : (
                  <></>
                )}

                {data?.moves?.length != null && data?.moves?.length > 0 ? (
                  <tr>
                    <td className="border border-black">Moves</td>
                    <td className="border border-black">
                      <div className="p-5 overflow-auto max-h-48 h-auto">
                        {data?.moves?.map((i: any) => {
                          // console.log("move", i);

                          return (
                            <PokeomonListBadge
                              key={i.move.name}
                              move={i.move}
                            />
                          );
                        }) ?? []}
                      </div>
                    </td>
                    <td className="border border-black"></td>
                  </tr>
                ) : (
                  <></>
                )}

                {data?.types?.length != null && data?.types?.length > 0 ? (
                  <tr>
                    <td className="border border-black">Types</td>
                    <td className="border border-black">
                      <div className="p-5 overflow-auto max-h-48 h-auto">
                        {data?.types?.map((i: any) => {
                          return (
                            <PokeomonListBadge key={i.type.name} types={i} />
                          );
                        }) ?? []}
                      </div>
                    </td>
                    <td className="border border-black"></td>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
