import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { POKEAPI_URL, PAGE_SIZE, PokeApiPage, NamedApiResource } from '../shared/pokeapi.utils';
import { PokemonSpecies, PokemonSpeciesCreate } from './pokemon-species.model';

@Injectable({ providedIn: 'root' })
export class PokemonSpeciesService {
  private http = inject(HttpClient);

  getPage(page: number, limit = PAGE_SIZE, search?: string): Observable<PokeApiPage<NamedApiResource>> {
    const offset = (page - 1) * limit;
    return this.http.get<PokeApiPage<NamedApiResource>>(`${POKEAPI_URL}/pokemon-species?limit=${limit}&offset=${offset}`);
  }

  getByName(name: string): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${POKEAPI_URL}/pokemon-species/${name}`);
  }

  create(payload: PokemonSpeciesCreate): Observable<void> {
    return of(undefined);
  }

  update(payload: PokemonSpeciesCreate): Observable<void> {
    return of(undefined);
  }

  delete(name: string): Observable<void> {
    return of(undefined);
  }
}
