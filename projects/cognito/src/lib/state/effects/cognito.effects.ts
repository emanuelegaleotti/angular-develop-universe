import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import { CognitoActions } from '../actions/cognito.actions'
import { catchError, concat, delay, exhaustMap, map, of, switchMap, } from 'rxjs'
import { CognitoService } from '../../cognito.service'

@Injectable()
export class CognitoEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CognitoActions.login),
      exhaustMap(() => this.cognitoService.login().pipe(
        map((r) => {
          return CognitoActions.is_authenticated()
        })
      )),
      catchError((e) => {
        console.log(e)
        return of(CognitoActions.is_not_authenticated())
      })
    )
  })
  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CognitoActions.is_authenticated),
      exhaustMap(() => this.cognitoService.getUser().pipe(
        map((u) => CognitoActions.store_user({ u }))
      ))
    )
  })
  getRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CognitoActions.store_user),
      exhaustMap(() => this.cognitoService.getRoles().pipe(
        map((r) => CognitoActions.store_roles({ r }))
      ))
    )
  })
  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CognitoActions.logout),
      exhaustMap(() => this.cognitoService.logout().pipe(
        switchMap(() => [
          CognitoActions.is_not_authenticated(),
          CognitoActions.clear_user(),
          CognitoActions.clear_roles()
        ])
      ))
    )
  })

  constructor (
    private readonly actions$: Actions,
    private readonly cognitoService: CognitoService
  ) {
  }
}

@Injectable()
export class LoginRequiredEffects {
  loginRequired$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      delay(0),
      exhaustMap(() => this.cognitoService.checkLogin().pipe(
        map((r) => {
          if (r.tokens) {
            return CognitoActions.is_authenticated()
          }
          return CognitoActions.login()
        })
      )),
      catchError((e) => {
          return concat([
            CognitoActions.is_not_authenticated(),
            CognitoActions.login()
          ])
        }
      )
    )
  })

  constructor (
    private readonly actions$: Actions,
    private readonly cognitoService: CognitoService
  ) {
  }
}

@Injectable()
export class CheckLoginEffects {
  checkLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() => this.cognitoService.checkLogin().pipe(
        map((r) => {
          if (r.tokens) {
            return CognitoActions.is_authenticated()
          }
          return CognitoActions.is_not_authenticated()
        })
      )),
      catchError(() => of(CognitoActions.is_not_authenticated()))
    )
  })

  constructor (
    private readonly actions$: Actions,
    private readonly cognitoService: CognitoService
  ) {
  }
}
