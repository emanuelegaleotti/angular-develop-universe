import { Starship } from './starship.model'

export class Swapi {
  constructor (
    public count: number,
    public previous: string,
    public results: Starship[],
    public next: string
  ) { }
}
