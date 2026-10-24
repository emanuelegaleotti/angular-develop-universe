import { signalStore, withState, withMethods, patchState } from '@ngrx/signals'

export interface SnackbarState {
  message: string
  isOpen: boolean
  expiration: number
}

const initialState: SnackbarState = {
  message: '',
  isOpen: false,
  expiration: 7000
}

export const SnackbarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => ({
    open(message: string, expiration: number = 7000): void {
      patchState(store, { message, expiration, isOpen: true })
    },
    close(): void {
      patchState(store, { isOpen: false })
    },
    clearMessage(): void {
      patchState(store, { message: '' })
    }
  }))
)

