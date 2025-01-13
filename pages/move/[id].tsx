import React from "react";
import { GetMoveDetail } from "./api/detail";
import { useRouter } from "next/router";
import Badge from "../../components/badge";
import { getPathId } from "../../utils/useQuery";
import PokeomonListBadge from "@/components/pokeomon-list-badge";

export default function MoveDetail() {
  const router = useRouter();
  const pokemonId = parseInt(router?.query?.id as any);
  const { data, error, isLoading } = GetMoveDetail(pokemonId);

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

  const pathdamageType = getPathId(data?.damage_class?.url);
  const pathType = getPathId(data?.type?.url);

  return (
    <div className="flex flex-col min-h-screen  justify-start p-5 lg:p-10">
      <div className="flex  justify-center">
        <h1 className="text-center font-bold text-3xl pt-10">{data?.name}</h1>
      </div>

      <div className="flex items-center  flex-col mt-10">
        <div className="flex flex-col  max-w-xl">
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
                {data?.type != null ? (
                  <tr>
                    <td className="border border-black">Type</td>
                    <td className="border border-black">
                      <Badge
                        name={data?.type.name}
                        url={data?.type.url}
                        pathname={`/damage-type/${pathType}`}
                        // color={data?.type.name == "physical" ? "red" : "blue"}
                      />
                    </td>
                    <td className="border border-black"></td>
                  </tr>
                ) : (
                  <></>
                )}

                <tr>
                  <td className="border border-black">Accuracy</td>
                  <td className="border border-black">{data?.accuracy}</td>
                  <td className="border border-black"></td>
                </tr>

                <tr>
                  <td className="border border-black">Power</td>
                  <td className="border border-black">{data?.power}</td>
                  <td className="border border-black"></td>
                </tr>

                {data?.damage_class != null ? (
                  <tr>
                    <td className="border border-black">DamageType</td>
                    <td className="border border-black">
                      <div className="m-2">
                        <Badge
                          name={data?.damage_class.name}
                          url={data?.damage_class.url}
                          pathname={`/damage-type/${pathdamageType}`}
                          color={
                            data?.damage_class.name == "physical"
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

                <tr>
                  <td className="border border-black">PP</td>
                  <td className="border border-black">{data?.pp}</td>
                  <td className="border border-black"></td>
                </tr>

                <tr>
                  <td className="border border-black">Pokemons</td>
                  <td className="border border-black">
                    <div className="p-5 overflow-auto h-64">
                      {data?.learned_by_pokemon?.map((i: any) => {
                        return <PokeomonListBadge key={i.name} pokemon={i} />;
                      }) ?? []}
                    </div>
                  </td>
                  <td className="border border-black"></td>
                </tr>
              </tbody>
            </table>
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
  );
}
