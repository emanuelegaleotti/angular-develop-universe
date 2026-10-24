import { signalStore, withState, withMethods, patchState } from '@ngrx/signals'

export interface ErrorState {
  error: any
  isOpen: boolean
}

const initialState: ErrorState = {
  error: null,
  isOpen: false
}

export const ErrorStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => ({
    openDialog(): void {
      patchState(store, { isOpen: true })
    },
    closeDialog(): void {
      patchState(store, { isOpen: false })
    },
    storeError(error: any): void {
      patchState(store, { error })
    },
    clearError(): void {
      patchState(store, { error: null })
    }
  }))
)

