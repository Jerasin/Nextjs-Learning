"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import getPathId from "../../utils/useQuery";
import Badge from "../../components/badge";
import {
  PokemonTypeDetail,
  PokemonTypeRelation,
} from "../../interfaces/pokemon";
import ErrorPage from "../../components/error-page";
import LoadingPage from "../../components/loading-page";
import PokeomonListBadge from "@/components/pokeomon-list-badge";
import PokemonTypeTable from "@/components/pokemon-type-table";
import Navbar from "@/components/navbar";
import { GetPokemonTypeDetail } from "@/lib/api/type/detail";
import { GetPokemonTypeAll } from "@/lib/api/type/type-all";

function PokemonType() {
  const router = useRouter();
  const [typeId, setTypeId] = useState<number | null>(null);
  const [pokemonTypeRelationDef, setPokemonTypeRelationDef] = useState<
    PokemonTypeRelation[]
  >([]);
  const queryId = parseInt(router?.query?.id as any);
  const { data, error, isLoading } = GetPokemonTypeDetail(queryId);
  const {
    data: dataTypeAll,
    error: errorTypeAll,
    isLoading: isLoadingTypeAll,
  } = GetPokemonTypeAll({ limit: 9999 });

  useEffect(() => {
    if (data?.move_damage_class?.url) {
      const pathTypeId = getPathId(data?.move_damage_class?.url);

      if (pathTypeId != null) {
        setTypeId(parseInt(pathTypeId));
      }
    }

    if (data) {
      if (data?.moves?.length == 0 && data?.pokemon?.length == 0) {
        router.back();
      }

      const damageDef: PokemonTypeRelation[] = [];

      if (data?.damage_relations?.double_damage_from?.length > 0) {
        data?.damage_relations?.double_damage_from.forEach((a) => {
          damageDef.push({ name: a.name, url: a.url, value: "2" });
        });
      }

      if (data?.damage_relations?.half_damage_from?.length > 0) {
        data?.damage_relations?.half_damage_from.forEach((a) => {
          damageDef.push({ name: a.name, url: a.url, value: "½" });
        });
      }

      if (data?.damage_relations?.no_damage_from?.length > 0) {
        data?.damage_relations?.no_damage_from.forEach((a) => {
          damageDef.push({ name: a.name, url: a.url, value: "0" });
        });
      }

      if (damageDef.length > 0) {
        setPokemonTypeRelationDef(damageDef);
      }
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
          <h1 className="text-center font-bold text-3xl pt-10">
            {data?.name.toUpperCase()}
          </h1>
        </div>

        <div className="flex items-center  flex-col mt-10">
          {/* <div className="min-w-full">
            <h1 className="font-bold text-3xl mb-6">Property</h1>
          </div> */}

          <div className="2xl:max-w-xl max-w-full relative overflow-x-auto">
            <table className="min-w-full text-center bg-white table-auto border-collapse border border-black">
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

          <div className="2xl:max-w-xl max-w-full">
            <h1 className="font-bold text-3xl my-8">Type defenses</h1>

            <PokemonTypeTable
              relationType={pokemonTypeRelationDef}
              allTypes={dataTypeAll}
            />
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

export default PokemonType;
