import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { POKEAPI_URL, PAGE_SIZE, PokeApiPage, NamedApiResource } from '../shared/pokeapi.utils';
import { PokeType, PokeTypeCreate } from './type.model';

@Injectable({ providedIn: 'root' })
export class TypeService {
  private http = inject(HttpClient);

  getPage(page: number, limit = PAGE_SIZE, search?: string): Observable<PokeApiPage<NamedApiResource>> {
    const offset = (page - 1) * limit;
    return this.http.get<PokeApiPage<NamedApiResource>>(`${POKEAPI_URL}/type?limit=${limit}&offset=${offset}`);
  }

  getByName(name: string): Observable<PokeType> {
    return this.http.get<PokeType>(`${POKEAPI_URL}/type/${name}`);
  }

  create(payload: PokeTypeCreate): Observable<void> {
    return of(undefined);
  }

  update(payload: PokeTypeCreate): Observable<void> {
    return of(undefined);
  }

  delete(name: string): Observable<void> {
    return of(undefined);
  }
}
