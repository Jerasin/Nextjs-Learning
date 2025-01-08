import { EvolutionChain, Evolvesto, PokemonDetail } from "@/interfaces/pokemon";
import { getPathId } from "@/utils/useQuery";
import React from "react";

interface EvolutionChartProps {
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
  const { pokemonDetails } = props ?? {};

  if (pokemonDetails == null) {
    return renderLoading();
  }

  console.log("pokemonDetails", pokemonDetails);

  return pokemonDetails.map((item, index) => {
    const allIndex = pokemonDetails.length - 1;
    return (
      <div
        className="flex sm:flex-row flex-col items-center justify-center"
        key={item.name}
      >
        <div className="block px-12 py-2 text-center">
          <h1>{item.name}</h1>

          {/* <div className="flex">
            <img
              className="w-full"
              src={`${item.sprites?.front_default}`}
              alt="Image Not Found"
            />

            {index < allIndex ? <div>{"--->"}</div> : <></>}
          </div> */}
          <img
            className="w-full h-full"
            src={`${item.sprites?.front_default}`}
            alt="Image Not Found"
          />
        </div>

        <div className="sm:block hidden">
          {index < allIndex ?  <i className="fas fa-arrow-right"></i> : <></>}
        </div>

        <div className="sm:hidden">
          {index < allIndex ?  <i className="fas fa-arrow-down"></i> : <></>}
        </div>

       
      </div>
    );
  });
};

export default function EvolutionChart(props: EvolutionChartProps) {
  return renderData(props);
}
