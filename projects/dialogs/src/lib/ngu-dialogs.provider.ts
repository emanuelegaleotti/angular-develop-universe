import {
  EnvironmentProviders,
  makeEnvironmentProviders
} from '@angular/core'
import { NGU_DIALOGS_CONFIG, NguDialogsConfig } from './ngu-dialogs.model'
 import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { LoaderStore } from './loader/loader-state/loader.store'
import { ErrorStore } from './error/error-state/error.store'
import { SnackbarStore } from './snackbar/snackbar-state/snackbar.store'
import { LoaderInterceptor } from './loader/loader-interceptor/loader.interceptor'
import { ErrorInterceptor } from './error/error-interceptor/error.interceptor'


export function provideAssetsDialogs (config: Partial<NguDialogsConfig> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NGU_DIALOGS_CONFIG, useValue: config },
    LoaderStore,
    ErrorStore,
    SnackbarStore,
    provideHttpClient(withInterceptors([LoaderInterceptor, ErrorInterceptor])),
  ])
}
