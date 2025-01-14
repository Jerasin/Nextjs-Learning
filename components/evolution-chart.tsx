import { Chain, Evolvesto, PokemonDetail } from "@/interfaces/pokemon";
import Link from "next/link";
import React from "react";
import LoadingPage from "./loading-page";
import getPathId from "@/utils/useQuery";
import FailedPage from "./failed-page";

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
  const evolutionItem =
    chain.evolution_details.length > 0
      ? chain?.evolution_details[0]?.item?.name ?? null
      : null;
  const evolutionHeldItem =
    chain.evolution_details.length > 0
      ? chain?.evolution_details[0]?.held_item?.name ?? null
      : null;
  const evolutionTrggier =
    chain.evolution_details.length > 0
      ? chain?.evolution_details[0]?.trigger.name ?? null
      : null;
  const min_level =
    chain.evolution_details.length > 0
      ? chain?.evolution_details[0]?.min_level ?? null
      : null;
  const id = getPathId(chain.species.url);

  if (id == null) {
    <FailedPage />;
    return;
  }

  console.log("id", id);
  const src = pokemonDetails.find((item) => item.id == parseInt(id));
  const condition =
    (min_level && evolutionTrggier && count > 1) ||
    (evolutionItem && evolutionTrggier && count > 1) ||
    (evolutionHeldItem && evolutionTrggier && count > 1);

  return (
    <div className="w-auto flex items-center">
      {condition ? (
        <div className="flex flex-col text-center">
          {count > 1 ? <i className="fa-solid fa-arrow-right"></i> : <></>}

          <div className="w-full">
            {min_level ? (
              <div>
                <span className="text-md font-bold">{min_level}</span>
              </div>
            ) : (
              <></>
            )}

            {evolutionTrggier ? (
              <div>
                <span className="text-md font-bold">{evolutionTrggier}</span>
              </div>
            ) : (
              <></>
            )}

            {evolutionItem ? (
              <div>
                <span className="text-md font-bold">{evolutionItem}</span>
              </div>
            ) : (
              <></>
            )}

            {evolutionHeldItem ? (
              <div>
                <span className="text-md font-bold">{evolutionHeldItem}</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex justify-center items-center w-56 h-32">
        <div className="flex flex-col text-center">
          <span className="text-lg font-bold">{speciesName}</span>

          <Link
            className="block w-full h-full justify-center flex flex-col items-center"
            href={{
              pathname: `${src?.id}`,
            }}
          >
            <img
              src={src?.sprites?.front_default}
              alt="No Image"
              className="block w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>

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
  return (
    <div className="w-full px-5 flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl mb-6">EvolutionChart</h1>
      <div className="flex flex-col md:flex-row w-full justify-center items-center">
        {renderEvolution(pokemonEvolutionChainData, pokemonDetails, 1)}
      </div>
    </div>
  );
}
