import useSWR from "swr";
import { HtttpResponse } from "@/interfaces/http";
import {
  PokemonDetail,
  PokemonSpecyDetail,
  EvolutionChain,
} from "@/interfaces/pokemon";
import { fetcher, fetchers } from "@/utils/useFetch";

export const GetPokemonDetail = (
  pokemonId: number | null
): HtttpResponse<PokemonDetail> => {
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

export const GetPokemonDetails = (
  pokemonId: number[] | null
): HtttpResponse<PokemonDetail[]> => {
  const urls =
    pokemonId != null && pokemonId?.length > 0
      ? pokemonId
          .map((item) => `https://pokeapi.co/api/v2/pokemon/${item}/`)
          .filter((item) => item != null)
      : null;
  const { data, error, isLoading } = useSWR(urls, fetchers);

  if (data == null) {
    const res: PokemonDetail[] = [];
    return {
      data: res,
      error,
      isLoading,
    };
  }

  return {
    data,
    error,
    isLoading,
  };
};

export const GetPokemonSpecyDetail = (
  pokemonId: number | null
): HtttpResponse<PokemonSpecyDetail> => {
  const url = pokemonId
    ? `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
    : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export const GetPokemonEvolutionChain = (
  pokemonId: number | null
): HtttpResponse<EvolutionChain> => {
  const url = pokemonId
    ? `https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`
    : null;

  console.log("GetPokemonEvolutionChain url", url);

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
