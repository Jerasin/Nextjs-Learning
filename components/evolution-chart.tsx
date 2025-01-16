import { Chain, Evolvesto, PokemonDetail } from "@/interfaces/pokemon";
import Link from "next/link";
import React from "react";
import LoadingPage from "./loading-page";
import getPathId from "@/utils/useQuery";
import FailedPage from "./failed-page";
import Image from "next/image";

interface EvolutionChartProps {
  pokemonEvolutionChainData: Chain;
  pokemonDetails: PokemonDetail[];
}

const renderLoading = () => {
  return LoadingPage();
};

function toPascalCase(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+|\-|\_)/g, (match, index) =>
      match.toUpperCase()
    ) // เปลี่ยนตัวแรกของคำเป็นตัวพิมพ์ใหญ่
    .replace(/\s+/g, "") // ลบช่องว่าง
    .replace(/(?:^[\W_]+|[\W_]+$)/g, ""); // ลบอักขระพิเศษและ _ ที่อยู่ขอบของคำ
}

const renderEvolution = (
  chain: Evolvesto,
  pokemonDetails: PokemonDetail[],
  count: number,
  borefoeEvolutionLength: number
) => {
  const speciesName = chain.species.name;
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
  const min_happiness =
    chain.evolution_details.length > 0
      ? chain?.evolution_details[0]?.min_happiness ?? null
      : null;
  const time_of_day =
    chain.evolution_details.length > 0
      ? chain?.evolution_details[0]?.time_of_day ?? null
      : null;

  let evolutionItem =
    chain.evolution_details.length > 0
      ? chain?.evolution_details[0]?.item?.name ?? null
      : null;

  if (chain.evolution_details.length > 1) {
    const findItems = chain?.evolution_details.filter((i) => i.item);
    if (findItems.length > 0) {
      evolutionItem = findItems[0].item?.name;
    }
  }
  const imageWidthSize = 100;
  const imageHighSize = 100;
  const id = getPathId(chain.species.url);

  if (id == null) {
    <FailedPage />;
    return;
  }

  const src = pokemonDetails.find((item) => item.id == parseInt(id));
  const condition = count > 1 && evolutionTrggier;
  let containerText = `flex flex-col justify-center text-center w- 2xl:min-w-56 2xl:min-h-32`;
  let containerForm = `flex justify-center 2xl:min-w-56 2xl:min-h-32 items-center`;
  let rootEle = "w-46 sm:w-52 2xl:w-auto flex flex-col items-center mx-5 2xl:mx-0 2xl:flex-row";
  let containerChainEvo = "flex flex-row 2xl:flex-col items-center";

  if (count == 1 && chain.evolves_to.length > 1) {
    rootEle = "flex flex-row items-center";
    containerChainEvo = "flex flex-col items-center";
  } else if (count > 1 && borefoeEvolutionLength > 1) {
    rootEle = "flex flex-row items-center";
    containerText = `flex flex-col justify-center text-center`;
    containerForm = `flex justify-center 2xl:min-w-32 2xl:min-w-56 items-center`;
  } else if (borefoeEvolutionLength > 1) {
    containerChainEvo = "flex flex-col items-center";
  }

  return (
    <div className={rootEle}>
      {condition && borefoeEvolutionLength == 1 && (
        <div className={containerText}>
          {count > 1 ? (
            <div className="2xl:block hidden">
              <i className="fa-solid fa-arrow-right"></i>{" "}
            </div>
          ) : (
            <></>
          )}

          {count > 1 ? (
            <div className="2xl:hidden">
              <i className="fa-solid fa-arrow-down"></i>{" "}
            </div>
          ) : (
            <></>
          )}

          <div className="w-auto">
            {min_level ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">{min_level}</span>
              </div>
            ) : (
              <></>
            )}

            {evolutionTrggier ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">{evolutionTrggier}</span>
              </div>
            ) : (
              <></>
            )}

            {evolutionItem ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">{evolutionItem}</span>
              </div>
            ) : (
              <></>
            )}

            {evolutionHeldItem ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">{evolutionHeldItem}</span>
              </div>
            ) : (
              <></>
            )}

            {min_happiness ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">
                  happiness: {min_happiness}
                </span>
              </div>
            ) : (
              <></>
            )}

            {time_of_day ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">
                  happiness: {time_of_day}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}

      {condition && borefoeEvolutionLength > 1 && (
        <div className={containerText}>
          {count > 1 ? (
            <div className="block">
              <i className="fa-solid fa-arrow-right"></i>{" "}
            </div>
          ) : (
            <></>
          )}

          <div className="w-auto">
            {min_level ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">{min_level}</span>
              </div>
            ) : (
              <></>
            )}

            {evolutionTrggier ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">{evolutionTrggier}</span>
              </div>
            ) : (
              <></>
            )}

            {evolutionItem ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">{evolutionItem}</span>
              </div>
            ) : (
              <></>
            )}

            {evolutionHeldItem ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">{evolutionHeldItem}</span>
              </div>
            ) : (
              <></>
            )}

            {min_happiness ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">
                  happiness: {min_happiness}
                </span>
              </div>
            ) : (
              <></>
            )}

            {time_of_day ? (
              <div>
                <span className="text-xs 2xl:text-md 2xl:font-bold">
                  time: {toPascalCase(`${time_of_day}time`)}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}

      {count == 1 && chain.evolves_to.length == 1 && (
        <div className={containerForm}>
          <div className="flex flex-col text-center">
            <span className="text-lg font-bold">{speciesName}</span>

            <Link
              className="block justify-center flex flex-col items-center"
              href={{
                pathname: `${src?.id}`,
              }}
            >
              <Image
                className="block object-cover"
                src={src?.sprites?.front_default || "/images/placeholder.png"} // ใช้ค่าที่มีอยู่หรือ placeholder ถ้าไม่มี
                alt="Image Not Found"
                width={imageWidthSize} // กำหนด width ที่ต้องการ
                height={imageHighSize} // กำหนด height ที่ต้องการ
              />
            </Link>
          </div>
        </div>
      )}

      {count == 1 && chain.evolves_to.length > 1 && (
        <div className="flex flex-col min-w-32 2xl:min-w-56">
          {chain.evolves_to.map((v, i) => {
            return (
              <div className="flex flex-col text-center" key={i}>
                <span className="text-lg font-bold">{speciesName}</span>

                <Link
                  className="justify-center flex flex-col items-center"
                  href={{
                    pathname: `${src?.id}`,
                  }}
                >
                  <Image
                    className="block  object-cover"
                    src={
                      src?.sprites?.front_default || "/images/placeholder.png"
                    } // ใช้ค่าที่มีอยู่หรือ placeholder ถ้าไม่มี
                    alt="Image Not Found"
                    width={imageWidthSize} // กำหนด width ที่ต้องการ
                    height={imageHighSize} // กำหนด height ที่ต้องการ
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {count != 1 && (
        <div className={containerForm}>
          <div className="flex flex-col text-center">
            <span className="text-lg font-bold">{speciesName}</span>

            <Link
              className="block justify-center flex flex-col items-center"
              href={{
                pathname: `${src?.id}`,
              }}
            >
              <Image
                className="block object-cover"
                src={src?.sprites?.front_default || "/images/placeholder.png"} // ใช้ค่าที่มีอยู่หรือ placeholder ถ้าไม่มี
                alt="Image Not Found"
                width={imageWidthSize} // กำหนด width ที่ต้องการ
                height={imageHighSize} // กำหนด height ที่ต้องการ
              />
            </Link>
          </div>
        </div>
      )}

      {chain.evolves_to.length == 1 && (
        <div className="w-auto flex flex-row 2xl:flex-col items-center">
          {chain.evolves_to.map((evolution: Evolvesto, index: number) => (
            <div key={index} className="w-auto flex flex-col items-center">
              {renderEvolution(
                evolution,
                pokemonDetails,
                (count += 1),
                chain.evolves_to.length
              )}
            </div>
          ))}
        </div>
      )}

      {chain.evolves_to.length > 1 && (
        <div className={containerChainEvo}>
          {chain.evolves_to.map((evolution: Evolvesto, index: number) => (
            <div key={index} className="flex flex-row items-center">
              {renderEvolution(
                evolution,
                pokemonDetails,
                (count += 1),
                borefoeEvolutionLength
              )}
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
    <div className="w-auto px-5 flex flex-col justify-center items-center">
      <div className="my-12">
        <h1 className="font-bold text-3xl mb-6">EvolutionChart</h1>
      </div>
      <div className="flex flex-col md:flex-row w-auto justify-center items-center">
        {renderEvolution(
          pokemonEvolutionChainData,
          pokemonDetails,
          1,
          pokemonEvolutionChainData.evolves_to.length
        )}
      </div>
    </div>
  );
}
