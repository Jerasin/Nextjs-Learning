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
import EvolutionChart from "@/components/pokemon/EvolutionChart";
import { Chain, Evolvesto, Trigger } from "@/interfaces/pokemon";
import LoadingPage from "@/components/LoadingPage";
import FailedPage from "@/components/error/FailedPage";

const mapRecursiveEvolutionChain = (
  pokemonEvolutionChainData: Chain,
  cache: number[]
) => {
  console.log("mapRecursiveEvolutionChain", pokemonEvolutionChainData);

  if (pokemonEvolutionChainData?.species != null) {
    const id = getPathId(pokemonEvolutionChainData?.species.url);
    cache.push(parseInt(id));
  }

  if (pokemonEvolutionChainData?.evolves_to?.length > 0) {
    pokemonEvolutionChainData?.evolves_to?.forEach((item) => {
      mapRecursiveEvolutionChain(item, cache);
    });
  }
};

export default function PokemonDetail() {
  const [evolutionChainId, setEvolutionChainId] = useState<number | null>(null);
  const [evolutionChainList, setEvolutionChainList] = useState<number[] | null>(
    null
  );
  const [speciesId, setSpeciesId] = useState<number | null>(null);
  const router = useRouter();

  const pokemonId = parseInt(router?.query?.id as any);
  const { data, error, isLoading } = GetPokemonDetail(pokemonId);

  useEffect(() => {
    if (data?.species?.url) {
      const id = getPathId(data?.species?.url);
      setSpeciesId(parseInt(id));
    }
  }, [data]);

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: pokemonIsLoading,
  } = GetPokemonSpecyDetail(speciesId);

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
      // console.log("pokemonEvolutionChainData", pokemonEvolutionChainData);
      const evolutionChainListTemp: number[] = [];
      const id = getPathId(pokemonEvolutionChainData.chain.species.url);

      if (id != null) {
        evolutionChainListTemp.push(parseInt(id));
      }

      const cache: number[] = [];
      mapRecursiveEvolutionChain(pokemonEvolutionChainData.chain, cache);
      console.log("cache", cache);
      setEvolutionChainList(cache);
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

      {/* img Pokemon */}
      <div className="w-auto h-auto flex justify-center">
        <img
          className="block w-auto h-64"
          src={`${data?.sprites?.front_default}`}
          alt="Image Not Found"
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="lg:flex lg:flex-row justify-start p-5 ">
          {/* img Pokemon */}
          {/* <div className="w-auto flex flex-col  basis-1/3">
            <img
              className="w-full"
              src={`${data?.sprites?.front_default}`}
              alt="Image Not Found"
            />
          </div> */}

          {/* Property Pokemon */}
          <div className="w-auto md:flex items-start  md:flex-row basis-1/2 justify-center lg:p-2">
            <div className="flex flex-col lg:px-10">
              <h1 className="font-bold text-3xl pt-7">Base Property</h1>
              <div className="mt-4">
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
                          <td className="border border-black">
                            Base Experience
                          </td>
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

                      {data?.moves?.length != null &&
                      data?.moves?.length > 0 ? (
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

                      {data?.types?.length != null &&
                      data?.types?.length > 0 ? (
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
          </div>

          {/* Stats Pokemon */}
          <div className="w-full md:flex items-start md:flex-row  basis-1/2 justify-center">
            <div className="w-full lg:px-10">
              <h1 className="font-bold text-3xl pt-7">Base stats</h1>
              <div className="mt-4">
                <PokeomonTableStat stats={data?.stats} />
              </div>
            </div>
          </div>
        </div>

        {pokemonData?.evolution_chain != null &&
        pokemonEvolutionChainData != null ? (
          <div className="w-full px-5 flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl mb-12">EvolutionChart</h1>
            <div className="flex flex-col md:flex-row  w-full justify-center items-center">
              <EvolutionChart pokemonDetails={pokemonDetails} />
            </div>
          </div>
        ) : (
          <></>
        )}

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
