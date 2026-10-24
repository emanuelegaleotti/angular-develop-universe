import { effect, inject, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { NamedApiResource } from '../shared/pokeapi.utils';
import { Location, LocationCreate } from './location.model';
import { LocationService } from './location.service';

export interface LocationStoreState {
  currentPage: number;
  pageSize: number;
  results: NamedApiResource[];
  count: number;
  searchTerm: string;
  selectedLocationName: string | null;
  selectedLocation: Location | null;
  locationToDelete: string | null;
  locationToCreate: LocationCreate | null;
  locationToUpdate: LocationCreate | null;
}

const initialState: LocationStoreState = {
  currentPage: 1,
  pageSize: 20,
  results: [],
  count: 0,
  searchTerm: '',
  selectedLocationName: null,
  selectedLocation: null,
  locationToDelete: null,
  locationToCreate: null,
  locationToUpdate: null,
};

export const LocationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => ({
    setPage(page: number): void {
      patchState(store, { currentPage: page });
    },
    setPageSize(pageSize: number): void {
      patchState(store, { pageSize, currentPage: 1 });
    },
    setSearchTerm(searchTerm: string): void {
      patchState(store, { searchTerm, currentPage: 1 });
    },
    setLocationToDelete(name: string | null): void {
      patchState(store, { locationToDelete: name });
    },
    selectLocation(name: string | null): void {
      patchState(store, { selectedLocationName: name, selectedLocation: null });
    },
    createLocation(payload: LocationCreate): void {
      patchState(store, { locationToCreate: payload });
    },
    updateLocation(payload: LocationCreate): void {
      patchState(store, { locationToUpdate: payload });
    },
  })),
  withHooks(store => {
    const locationService = inject(LocationService);
    const router = inject(Router);

    function getLocations(): void {
      locationService
        .getPage(store.currentPage(), store.pageSize(), store.searchTerm())
        .subscribe(data => patchState(store, { results: data.results, count: data.count }));
    }

    return {
      onInit() {
        effect(() => {
          store.currentPage();
          store.pageSize();
          store.searchTerm();
          untracked(() => getLocations());
        });
        effect(() => {
          const name = store.selectedLocationName();
          if (name) {
            untracked(() =>
              locationService
                .getByName(name)
                .subscribe(loc => patchState(store, { selectedLocation: loc }))
            );
          }
        });
        effect(() => {
          const name = store.locationToDelete();
          if (name) {
            untracked(() =>
              locationService.delete(name).subscribe(() => {
                patchState(store, { locationToDelete: null });
                getLocations();
              })
            );
          }
        });
        effect(() => {
          const payload = store.locationToCreate();
          if (payload) {
            untracked(() =>
              locationService.create(payload).subscribe(() => {
                patchState(store, { locationToCreate: null });
                getLocations();
                router.navigate(['/crud/location']);
              })
            );
          }
        });
        effect(() => {
          const payload = store.locationToUpdate();
          if (payload) {
            untracked(() =>
              locationService.update(payload).subscribe(() => {
                patchState(store, { locationToUpdate: null });
                getLocations();
                router.navigate(['/crud/location']);
              })
            );
          }
        });
      },
    };
  }),
);
