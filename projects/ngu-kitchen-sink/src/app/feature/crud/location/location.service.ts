import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { POKEAPI_URL, PAGE_SIZE, PokeApiPage, NamedApiResource } from '../shared/pokeapi.utils';
import { Location, LocationCreate } from './location.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private http = inject(HttpClient);

  getPage(page: number, limit = PAGE_SIZE, search?: string): Observable<PokeApiPage<NamedApiResource>> {
    const offset = (page - 1) * limit;
    void search;
    return this.http.get<PokeApiPage<NamedApiResource>>(`${POKEAPI_URL}/location?limit=${limit}&offset=${offset}`);
  }

  getByName(name: string): Observable<Location> {
    return this.http.get<Location>(`${POKEAPI_URL}/location/${name}`);
  }

  create(payload: LocationCreate): Observable<Location> {
    void payload;
    return of({} as Location);
  }

  update(payload: LocationCreate): Observable<Location> {
    void payload;
    return of({} as Location);
  }

  delete(name: string): Observable<void> {
    void name;
    return of(undefined);
  }
}
