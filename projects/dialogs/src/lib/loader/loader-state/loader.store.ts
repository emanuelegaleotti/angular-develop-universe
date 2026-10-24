import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals'
import { computed } from '@angular/core'

export interface LoaderState {
  loaders: number
}

const initialState: LoaderState = {
  loaders: 0
}

export const LoaderStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    isLoading: computed(() => store.loaders() > 0)
  })),

  withMethods((store) => ({
    open(): void {
      patchState(store, { loaders: store.loaders() + 1 })
    },
    close(): void {
      patchState(store, { loaders: Math.max(0, store.loaders() - 1) })
    }
  }))
)

