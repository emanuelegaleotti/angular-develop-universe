import { NamedApiResource } from '../shared/pokeapi.utils';

export interface AbilityCreate {
  name: string;
}

export interface EffectEntry {
  effect: string;
  short_effect: string;
  language: NamedApiResource;
}

export interface AbilityPokemon {
  is_hidden: boolean;
  slot: number;
  pokemon: NamedApiResource;
}

export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: NamedApiResource;
  effect_entries: EffectEntry[];
  pokemon: AbilityPokemon[];
}
