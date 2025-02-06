import { HtttpResponse } from "@/interfaces/http";
import { PokemonTypes } from "@/interfaces/pokemon";
import { fetcher } from "@/utils/useFetch";
import useSWR from "swr";

interface GetPokemonTypeAllOptions {
  offset?: number;
  limit?: number;
}

export const GetPokemonTypeAll = (
  options?: GetPokemonTypeAllOptions
): HtttpResponse<PokemonTypes> => {
  let url = `https://pokeapi.co/api/v2/type`;
  const { offset, limit } = options ?? {};

  if (offset != null) {
    url = `${url}?offset=${offset}`;
  }

  if (limit != null) {
    if (offset != null) {
      url = `${url}&limit=${limit}`;
    } else {
      url = `${url}?limit=${limit}`;
    }
  }

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
