import ErrorPage from "@/components/error-page";
import ListItem from "@/components/list-Item";
import LoadingPage from "@/components/loading-page";
import Navbar from "@/components/navbar";
import Pagination from "@/components/pagination";
import { PokemonAbility } from "@/interfaces/pokemon";
import GetPokemonAbilityList from "@/lib/api/ability/list";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function AbilityPage() {
  const searchParams = useSearchParams();
  const paramsPage = parseInt(searchParams.get("page") ?? "1");
  const paramsPageSize = parseInt(searchParams.get("pageSize") ?? "5");
  const router = useRouter();
  const { data, error, isLoading } = GetPokemonAbilityList(
    paramsPage,
    paramsPageSize
  );

  const pokemonAbilities: PokemonAbility[] = data?.results ?? [];
  const totalPage = Math.ceil(data?.count / paramsPageSize) ?? 0;
  const paginationSize = 5;

  if (isLoading) {
    return LoadingPage();
  }

  if (error) {
    return ErrorPage();
  }

  if (paramsPage > totalPage) {
    router.push("/pokemon?page=1&pageSize=5");
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen  justify-start p-5 lg:p-10">
        <div className="flex  justify-center">
          <h1
            className="mb-14 text-start text-3xl font-bold
      tracking-widest"
          >
            Pokemon AbilityList Page
          </h1>
        </div>

        <div className="flex flex-row justify-center">
          <ListItem itemList={pokemonAbilities} pathName="/ability" />
        </div>

        <div className="flex flex-row justify-center p-2">
          <Pagination
            page={paramsPage}
            pageSize={paramsPageSize}
            paginationSize={paginationSize}
            totalPage={totalPage}
            pathName={"/ability"}
          />
        </div>
      </main>
    </>
  );
}

export default AbilityPage;
