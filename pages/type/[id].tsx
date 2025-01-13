"use client";
import React, { useEffect, useState } from "react";
import GetPokemonTypeDetail from "./api/detail";
import { useRouter } from "next/router";
import { getPathId } from "../../utils/useQuery";
import Badge from "../../components/badge";
import GetPokemonTypeAll from "./api/type-list";
import { PokemonTypeDetail } from "../../interfaces/pokemon";
import ErrorPage from "../../components/error-page";
import LoadingPage from "../../components/loading-page";
import PokeomonListBadge from "@/components/pokeomon-list-badge";
import PokemonTypeTable from "@/components/pokemon-type-table";
import Navbar from "@/components/navbar";

export default function PokemonType() {
  const router = useRouter();
  const [typeId, setTypeId] = useState<number | null>(null);
  const [types, setTypes] = useState<any[]>([]);
  const [pokemonTypeDetail, setPokemonTypeDetail] =
    useState<PokemonTypeDetail | null>(null);
  const queryId = parseInt(router?.query?.id as any);
  const { data, error, isLoading } = GetPokemonTypeDetail(queryId);
  const {
    data: dataTypeAll,
    error: errorTypeAll,
    isLoading: isLoadingTypeAll,
  } = GetPokemonTypeAll();

  useEffect(() => {
    if (data?.move_damage_class?.url) {
      const pathTypeId = getPathId(data?.move_damage_class?.url);
      setTypeId(parseInt(pathTypeId));
    }

    if (data && dataTypeAll) {
      setTypes(dataTypeAll.results);
      setPokemonTypeDetail(data);
    }
  }, [data, dataTypeAll]);

  if (isLoading || isLoadingTypeAll) {
    return LoadingPage();
  }

  if (error || errorTypeAll) {
    return ErrorPage();
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen  justify-start p-5 lg:p-10">
        <div className="flex  justify-center">
          <h1 className="text-center font-bold text-3xl pt-10">{data?.name}</h1>
        </div>

        <div className="flex items-center  flex-col mt-10">
          <div className=" w-auto relative overflow-x-auto">
            <h1 className="font-bold text-3xl mb-6">Property</h1>
            <table className="w-full text-center bg-white table-auto border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border border-black w-auto p-8">Property</th>
                  <th className="border border-black w-auto">Value</th>
                  <th className="border border-black w-auto px-8">Detail</th>
                </tr>
              </thead>
              <tbody>
                {data?.move_damage_class != null ? (
                  <tr>
                    <td className="border border-black">DamageType</td>
                    <td className="border border-black">
                      <div className="m-2">
                        <Badge
                          name={data?.move_damage_class.name}
                          url={data?.move_damage_class.url}
                          pathname={`/damage-type/${typeId}`}
                          color={
                            data?.move_damage_class.name == "physical"
                              ? "red"
                              : "blue"
                          }
                        />
                      </div>
                    </td>
                    <td className="border border-black"></td>
                  </tr>
                ) : (
                  <></>
                )}

                {data?.pokemon?.length != null && data?.pokemon?.length > 0 ? (
                  <tr>
                    <td className="border border-black">Pokemons</td>
                    <td className="border border-black">
                      <div className="p-5 overflow-auto max-h-48 h-auto">
                        {data?.pokemon?.map((i: any) => {
                          return (
                            <PokeomonListBadge
                              key={i.pokemon.name}
                              pokemon={i.pokemon}
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
                          return <PokeomonListBadge key={i.name} move={i} />;
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

          <div className="w-full">
            <h1 className="font-bold text-3xl my-8">Type defenses</h1>

            <div className="flex">
              <div className="text-center  flex flex-col justify-center mx-12">
                <h1>Damage From</h1>
              </div>

              <div className="flex flex-col flex-1">
                <div className="text-center mb-12">
                  <h1>Damage To</h1>
                </div>
                <div className="w-full">
                  <PokemonTypeTable
                    relationType={pokemonTypeDetail}
                    allTypes={types}
                  />
                </div>
              </div>
            </div>
          </div>

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
    </>
  );
}
