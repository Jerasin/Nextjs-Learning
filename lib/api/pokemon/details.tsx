import { HtttpResponse } from "@/interfaces/http";
import { PokemonDetail } from "@/interfaces/pokemon";
import { fetchers } from "@/utils/useFetch";
import useSWR from "swr";

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
