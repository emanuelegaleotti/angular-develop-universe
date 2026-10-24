import { computed, inject } from '@angular/core'
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { tapResponse } from '@ngrx/operators'
import { AccountInfo } from '@azure/msal-browser'
import { mergeMap, pipe } from 'rxjs'
import { AzureService } from '../azure.service'

export interface AzureState {
  isAuthenticated: boolean
  user: AccountInfo | null
  roles: string[]
}

const initialState: AzureState = {
  isAuthenticated: false,
  user: null,
  roles: []
}

export const AzureStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    checkRoles: computed(() => (roles: string[], condition: 'AND' | 'OR'): boolean => {
      const r = store.roles()
      if (condition === 'AND'){
        return roles.map(role => r.includes(role)).every(Boolean)
      }
      return roles.map(role => r.includes(role)).some(Boolean)
    }),
  })),

  withMethods((store, azureService = inject(AzureService)) => ({

    storeRoles(roles: string[]): void {
      patchState(store, { roles })
    },

    clearRoles(): void {
      patchState(store, { roles: [] })
    },

    /** Esegue il redirect al login MSAL e aggiorna lo store */
    login: rxMethod<void>(
      pipe(
        mergeMap(() => azureService.login().pipe(
          tapResponse({
            next: () => patchState(store, { isAuthenticated: true, user: azureService.getUser() }),
            error: (e: unknown) => {
              console.error(e)
              patchState(store, { isAuthenticated: false, user: null, roles: [] })
            }
          })
        ))
      )
    ),

    /** Esegue il logout MSAL e pulisce lo store */
    logout: rxMethod<void>(
      pipe(
        mergeMap(() => azureService.logout().pipe(
          tapResponse({
            next: () => patchState(store, { isAuthenticated: false, user: null, roles: [] }),
            error: (e: unknown) => console.error(e)
          })
        ))
      )
    ),

    /**
     * Verifica lo stato di login MSAL senza redirect.
     * Se già autenticato aggiorna lo store, altrimenti imposta isAuthenticated = false.
     */
    checkOnly: rxMethod<void>(
      pipe(
        mergeMap(() => azureService.loginProgress().pipe(
          tapResponse({
            next: () => {
              if (azureService.checkLogin().length) {
                patchState(store, { isAuthenticated: true, user: azureService.getUser() })
              } else {
                patchState(store, { isAuthenticated: false, user: null })
              }
            },
            error: () => patchState(store, { isAuthenticated: false })
          })
        ))
      )
    ),

    /**
     * Verifica lo stato di login MSAL.
     * Se già autenticato aggiorna lo store, altrimenti avvia il redirect al login.
     */
    loginRequired: rxMethod<void>(
      pipe(
        mergeMap(() => azureService.loginProgress().pipe(
          tapResponse({
            next: () => {
              if (azureService.checkLogin().length) {
                patchState(store, { isAuthenticated: true, user: azureService.getUser() })
              } else {
                patchState(store, { isAuthenticated: false, user: null })
                azureService.login().subscribe()
              }
            },
            error: () => patchState(store, { isAuthenticated: false })
          })
        ))
      )
    ),
  }))
)
