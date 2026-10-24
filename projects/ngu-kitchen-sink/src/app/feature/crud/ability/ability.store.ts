import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface AbilityStoreState {
  currentPage: number;
  pageSize: number;
  searchTerm: string;
}

const initialState: AbilityStoreState = {
  currentPage: 1,
  pageSize: 20,
  searchTerm: '',
};

export const AbilityStore = signalStore(
  withState(initialState),
  withMethods(store => ({
    setPage(page: number): void {
      patchState(store, { currentPage: page });
    },
    setPageSize(pageSize: number): void {
      patchState(store, { pageSize, currentPage: 1 });
    },
    setSearchTerm(searchTerm: string): void {
      patchState(store, { searchTerm });
    },
  })),
);
