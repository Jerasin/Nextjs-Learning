import { HtttpResponse } from "@/interfaces/http";
import { PokemonAbilityDetail } from "@/interfaces/pokemon";
import { fetcher } from "@/utils/useFetch";
import useSWR from "swr";

export const GetPokemonAbilityDetail = (
  abilityId: number | null
): HtttpResponse<PokemonAbilityDetail> => {
  const url = abilityId
    ? `${process.env.NEXT_PUBLIC_API_URL}/ability/${abilityId}/`
    : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
