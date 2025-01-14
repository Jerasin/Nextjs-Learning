import { HtttpResponse } from "@/interfaces/http";
import { EvolutionChain } from "@/interfaces/pokemon";
import { fetcher } from "@/utils/useFetch";
import useSWR from "swr";

export const GetPokemonEvolutionChain = (pokemonId: number | null): HtttpResponse<EvolutionChain> => {
  const url = pokemonId
    ? `https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`
    : null;

  // console.log("GetPokemonEvolutionChain url", url);

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
