import {inject} from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import {filter, map, Observable, of, switchMap} from 'rxjs';
import {Store} from "@ngrx/store";
import { CognitoSelectors } from 'src/lib/state/selectors'


export function checkRolesGuard(roles:string[],condition:'AND' | 'OR'): CanActivateFn {
  return (): Observable<boolean> => {
    const store = inject(Store)
    const router = inject(Router)
    return store
      .select(CognitoSelectors.selectRoles)
      .pipe(
        filter(u => !!u.length),
        map(() => store.select(CognitoSelectors.selectCheckRoles(roles, condition))),
        switchMap(p => {
          if (!p) {
            router.navigate(['403'])
            return of(false)
          }
          return p
        })
      )
  }
}

