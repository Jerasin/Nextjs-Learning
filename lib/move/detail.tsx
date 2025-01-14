import { HtttpResponse } from "@/interfaces/http";
import useSWR from "swr";

export interface GetMoveDetailType {
  name: string;
  url: string;
}

export interface LearnedByPokemon {
  name: string;
}

export interface GetMoveDetailInterface {
  id: number;
  name: string;
  pp: number;
  type: GetMoveDetailType;
  learned_by_pokemon: LearnedByPokemon[];
  accuracy: number;
  damage_class: {
    name: string;
    url: string;
  };
  power: number;
}

// const fetcher: Fetcher<GetMoveDetailInterface, string> = (...args) =>
//   fetch(...args).then((res) => res.json());

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const GetMoveDetail = (
  moveId: number | null
): HtttpResponse<GetMoveDetailInterface | undefined> => {
  const url = moveId ? `https://pokeapi.co/api/v2/move/${moveId}/` : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default GetMoveDetail;
