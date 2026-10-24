import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { delay, of, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor (
    private http: HttpClient,
  ) {}

  getStarships () {
    return this.http.get('https://swapi.dev/api/starships')
  }

  getNoLoaderStarships () {
    return this.http.get('https://swapi.dev/api/starships', { headers: { 'No-Loader': 'true' } })
  }

  getNoLoaderPlanets () {
    return this.http.get('https://swapi.dev/api/planets')
  }
}
