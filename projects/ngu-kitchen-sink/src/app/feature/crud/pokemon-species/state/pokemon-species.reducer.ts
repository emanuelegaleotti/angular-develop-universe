import { createFeature, createReducer, on } from '@ngrx/store';
import { PokemonSpeciesActions } from './pokemon-species.actions';

export interface PokemonSpeciesState {
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  name:string
}

const initialState: PokemonSpeciesState = {
  currentPage: 1,
  pageSize: 20,
  searchTerm: '',
  name: '',
};

export const pokemonSpeciesFeature = createFeature({
  name: 'pokemonSpecies',
  reducer: createReducer(
    initialState,
    on(PokemonSpeciesActions.setPage, (state, { page }) => ({
      ...state,
      currentPage: page,
    })),
    on(PokemonSpeciesActions.setPageSize, (state, { pageSize }) => ({
      ...state,
      currentPage: 1,
      pageSize,
    })),
    on(PokemonSpeciesActions.setSearchTerm, (state, { searchTerm }) => ({
      ...state,
      currentPage: 1,
      searchTerm,
    })),
  ),
});
