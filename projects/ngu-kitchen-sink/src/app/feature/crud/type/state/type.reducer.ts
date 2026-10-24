import { createFeature, createReducer, on } from '@ngrx/store';
import { NamedApiResource } from '../../shared/pokeapi.utils';
import { PokeType } from '../type.model';
import { TypeActions } from './type.actions';

export interface TypeState {
  currentPage: number;
  pageSize: number;
  results: NamedApiResource[];
  count: number;
  searchTerm: string;
  selectedTypeName: string | null;
  selectedType: PokeType | null;
  typeToDelete: string | null;
}

const initialState: TypeState = {
  currentPage: 1,
  pageSize: 20,
  results: [],
  count: 0,
  searchTerm: '',
  selectedTypeName: null,
  selectedType: null,
  typeToDelete: null,
};

export const typeFeature = createFeature({
  name: 'type',
  reducer: createReducer(
    initialState,
    on(TypeActions.initTypeFeature, state => ({ ...state })),
    on(TypeActions.setPage, (state, { page }) => ({
      ...state,
      currentPage: page,
    })),
    on(TypeActions.setPageSize, (state, { pageSize }) => ({
      ...state,
      pageSize,
      currentPage: 1,
    })),
    on(TypeActions.setSearchTerm, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      currentPage: 1,
    })),
    on(TypeActions.selectType, (state, { name }) => ({
      ...state,
      selectedTypeName: name,
      selectedType: null,
    })),
    on(TypeActions.loadTypesSuccess, (state, { results, count }) => ({
      ...state,
      results,
      count,
    })),
    on(TypeActions.loadTypeSuccess, (state, { pokeType }) => ({
      ...state,
      selectedType: pokeType,
    })),
    on(TypeActions.deleteType, (state, { name }) => ({
      ...state,
      typeToDelete: name,
    })),
    on(TypeActions.deleteTypeSuccess, state => ({
      ...state,
      typeToDelete: null,
    })),
  ),
});
