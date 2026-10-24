import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NamedApiResource } from '../../shared/pokeapi.utils';
import { PokeType, PokeTypeCreate } from '../type.model';

export const TypeActions = createActionGroup({
  source: 'Type',
  events: {
    'Init Type Feature': emptyProps(),
    'Set Page': props<{ page: number }>(),
    'Set Page Size': props<{ pageSize: number }>(),
    'Set Search Term': props<{ searchTerm: string }>(),
    'Select Type': props<{ name: string }>(),
    'Delete Type': props<{ name: string }>(),
    'Delete Type Success': emptyProps(),
    'Create Type': props<{ payload: PokeTypeCreate }>(),
    'Create Type Success': emptyProps(),
    'Update Type': props<{ payload: PokeTypeCreate }>(),
    'Update Type Success': emptyProps(),
    'Load Types Success': props<{ results: NamedApiResource[]; count: number }>(),
    'Load Type Success': props<{ pokeType: PokeType }>(),
  },
});
