"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import getPathId from "../../utils/useQuery";
import { Chain } from "../../interfaces/pokemon";
import LoadingPage from "../../components/loading-page";
import FailedPage from "../../components/failed-page";
import EvolutionChart from "@/components/evolution-chart";
import TablePokemonStats from "@/components/table-pokemon-stats";
import PokemonPropertyTable from "@/components/pokemon-property";
import Navbar from "@/components/navbar";
import { GetPokemonSpecyDetail } from "@/lib/api/pokemon/specy-detail";
import { GetPokemonEvolutionChain } from "@/lib/api/pokemon/evolution-chain";
import { GetPokemonDetails } from "@/lib/api/pokemon/details";
import { GetPokemonDetail } from "@/lib/api/pokemon/detail";
import Image from "next/image";
import Link from "next/link";


const mapRecursiveEvolutionChain = (
  pokemonEvolutionChainData: Chain,
  cache: number[]
) => {
  // console.log("mapRecursiveEvolutionChain", pokemonEvolutionChainData);

  if (pokemonEvolutionChainData?.species != null) {
    const id = getPathId(pokemonEvolutionChainData?.species.url);

    if (id != null) {
      cache.push(parseInt(id));
    }
  }

  if (pokemonEvolutionChainData?.evolves_to?.length > 0) {
    pokemonEvolutionChainData?.evolves_to?.forEach((item) => {
      mapRecursiveEvolutionChain(item, cache);
    });
  }
};

function PokemonDetail() {
  const [evolutionChainId, setEvolutionChainId] = useState<number | null>(null);
  const [evolutionChainList, setEvolutionChainList] = useState<number[] | null>(
    null
  );
  const [speciesId, setSpeciesId] = useState<number | null>(null);
  const [varieties, setVarieties] = useState<number[] | null>(null);
  const router = useRouter();
  const pokemonId = parseInt(router?.query?.id as any);
  const { data, error, isLoading } = GetPokemonDetail(pokemonId);

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: pokemonIsLoading,
  } = GetPokemonSpecyDetail(speciesId);

  const {
    data: pokemonEvolutionChainData,
    error: pokemonEvolutionChainError,
    isLoading: pokemonEvolutionChainIsLoading,
  } = GetPokemonEvolutionChain(evolutionChainId);

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

  useEffect(() => {
    const fetchData = async () => {
      if (data?.species?.url) {
        const id = getPathId(data?.species?.url);
        if (id != null) setSpeciesId(parseInt(id));
      }

      if (pokemonData) {
        // Set Evolution Chain ID
        if (pokemonData.evolution_chain.url) {
          const query = getPathId(pokemonData.evolution_chain.url);
          if (query != null) {
            setEvolutionChainId(parseInt(query));
          }
        }

        // Set varieties
        if (pokemonData.varieties.length > 0) {
          const varietyIds = pokemonData.varieties
            .map((i) => {
              const id = getPathId(i.pokemon.url);
              return id != null ? parseInt(id) : null;
            })
            .filter((i) => i != null);
          setVarieties(varietyIds);
        }
      }

      if (pokemonEvolutionChainData != null) {
        const evolutionChainListTemp: number[] = [];
        const id = getPathId(pokemonEvolutionChainData.chain.species.url);
        if (id != null) {
          evolutionChainListTemp.push(parseInt(id));
        }

        const cache: number[] = [];
        mapRecursiveEvolutionChain(pokemonEvolutionChainData.chain, cache);
        setEvolutionChainList(cache);
        console.log("cache", cache);
      }
    };

    if (data) {
      fetchData();
    }
  }, [data, pokemonData, pokemonEvolutionChainData]);

  const isAllLoading =
    isLoading ||
    pokemonIsLoading ||
    pokemonEvolutionChainIsLoading ||
    pokemonDetailsIsLoading ||
    pokemonVarietiesIsLoading;

  if (isAllLoading) {
    LoadingPage();
  }

  if (
    error ||
    pokemonError ||
    pokemonEvolutionChainError ||
    pokemonDetailsError ||
    pokemonVarietiesError
  ) {
    FailedPage();
  }

  const divRef = useRef<HTMLDivElement | null>(null);
  const pokemonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  useEffect(() => {
    if (data?.name && pokemonRefs.current[data.name]) {
      // ถ้าพบ pokemon ที่ตรงกับ data?.name, เลื่อน scroll ไปยัง pokemon นั้น
      pokemonRefs.current[data.name]?.scrollIntoView({
        behavior: "smooth",
        block: "center", // ทำให้ element อยู่ตรงกลางหน้าจอ
      });
    }
  }, [pokemonData]);

  return (
    <>
      <Navbar />

      <div className="flex flex-row justify-center">
        <div className="w-full lg:w-5/6">
          {pokemonData?.varieties.length > 1 ? (
            <div
              className="flex mt-12 mx-8 2xl:mx-10 bg-white rounded-lg overflow-x-auto"
              ref={divRef}
            >
              {pokemonData?.varieties.map((i) => {
                const pokemonId = getPathId(i.pokemon.url);
                if (i.pokemon.name == data?.name) {
                  return (
                    <div
                      key={i.pokemon.name}
                      ref={(el) => {
                        console.log("el", el);
                        pokemonRefs.current[i.pokemon.name] = el;
                      }}
                      className="p-4 mx-4 bg-violet-600 rounded-md cursor-pointer text-white"
                    >
                      <h1 className="truncate">{i.pokemon.name}</h1>
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={i.pokemon.name}
                      className="p-4 mx-4 hover:bg-violet-600 rounded-md cursor-pointer"
                      href={{
                        pathname: `${pokemonId}`,
                      }}
                    >
                      <h1 className="truncate">{i.pokemon.name}</h1>
                    </Link>
                  );
                }
              })}
            </div>
          ) : (
            <></>
          )}

          <div className="mt-8 justify-center my-10">
            <h1 className="text-center font-bold text-3xl pt-10">
              {data?.name}
            </h1>
          </div>

          {/* img Pokemon */}
          <div className="w-auto h-auto flex justify-center">
            <Image
              className="block w-auto h-64"
              src={data?.sprites?.front_default || "/images/placeholder.png"} // ใช้ค่าที่มีอยู่หรือ placeholder ถ้าไม่มี
              alt="Image Not Found"
              width={256} // กำหนด width ที่ต้องการ
              height={256} // กำหนด height ที่ต้องการ
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

            {/* Evolution Chart */}
            {pokemonData?.evolution_chain &&
              pokemonEvolutionChainData && (
                <EvolutionChart
                  pokemonEvolutionChainData={pokemonEvolutionChainData.chain}
                  pokemonDetails={pokemonDetails}
                />
              )}

            <div className="flex justify-center m-10">
              <div className="flex flex-row">
                <div className="flex-auto bg-red-500">
                  <button
                    className="border border-solid rounded-lg p-2"
                    onClick={() => router.back()}
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

export default PokemonDetail;
