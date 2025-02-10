import Badge from "@/components/badge";
import ErrorPage from "@/components/error-page";
import LoadingPage from "@/components/loading-page";
import Navbar from "@/components/navbar";
import PokeomonListBadge from "@/components/pokeomon-list-badge";
import { GetPokemonAbilityDetail } from "@/lib/api/ability/detail";
import { useRouter } from "next/router";
import React from "react";

function PokemonAbility() {
  const router = useRouter();
  const queryId = parseInt(router?.query?.id as any);
  const { data, error, isLoading } = GetPokemonAbilityDetail(queryId);

  if (isLoading) {
    return LoadingPage();
  }

  if (error) {
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

                <tr>
                  <td className="border border-black">Generation</td>
                  <td>{data?.generation?.name.toUpperCase()}</td>
                  <td className="border border-black"></td>
                </tr>

                <tr className="border border-black">
                  <td className="border border-black">Effect Entries</td>
                  <td className="border border-black">
                    <div className="p-5 overflow-auto max-h-48 h-auto">
                      {data?.effect_entries?.map((i: any) => {
                        return (
                          <div
                            key={i?.short_effect}
                            className="border-b-4 border-gray-500"
                          >
                            <h1>
                              Language: {i?.language?.name} - {i?.short_effect}
                            </h1>
                          </div>
                        );
                      }) ?? []}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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

export default PokemonAbility;
