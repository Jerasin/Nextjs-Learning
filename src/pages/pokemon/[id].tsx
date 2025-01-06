import React, { useEffect, useState } from "react";
import {
  GetPokemonDetail,
  GetPokemonDetails,
  GetPokemonEvolutionChain,
  GetPokemonSpecyDetail,
} from "../pokemon/api/detail";
import { useRouter } from "next/router";
import PokeomonListBadge from "@/components/pokemon/PokeomonListBadge";
import { getPathId } from "@/utils/useQuery";
import PokeomonTableStat from "@/components/pokemon/TablePokeomonStats";
import Navbar from "@/components/Navbar";
import EvolutionChart from "@/components/EvolutionChart";
import { Evolvesto2 } from "@/interfaces/pokemon";
import LoadingPage from "@/components/LoadingPage";
import FailedPage from "@/components/error/FailedPage";

const mapRecursiveEvolutionChain = (
  evolutionChain: number[],
  data: Evolvesto2[],
  skip_id?: number
) => {
  data.forEach((item) => {
    if (item?.species?.url != null) {
      console.log("item.species.url", item.species.url);
      const id = getPathId(item.species.url);

      if (skip_id != null && id != null) {
        if (skip_id != parseInt(id)) {
          evolutionChain.push(parseInt(id));
        }
      }
    }

    if (item?.evolves_to?.length > 0) {
      mapRecursiveEvolutionChain(evolutionChain, item.evolves_to, skip_id);
    }
  });
};

export default function PokemonDetail() {
  const [evolutionChainId, setEvolutionChainId] = useState<number | null>(null);
  const [evolutionChainList, setEvolutionChainList] = useState<number[] | null>(
    null
  );
  const router = useRouter();

  const pokemonId = parseInt(router?.query?.id as any);
  const { data, error, isLoading } = GetPokemonDetail(pokemonId);
  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: pokemonIsLoading,
  } = GetPokemonSpecyDetail(pokemonId);

  useEffect(() => {
    if (pokemonData && pokemonData.evolution_chain.url) {
      const query = getPathId(pokemonData.evolution_chain.url);
      if (query != null) {
        setEvolutionChainId(parseInt(query));
      }
    }
  }, [pokemonData]);

  const {
    data: pokemonEvolutionChainData,
    error: pokemonEvolutionChainError,
    isLoading: pokemonEvolutionChainIsLoading,
  } = GetPokemonEvolutionChain(evolutionChainId);

  useEffect(() => {
    if (pokemonEvolutionChainData != null) {
      const evolutionChainListTemp: number[] = [];
      const id = getPathId(pokemonEvolutionChainData.chain.species.url);

      if (id != null) {
        evolutionChainListTemp.push(parseInt(id));
      }

      mapRecursiveEvolutionChain(
        evolutionChainListTemp,
        pokemonEvolutionChainData.chain.evolves_to,
        pokemonId
      );

      setEvolutionChainList(evolutionChainListTemp);
    }
  }, [pokemonEvolutionChainData]);

  const {
    data: pokemonDetails,
    error: pokemonDetailsError,
    isLoading: pokemonDetailsIsLoading,
  } = GetPokemonDetails(evolutionChainList);

  if (
    isLoading &&
    pokemonIsLoading &&
    pokemonEvolutionChainIsLoading &&
    pokemonDetailsIsLoading
  ) {
    return LoadingPage();
  }

  if (
    error ||
    pokemonError ||
    pokemonEvolutionChainError ||
    pokemonDetailsError
  ) {
    return FailedPage();
  }

  return (
    <>
      <Navbar />

      <div className="justify-center">
        <h1 className="text-center font-bold text-3xl pt-10">{data?.name}</h1>
      </div>

      <div className="flex flex-col">
        <div className="md:flex items-start md:flex-row justify-start p-5">
          <div className="flex flex-col justify-center basis-1/2">
            <img
              className="w-full"
              src={`${data?.sprites?.front_default}`}
              alt="Image Not Found"
            />
          </div>

          <div className="md:flex items-start  md:flex-row basis-1/2">
            <div className="flex flex-col md:p-10">
              <div className="relative overflow-x-auto">
                <table className="w-full text-center bg-white table-auto border-collapse border border-black">
                  <thead>
                    <tr>
                      <th className="border border-black w-auto p-8">
                        Property
                      </th>
                      <th className="border border-black w-auto">Value</th>
                      <th className="border border-black w-auto px-8">
                        Detail
                      </th>
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
                                console.log("form", i);

                                return (
                                  <PokeomonListBadge key={i.name} forms={i} />
                                );
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
                                <PokeomonListBadge
                                  key={i.type.name}
                                  types={i}
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="md:flex items-start md:flex-row  basis-1/2">
            <div className="w-full md:px-10">
              <h1 className="font-bold text-3xl pt-7">Base stats</h1>
              <div className="mt-4">
                <PokeomonTableStat stats={data?.stats} />
              </div>
            </div>
          </div>
        </div>

        {/* {pokemonData?.evolution_chain != null ? (
          <div className="w-full px-5">
            <h1 className="font-bold text-3xl">EvolutionChart</h1>
            <div className="flex flex-row justify-center basis-1/4">
              <EvolutionChart
                data={pokemonEvolutionChainData}
                currentPokemonId={pokemonId}
                currentImg={`${data?.sprites?.front_default}`}
                pokemonDetails={pokemonDetails}
              />
            </div>
          </div>
        ) : (
          <></>
        )} */}

        <div className="flex justify-center m-10">
          <div className="flex flex-row">
            <div className="flex-auto bg-red-500">
              <button
                className="border border-solid rounded-lg p-2"
                onClick={(e) => router.back()}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
