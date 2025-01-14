import { HtttpResponse } from "@/interfaces/http";
import { PokemonDetail } from "@/interfaces/pokemon";
import { fetcher } from "@/utils/useFetch";
import useSWR from "swr";

export const GetPokemonDetail = (pokemonId: number | null): HtttpResponse<PokemonDetail> => {
  const url = pokemonId
    ? `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
