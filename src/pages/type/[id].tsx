"use client";
import React from "react";
import { GetPokemonTypeDetail } from "./api/detail";
import { useRouter } from "next/router";
import PokeomonListBadge from "@/components/pokemon/PokeomonListBadge";
import { getPathId } from "@/utils/useQuery";
import PokemonTypeTable from "@/components/pokemon/PokemonTypeTable";
import Navbar from "@/components/Navbar";
import Badge from "@/components/badge";
import { GetPokemonTypeAll } from "./api/list";

export default function PokemonType() {
  const router = useRouter();
  const typeId = parseInt(router?.query?.id as any);
  const { data, error, isLoading } = GetPokemonTypeDetail(typeId);
  // const { dataTypeAll, errorTypeAll, isLoadingTypeAll } = GetPokemonTypeAll();
  const pathdamageType = getPathId(data?.move_damage_class?.url);

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen items-center justify-start p-5 lg:p-10">
        <h1
          className="mb-14 text-start text-3xl font-bold
      tracking-widest"
        >
          {" "}
          Loading...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col min-h-screen items-center justify-start p-5 lg:p-10">
        <h1
          className="mb-14 text-start text-3xl font-bold
      tracking-widest"
        >
          {" "}
          Failed to load
        </h1>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen  justify-start p-5 lg:p-10">
        
        <div className="flex  justify-center">
          <h1 className="text-center font-bold text-3xl pt-10">{data?.name}</h1>
        </div>

        <div className="flex items-center  flex-col mt-10">

          <div className="flex md:flex-row smซ">
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
                  {data?.move_damage_class != null ? (
                    <tr>
                      <td className="border border-black">DamageType</td>
                      <td className="border border-black">
                        <div className="m-2">
                          <Badge
                            name={data?.move_damage_class.name}
                            url={data?.move_damage_class.url}
                            pathname={`/damage-type/${pathdamageType}`}
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

                  {data?.pokemon?.length != null &&
                  data?.pokemon?.length > 0 ? (
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
              <h1 className="font-bold text-3xl pt-10 ">Type defenses</h1>
              <div className="mt-4">
                <PokemonTypeTable types={[]} />
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
