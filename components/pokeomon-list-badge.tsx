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
    return (
      <Badge
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
