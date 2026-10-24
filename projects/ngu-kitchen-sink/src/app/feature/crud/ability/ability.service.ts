import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { POKEAPI_URL, PAGE_SIZE, PokeApiPage, NamedApiResource } from '../shared/pokeapi.utils';
import { Ability, AbilityCreate } from './ability.model';

@Injectable({ providedIn: 'root' })
export class AbilityService {
  private http = inject(HttpClient);

  getPage(page: number, limit = PAGE_SIZE, search?: string): Observable<PokeApiPage<NamedApiResource>> {
    const offset = (page - 1) * limit;
    return this.http.get<PokeApiPage<NamedApiResource>>(`${POKEAPI_URL}/ability?limit=${limit}&offset=${offset}`);
  }

  getByName(name: string): Observable<Ability> {
    return this.http.get<Ability>(`${POKEAPI_URL}/ability/${name}`);
  }

  create(payload: AbilityCreate): Observable<Ability> {
    return of({} as Ability);
  }

  update(payload: AbilityCreate): Observable<Ability> {
    return of({} as Ability);
  }

  delete(name: string): Observable<void> {
    return of(undefined);
  }
}
