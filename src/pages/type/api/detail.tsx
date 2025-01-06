import useSWR from "swr";
import { HtttpResponse } from "@/interfaces/http";
import { PokemonTypeDetail } from "@/interfaces/pokemon";
import { fetcher } from "@/utils/useFetch";

export const GetPokemonTypeDetail = (
  typeId: number | null
): HtttpResponse<PokemonTypeDetail> => {
  const url = typeId ? `https://pokeapi.co/api/v2/type/${typeId}/` : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
