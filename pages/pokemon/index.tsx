"use client";

import Pagination from "../../components/pagination";
import { useSearchParams } from "next/navigation";
import ListItem from "../../components/list-Item";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import { Pokemon } from "../../interfaces/pokemon";
import GetPokemonList from "@/lib/api/pokemon/list";
import privateRoute from "@/middleware/privateRoute";

function PokemonList() {
  const searchParams = useSearchParams();
  const paramsPage = parseInt(searchParams.get("page") ?? "1");
  const paramsPageSize = parseInt(searchParams.get("pageSize") ?? "5");
  const router = useRouter();
  const { data, error, isLoading } = GetPokemonList(paramsPage, paramsPageSize);

  const pokemonList: Pokemon[] = data?.results ?? [];
  const totalPage = Math.ceil(data?.count / paramsPageSize) ?? 0;
  const paginationSize = 5;

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

  // console.log("data", data);

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
            PokemonList Page
          </h1>
        </div>

        <div className="flex flex-row justify-center">
          <ListItem itemList={pokemonList} pathName="/pokemon" />
        </div>

        <div className="flex flex-row justify-center p-2">
          <Pagination
            page={paramsPage}
            pageSize={paramsPageSize}
            paginationSize={paginationSize}
            totalPage={totalPage}
            pathName={"/pokemon"}
          />
        </div>
      </main>
    </>
  );
}

export default privateRoute(PokemonList);
