import { HtttpResponse } from "../../../interfaces/http";
import { ReponseApiPokemon } from "../../../interfaces/pokemon";
import { fetcher } from "../../../utils/useFetch";
import useSWR from "swr";

export const GetPokemonTypeList = (
  page = 1,
  page_size = 10
): HtttpResponse<ReponseApiPokemon> => {
  const offset = (page - 1) * page_size;
  const limit = page_size;

  const url = `https://pokeapi.co/api/v2/type?limit=${limit}&offset=${offset}`;

  const { data, error, isLoading } = useSWR(url, fetcher);
  return {
    data,
    error,
    isLoading,
  };
};

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
