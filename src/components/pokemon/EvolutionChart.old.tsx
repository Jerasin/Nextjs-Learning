import { EvolutionChain, Evolvesto, PokemonDetail } from "@/interfaces/pokemon";
import { getPathId } from "@/utils/useQuery";
import React from "react";

interface EvolutionChartProps {
  data: EvolutionChain;
  currentPokemonId: number;
  currentImg: string;
  pokemonDetails: PokemonDetail[];
}

const renderLoading = () => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-start p-5 lg:p-10">
      <h1
        className="mb-14 text-start text-3xl font-bold
    tracking-widest"
      >
        {" "}
        Loading...
      </h1>
    </main>
  );
};

const recursiveEvolutionChain = (
  data: Evolvesto[],
  currentPokemonId: number,
  currentImg: string,
  pokemonDetails: PokemonDetail[]
) => {
  return data.map((item) => {
    const query = getPathId(item?.species?.url);

    if (query == null) {
      return;
    }

    const id = parseInt(query);

    let imgSrc = null;

    if (currentPokemonId != id) {
      imgSrc = pokemonDetails?.find((item) => item.id == id)?.sprites
        ?.front_default;
    }

    return (
      <div className="flex sm:flex-row flex-col" key={item.species.name}>
        <div className="p-12 text-center">
          <h1>{item.species.name}</h1>
          {currentPokemonId == id ? (
            <img
              className="w-full"
              src={`${currentImg}`}
              alt="Image Not Found"
            />
          ) : (
            <img className="w-full" src={`${imgSrc}`} alt="Image Not Found" />
          )}
        </div>

        {item.evolves_to.length > 0 &&
          recursiveEvolutionChain(
            item.evolves_to,
            currentPokemonId,
            currentImg,
            pokemonDetails
          )}
      </div>
    );
  });
};

const renderData = (props: EvolutionChartProps) => {
  const { data, currentImg, currentPokemonId, pokemonDetails } = props ?? {};
  const query = getPathId(data?.chain?.species?.url);

  if (query == null) {
    return renderLoading();
  }

  const id = parseInt(query);

  let imgSrc = null;

  if (currentPokemonId != id) {
    imgSrc = pokemonDetails?.find((item) => item.id == id)?.sprites
      ?.front_default;
  }

  return (
    <div className="w-full  flex sm:flex-row flex-col">
      {data?.chain?.species?.name != null ? (
        <div className="p-12 text-center">
          <h1>{data?.chain?.species?.name}</h1>

          {currentPokemonId == id ? (
            <img
              className="w-full"
              src={`${currentImg}`}
              alt="Image Not Found"
            />
          ) : (
            <img className="w-full" src={`${imgSrc}`} alt="Image Not Found" />
          )}
        </div>
      ) : (
        <></>
      )}

      {data?.chain.evolves_to.length > 0 ? (
        recursiveEvolutionChain(
          data?.chain.evolves_to,
          currentPokemonId,
          currentImg,
          pokemonDetails
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default function EvolutionChart(props: EvolutionChartProps) {
  return renderData(props);
}
