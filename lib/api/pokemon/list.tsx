
import { HtttpResponse } from "@/interfaces/http";
import { ReponseApiPokemon } from "@/interfaces/pokemon";
import { fetcher } from "@/utils/useFetch";
import useSWR from "swr";

export const GetPokemonList = (
  page = 1,
  page_size = 10
): HtttpResponse<ReponseApiPokemon> => {
  const offset = (page - 1) * page_size;
  const limit = page_size;

  console.log("process.env.NEXT_PUBLIC_API_URL",process.env.NEXT_PUBLIC_API_URL);

  const url = `${process.env.NEXT_PUBLIC_API_URL}?limit=${limit}&offset=${offset}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default GetPokemonList
