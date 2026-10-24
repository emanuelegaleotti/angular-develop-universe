import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { POKEAPI_URL, PAGE_SIZE, PokeApiPage, NamedApiResource, extractId, getPokemonSpriteUrl } from '../shared/pokeapi.utils';
import { Pokemon, PokemonCreate, PokemonListItem } from './pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);

  getPage(page: number, limit = PAGE_SIZE, search?: string): Observable<PokeApiPage<PokemonListItem>> {
    const offset = (page - 1) * limit;
    return this.http.get<PokeApiPage<NamedApiResource>>(`${POKEAPI_URL}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      map(response => ({
        ...response,
        results: response.results.map(r => ({
          ...r,
          spriteUrl: getPokemonSpriteUrl(extractId(r.url))
        })) as PokemonListItem[],
      }))
    );
  }

  getByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${POKEAPI_URL}/pokemon/${name}`);
  }

  create(_payload: PokemonCreate): Observable<void> {
    return of(undefined);
  }

  update(_payload: PokemonCreate): Observable<void> {
    return of(undefined);
  }

  delete(_name: string): Observable<void> {
    return of(undefined);
  }
}
