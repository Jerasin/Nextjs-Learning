import {
  Chain,
  EvolutionChain,
  Evolvesto,
  PokemonDetail,
} from "@/interfaces/pokemon";
import { getPathId } from "@/utils/useQuery";
import Link from "next/link";
import React from "react";
import LoadingPage from "../LoadingPage";

interface EvolutionChartProps {
  pokemonEvolutionChainData: Chain;
  pokemonDetails: PokemonDetail[];
}

const renderLoading = () => {
  return LoadingPage();
};

const renderEvolution = (
  chain: Evolvesto,
  pokemonDetails: PokemonDetail[],
  count: number
) => {
  const speciesName = chain.species.name;
  const src = pokemonDetails.find((item) => item.name == chain.species.name);

  return (
    <div className="w-auto flex items-center">
      {/* <h1>Count: {count}</h1> */}
      <div className="flex flex-col text-center">
        {/* {count > 1 ? <i className="fa-solid fa-arrow-right"></i> : <></>} */}

        <div>
          <span className="text-lg font-bold">{speciesName}</span>
        </div>

        <div className="flex items-center w-44 h-32">
        {count > 1 ? <i className="fa-solid fa-arrow-right"></i> : <></>}

          <img
            src={src?.sprites?.front_default}
            alt="No Image"
            className="block w-full h-full object-cover"
          />

          {/* {chain.evolves_to.length == 1 ? (
            <i className="fa-solid fa-arrow-right"></i>
          ) : (
            <></>
          )} */}
        </div>
      </div>

      {/* {chain.evolves_to.length > 1 ? (
        <div className="flex h-full  flex-col">
          {chain.evolves_to.map(() => (
            <div className="block bg-red-500">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )} */}

      {chain.evolves_to.length > 0 && (
        <div className="flex flex-col items-center">
          {chain.evolves_to.map((evolution: Evolvesto, index: number) => (
            <div key={index} className="flex flex-col items-center">
              {renderEvolution(evolution, pokemonDetails, count + 1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function EvolutionChart(props: EvolutionChartProps) {
  const { pokemonDetails, pokemonEvolutionChainData } = props ?? {};

  if (pokemonDetails == null) {
    return renderLoading();
  }
  return renderEvolution(pokemonEvolutionChainData, pokemonDetails, 1);
}
