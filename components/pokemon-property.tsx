import { PokemonDetail, PokemonSpecyDetail } from "@/interfaces/pokemon";
import React from "react";
import PokeomonListBadge from "./pokeomon-list-badge";
import getPathId from "@/utils/useQuery";

interface PokemonPropertyTableInterface {
  pokemonData: PokemonSpecyDetail;
  data: PokemonDetail;
  pokemonId: number;
}

export default function PokemonPropertyTable(
  props: PokemonPropertyTableInterface
) {
  const { pokemonData, data, pokemonId } = props;

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
                          // console.log("move", i);

                          return (
                            <PokeomonListBadge
                              key={i.ability.name}
                              move={i.ability}
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
