import { HtttpResponse } from "@/interfaces/http";
import { PokemonSpecyDetail } from "@/interfaces/pokemon";
import { fetcher } from "@/utils/useFetch";
import useSWR from "swr";

export default (
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
