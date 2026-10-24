import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { pokemonSpeciesFeature } from './pokemon-species/state/pokemon-species.reducer';
import { typeFeature } from './type/state/type.reducer';
import { TypeEffects } from './type/state/type.effects';
import { AbilityStore } from './ability/ability.store';

export const CRUD_ROUTES: Routes = [
  {
    path: 'pokemon',
    loadComponent: () =>
      import('./pokemon/pokemon/pokemon.component').then(m => m.PokemonComponent),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () =>
      import('./pokemon/pokemon-edit/pokemon-edit.component').then(m => m.PokemonEditComponent),
  },
  {
    path: 'pokemon-species',
    providers: [provideState(pokemonSpeciesFeature)],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pokemon-species/pokemon-species/pokemon-species.component').then(
            m => m.PokemonSpeciesComponent,
          ),
      },
      {
        path: ':name',
        loadComponent: () =>
          import('./pokemon-species/pokemon-species-edit/pokemon-species-edit.component').then(
            m => m.PokemonSpeciesEditComponent,
          ),
      },
    ],
  },
  {
    path: 'type',
    providers: [provideState(typeFeature), provideEffects(TypeEffects)],
    children: [
      {
        path: '',
        loadComponent: () => import('./type/types/types.component').then(m => m.TypesComponent),
      },
      {
        path: ':name',
        loadComponent: () => import('./type/type-edit/type-edit.component').then(m => m.TypeEditComponent),
      },
    ],
  },
  {
    path: 'ability',
    providers: [AbilityStore],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ability/abilities/abilities.component').then(m => m.AbilitiesComponent),
      },
      {
        path: ':name',
        loadComponent: () =>
          import('./ability/ability-edit/ability-edit.component').then(m => m.AbilityEditComponent),
      },
    ],
  },
  {
    path: 'location',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./location/locations/locations.component').then(m => m.LocationsComponent),
      },
      {
        path: ':name',
        loadComponent: () =>
          import('./location/location-edit/location-edit.component').then(m => m.LocationEditComponent),
      },
    ],
  },
];
