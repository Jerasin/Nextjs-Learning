import getPathId from "@/utils/useQuery";
import React from "react";
import Badge from "./badge";

interface PokenmonMoveBadge {
  name: string;
  url: string;
}

interface PokenmonBadge {
  name: string;
  url: string;
}

interface PokenmonStatBadge {
  name: string;
  url: string;
}

interface PokenmonStatsBadge {
  base_stat: number;
  stat: PokenmonStatBadge;
}

interface PokenmonFormBadge {
  name: string;
  url: string;
}

interface PokenmonTypeBadge {
  type: { name: string; url: string };
}

interface PokenmonAbilityBadge {
  ability: { name: string; url: string };
}

interface PokenmonEvolveFromBadge {
  name: string;
  url: string;
}

interface BadgeProps {
  move?: PokenmonMoveBadge;
  pokemon?: PokenmonBadge;
  pokemonStats?: PokenmonStatsBadge;
  forms?: PokenmonFormBadge;
  types?: PokenmonTypeBadge;
  abilities?: PokenmonAbilityBadge;
  evolves_from_species?: PokenmonEvolveFromBadge;
}

export default function PokeomonListBadge(props: BadgeProps) {
  if (props.move != null) {
    const moveId = getPathId(props.move.url);
    return (
      <Badge
        key={props.move.name}
        name={props.move.name}
        url={props.move.url}
        pathname={`/move/${moveId}`}
      />
    );
  } else if (props.evolves_from_species != null) {
    const pokemonEvolveId = getPathId(props.evolves_from_species.url);
    return (
      <Badge
        key={props.evolves_from_species.name}
        name={props.evolves_from_species.name}
        url={props.evolves_from_species.url}
        pathname={`/pokemon/${pokemonEvolveId}`}
      />
    );
  } else if (props.pokemon != null) {
    const pokemonId = getPathId(props.pokemon.url);
    return (
      <Badge
        key={props.pokemon.name}
        name={props.pokemon.name}
        url={props.pokemon.url}
        pathname={`/pokemon/${pokemonId}`}
      />
    );
  } else if (props.pokemonStats != null) {
    const pokemonStatId = getPathId(props.pokemonStats.stat.url);
    return (
      <Badge
        key={props.pokemonStats.stat.name}
        name={props.pokemonStats.stat.name}
        url={props.pokemonStats.stat.url}
        pathname={`/pokemon/${pokemonStatId}`}
      />
    );
  } else if (props.forms != null) {
    const pokemonFormId = getPathId(props.forms.url);
    return (
      <Badge
        key={props.forms.name}
        name={props.forms.name}
        url={props.forms.url}
        pathname={`/pokemon-form/${pokemonFormId}`}
      />
    );
  } else if (props.types != null) {
    const pokemonTypeId = getPathId(props.types.type.url);
    const mappingColor: { [key: string]: string } = {
      normal: "mr-2 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#aa9;] cursor-pointer",
      fire: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#f42] cursor-pointer",
      fighting: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#b54] cursor-pointer",
      flying: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#89f] cursor-pointer",
      poison: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#a59] cursor-pointer",
      ground: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#db5] cursor-pointer",
      rock: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#ba6] cursor-pointer",
      bug: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#ab2] cursor-pointer",
      ghost: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#66b] cursor-pointer",
      steel: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#aab] cursor-pointer",
      water: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#39f] cursor-pointer",
      grass: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#7c5] cursor-pointer",
      electric: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#fc3] cursor-pointer",
      psychic: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#f59] cursor-pointer",
      ice: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#6cf] cursor-pointer",
      dragon: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#76e] cursor-pointer",
      dark: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#754] cursor-pointer",
      fairy: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#e9e] cursor-pointer",
      stellar: "mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset bg-[#aab] cursor-pointer",
    };

    return (
      <Badge
        customStyle={`${mappingColor[props.types.type.name]}`}
        key={props.types.type.name}
        name={props.types.type.name}
        url={props.types.type.url}
        pathname={`/type/${pokemonTypeId}`}
      />
    );
  } else if (props.abilities != null) {
    const pokemonAbilityId = getPathId(props.abilities.ability.url);
    return (
      <Badge
        key={props.abilities.ability.name}
        name={props.abilities.ability.name}
        url={props.abilities.ability.url}
        pathname={`/type/${pokemonAbilityId}`}
      />
    );
  }
}
