import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, switchMap, tap, withLatestFrom} from 'rxjs';
import {TypeService} from '../type.service';
import {TypeActions} from './type.actions';
import {selectCurrentPage, selectPageSize, selectSearchTerm} from './type.selectors';

const loadTypes$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), typeService = inject(TypeService)) =>
    actions$.pipe(
      ofType(
        TypeActions.initTypeFeature,
        TypeActions.setPage,
        TypeActions.setPageSize,
        TypeActions.setSearchTerm,
        TypeActions.deleteTypeSuccess,
        TypeActions.createTypeSuccess,
        TypeActions.updateTypeSuccess,
      ),
      withLatestFrom(
        store.select(selectCurrentPage),
        store.select(selectPageSize),
        store.select(selectSearchTerm)
      ),
      switchMap(([, page, pageSize, search]) =>
        typeService.getPage(page, pageSize, search).pipe(
          map(response =>
            TypeActions.loadTypesSuccess({results: response.results, count: response.count}),
          ),
        ),
      ),
    ),
  {functional: true},
);

const loadType$ = createEffect(
  (actions$ = inject(Actions), typeService = inject(TypeService)) =>
    actions$.pipe(
      ofType(TypeActions.selectType),
      switchMap(({name}) =>
        typeService.getByName(name).pipe(
          map(pokeType => TypeActions.loadTypeSuccess({pokeType})),
        ),
      ),
    ),
  {functional: true},
);

const deleteType$ = createEffect(
  (actions$ = inject(Actions), typeService = inject(TypeService)) =>
    actions$.pipe(
      ofType(TypeActions.deleteType),
      switchMap(({name}) =>
        typeService.delete(name).pipe(
          map(() => TypeActions.deleteTypeSuccess()),
        ),
      ),
    ),
  {functional: true},
);

const createType$ = createEffect(
  (actions$ = inject(Actions), typeService = inject(TypeService)) =>
    actions$.pipe(
      ofType(TypeActions.createType),
      switchMap(({payload}) =>
        typeService.create(payload).pipe(
          map(() => TypeActions.createTypeSuccess()),
        ),
      ),
    ),
  {functional: true},
);

const updateType$ = createEffect(
  (actions$ = inject(Actions), typeService = inject(TypeService)) =>
    actions$.pipe(
      ofType(TypeActions.updateType),
      switchMap(({payload}) =>
        typeService.update(payload).pipe(
          map(() => TypeActions.updateTypeSuccess()),
        ),
      ),
    ),
  {functional: true},
);

const navigateAfterSave$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(TypeActions.createTypeSuccess, TypeActions.updateTypeSuccess),
      tap(() => router.navigate(['/crud/type'])),
    ),
  {functional: true, dispatch: false},
);

export const TypeEffects = {loadTypes$, loadType$, deleteType$, createType$, updateType$, navigateAfterSave$};
