import { computed, effect, inject } from '@angular/core'
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { catchError, EMPTY, map, pipe, switchMap } from 'rxjs'
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular'
import { KeycloakAuthService } from '../keycloak-auth.service'

export interface KeycloakState {
  isAuthenticated: boolean
  user: any | null
  roles: string[]
}

const initialState: KeycloakState = {
  isAuthenticated: false,
  user: null,
  roles: []
}

export const KeycloakStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    checkRoles: computed(() => (roles: string[], condition: 'AND' | 'OR'): boolean => {
      const r = store.roles()
      if (condition === 'AND') {
        return roles.map(role => r.includes(role)).every(Boolean)
      }
      return roles.map(role => r.includes(role)).some(Boolean)
    }),
  })),

  withMethods((store, authService = inject(KeycloakAuthService)) => ({

    storeRoles(roles: string[]): void {
      patchState(store, { roles })
    },

    clearRoles(): void {
      patchState(store, { roles: [] })
    },

    /** Esegue il redirect al login Keycloak e aggiorna lo store */
    login: rxMethod<void>(
      pipe(
        switchMap(() => authService.login().pipe(
          map(() => patchState(store, {
            isAuthenticated: true,
            user: authService.getUser(),
            roles: authService.getRoles()
          })),
          catchError((e: unknown) => {
            console.error(e)
            patchState(store, { isAuthenticated: false, user: null, roles: [] })
            return EMPTY
          })
        ))
      )
    ),

    /** Esegue il logout Keycloak e pulisce lo store */
    logout: rxMethod<void>(
      pipe(
        switchMap(() => authService.logout().pipe(
          map(() => patchState(store, { isAuthenticated: false, user: null, roles: [] })),
          catchError((e: unknown) => {
            console.error(e)
            return EMPTY
          })
        ))
      )
    ),
  })),

  /**
   * All'inizializzazione del store ascolta KEYCLOAK_EVENT_SIGNAL:
   * quando Keycloak emette Ready sincronizza lo stato di autenticazione.
   * La modalità di login (check-sso / login-required) è gestita da provideAssetsKeycloak
   * tramite initOptions.onLoad — qui si sincronizza solo lo store.
   */
  withHooks((store) => ({
    onInit() {
      const authService = inject(KeycloakAuthService)
      const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL)

      effect(() => {
        const event = keycloakSignal()
        if (event.type === KeycloakEventType.Ready) {
          if (authService.checkLogin()) {
            patchState(store, {
              isAuthenticated: true,
              user: authService.getUser(),
              roles: authService.getRoles()
            })
          } else {
            patchState(store, { isAuthenticated: false, user: null })
          }
        }
      })
    }
  }))
)
