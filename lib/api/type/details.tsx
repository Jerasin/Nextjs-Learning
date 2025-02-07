import { HtttpResponse } from "@/interfaces/http";
import { PokemonTypeDetail } from "@/interfaces/pokemon";
import { fetchers } from "@/utils/useFetch";
import useSWR from "swr";

export const GetPokemonTypeDetails = (
  typeIds: number[] | null
): HtttpResponse<PokemonTypeDetail[]> => {
  const urls =
    typeIds != null && typeIds?.length > 0
      ? typeIds
          .map((item) => `https://pokeapi.co/api/v2/type/${item}/`)
          .filter((item) => item != null)
      : null;

  const { data, error, isLoading } = useSWR(urls, fetchers);

  if (data == null) {
    const res: PokemonTypeDetail[] = [];
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
