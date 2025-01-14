import { HtttpResponse } from "@/interfaces/http";
import { ReponseApiPokemon } from "@/interfaces/pokemon";
import { fetcher } from "@/utils/useFetch";
import useSWR from "swr";

export const GetPokemonTypeAll = (): HtttpResponse<
  ReponseApiPokemon | undefined
> => {
  const url = `https://pokeapi.co/api/v2/type`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
