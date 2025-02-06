export interface PokemonStatsList {
  base_stat: number;
  stat: PokemonStat;
}

export interface PokemonStat {
  name: string;
  url: string;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonTypes {
  count: number;
  results: PokemonType[];
}

export interface PokemonSpecyDetail {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: Color[];
  evolution_chain: Evolutionchain;
  evolves_from_species: Color;
  flavor_text_entries: Flavortextentry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Color;
  growth_rate: Color;
  habitat: Color;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: Palparkencounter[];
  pokedex_numbers: Pokedexnumber[];
  shape: Color;
  varieties: Variety[];
}

interface Variety {
  is_default: boolean;
  pokemon: Color;
}

interface Pokedexnumber {
  entry_number: number;
  pokedex: Color;
}

interface Palparkencounter {
  area: Color;
  base_score: number;
  rate: number;
}

interface Name {
  language: Color;
  name: string;
}

interface Genus {
  genus: string;
  language: Color;
}

interface Flavortextentry {
  flavor_text: string;
  language: Color;
  version: Color;
}

interface Evolutionchain {
  url: string;
}

interface Color {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  forms: Array<{ name: string; url: string }>;
  moves: Array<{ move: { name: string; url: string } }>;
  stats: Array<PokemonStatsList>;
  types: Array<{ type: { name: string; url: string } }>;
  sprites?: {
    front_default: string;
  };
  abilities: Array<{
    ability: { name: string; url: string; is_hidden: boolean; slot: number };
  }>;
  species: {
    name: string;
    url: string;
  };
}

// export interface PokemonTypeDetail {
//   id: number;
//   name: string;
//   pokemon: Array<{ pokemon: { name: string; url: string } }>;
//   moves: Array<{ move: { name: string; url: string } }>;
//   move_damage_class: { name: string; url: string };
//   damage_relations: {
//     double_damage_from: Array<{ pokemon: { name: string; url: string } }>;
//     double_damage_to: Array<{ pokemon: { name: string; url: string } }>;
//     half_damage_from: Array<{ pokemon: { name: string; url: string } }>;
//     half_damage_to: Array<{ pokemon: { name: string; url: string } }>;
//     no_damage_from: Array<{ pokemon: { name: string; url: string } }>;
//     no_damage_to: Array<{ pokemon: { name: string; url: string } }>;
//   };
// }

export interface PokemonTypeDetail {
  id: number;
  name: string;
  pokemon: Array<{ pokemon: { name: string; url: string } }>;
  moves: Array<{ move: { name: string; url: string } }>;
  move_damage_class: { name: string; url: string };
  damage_relations: {
    double_damage_from: Array<{ name: string; url: string }>;
    double_damage_to: Array<{ name: string; url: string }>;
    half_damage_from: Array<{ name: string; url: string }>;
    half_damage_to: Array<{ name: string; url: string }>;
    no_damage_from: Array<{ name: string; url: string }>;
    no_damage_to: Array<{ name: string; url: string }>;
  };
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface ReponseApiPokemon {
  count: number;
  results: Pokemon[];
}

export interface EvolutionChain {
  baby_trigger_item?: any;
  chain: Chain;
  id: number;
}

export interface Chain {
  evolution_details: any[];
  evolves_to: Evolvesto[];
  is_baby: boolean;
  species: Trigger;
}

// export interface Evolvesto2 {
//   evolution_details: Evolutiondetail[];
//   evolves_to: Evolvesto[];
//   is_baby: boolean;
//   species: Trigger;
// }

export interface Evolvesto {
  evolution_details: Evolutiondetail[];
  evolves_to: Evolvesto[];
  is_baby: boolean;
  species: Trigger;
}

interface Evolutiondetail {
  gender?: any;
  held_item?: any;
  item?: any;
  known_move?: any;
  known_move_type?: any;
  location?: any;
  min_affection?: any;
  min_beauty?: any;
  min_happiness?: any;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species?: any;
  party_type?: any;
  relative_physical_stats?: any;
  time_of_day: string;
  trade_species?: any;
  trigger: Trigger;
  turn_upside_down: boolean;
}

export interface Trigger {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface ReponseApiPokemon {
  count: number;
  results: Pokemon[];
}

export interface PokemonTypeRelation {
  name: string;
  value: string;
  url: string;
}
