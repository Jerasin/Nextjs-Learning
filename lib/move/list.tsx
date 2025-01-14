import { ReponseApiPokemon } from "@/interfaces/pokemon";
import { HtttpResponse } from "../../interfaces/http";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const GetMoveList = (
  page = 1,
  page_size = 10
): HtttpResponse<ReponseApiPokemon> => {
  const offset = (page - 1) * page_size;
  const limit = page_size;

  const url = `https://pokeapi.co/api/v2/move?limit=${limit}&offset=${offset}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default GetMoveList;
