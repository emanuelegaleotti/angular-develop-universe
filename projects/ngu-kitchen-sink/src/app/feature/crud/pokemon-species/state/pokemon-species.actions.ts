import { createActionGroup, props } from '@ngrx/store';

export const PokemonSpeciesActions = createActionGroup({
  source: 'Pokemon Species',
  events: {
    'Set Page': props<{ page: number }>(),
    'Set Page Size': props<{ pageSize: number }>(),
    'Set Search Term': props<{ searchTerm: string }>(),
  },
});
