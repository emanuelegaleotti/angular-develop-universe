export const POKEAPI_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 20;

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface NamedApiResourceWithId extends NamedApiResource {
  id: number;
}

export interface PokeApiPage<T = NamedApiResource> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}


/** Extracts the numeric ID from a PokéAPI resource URL (e.g. https://pokeapi.co/api/v2/pokemon/1/). */
export function extractId(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}

/** Returns the official sprite URL for a Pokémon given its numeric ID. */
export function getPokemonSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
