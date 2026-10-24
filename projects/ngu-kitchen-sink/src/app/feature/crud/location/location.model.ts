import { NamedApiResource } from '../shared/pokeapi.utils';

export interface Name {
  name: string;
  language: NamedApiResource;
}

export interface GenerationGameIndex {
  game_index: number;
  generation: NamedApiResource;
}

export interface LocationCreate {
  name: string;
}

export interface Location {
  id: number;
  name: string;
  region: NamedApiResource | null;
  names: Name[];
  areas: NamedApiResource[];
  game_indices: GenerationGameIndex[];
}
