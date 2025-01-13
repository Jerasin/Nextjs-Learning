import React, { useEffect, useState } from "react";
import {
  GetPokemonDetail,
  GetPokemonDetails,
  GetPokemonEvolutionChain,
  GetPokemonSpecyDetail,
} from "./api/detail";
import { useRouter } from "next/router";
import { getPathId } from "../../utils/useQuery";
import { Chain } from "../../interfaces/pokemon";
import LoadingPage from "../../components/loading-page";
import FailedPage from "../../components/failed-page";
import EvolutionChart from "@/components/evolution-chart";
import TablePokemonStats from "@/components/table-pokemon-stats";
import PokemonPropertyTable from "@/components/pokemon-property";
import Navbar from "@/components/navbar";

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
  const [varieties, setVarieties] = useState<number[] | null>(null);
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

      if (pokemonData.varieties.length > 0) {
        const varietyIds = pokemonData.varieties.map((i) =>
          parseInt(getPathId(i.pokemon.url))
        );
        setVarieties(varietyIds);
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
      console.log("pokemonEvolutionChainData", pokemonEvolutionChainData);
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

  const {
    data: pokemonVarieties,
    error: pokemonVarietiesError,
    isLoading: pokemonVarietiesIsLoading,
  } = GetPokemonDetails(varieties);

  if (
    isLoading ||
    pokemonIsLoading ||
    pokemonEvolutionChainIsLoading ||
    pokemonDetailsIsLoading ||
    pokemonVarietiesIsLoading
  ) {
    return LoadingPage();
  }

  if (
    error ||
    pokemonError ||
    pokemonEvolutionChainError ||
    pokemonDetailsError ||
    pokemonVarietiesError
  ) {
    return FailedPage();
  }

  console.log("pokemonVarieties", pokemonVarieties);

  return (
    <>
      <Navbar />

      <div className="flex flex-row justify-center">
        <div className="w-5/6">
          <div className="justify-center">
            <h1 className="text-center font-bold text-3xl pt-10">
              {data?.name}
            </h1>
          </div>

          {/* <div>
            {pokemonData?.varieties?.length > 0 ? (
              pokemonData.varieties.map((item) => {
                return <h1>{item.pokemon.name}</h1>;
              })
            ) : (
              <></>
            )}
          </div> */}

          {/* img Pokemon */}
          <div className="w-auto h-auto flex justify-center">
            <img
              className="block w-auto h-64"
              src={`${data?.sprites?.front_default}`}
              alt="Image Not Found"
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="2xl:flex 2xl:flex-row justify-start p-5">
              {/* Property Pokemon */}
              <PokemonPropertyTable
                pokemonData={pokemonData}
                data={data}
                pokemonId={pokemonId}
              />

              {/* Stats Pokemon */}
              <TablePokemonStats stats={data?.stats} />
             
            </div>

            {pokemonData?.evolution_chain != null &&
            pokemonEvolutionChainData != null ? (
              <EvolutionChart
                    pokemonEvolutionChainData={pokemonEvolutionChainData.chain}
                    pokemonDetails={pokemonDetails}
                  />
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
        </div>
      </div>
    </>
  );
}
