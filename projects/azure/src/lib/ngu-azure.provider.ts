import {
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer
} from '@angular/core'
import { AzureService } from './azure.service'
import { NGU_AZURE_CONFIG, NguAzureConfig } from './ngu-azure.model'
import { AzureStore } from './state/azure.store'
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalService
} from '@azure/msal-angular'
import { AzureConfigService } from './azure-config.service'
import { of } from 'rxjs'

export function provideAssetsAzure(config: Partial<NguAzureConfig> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NGU_AZURE_CONFIG, useValue: config },
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    importProvidersFrom(MsalModule),
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    { provide: MSAL_INSTANCE, deps: [AzureConfigService], useFactory: (s: AzureConfigService) => s.getConfig() },
    { provide: MSAL_GUARD_CONFIG, deps: [AzureConfigService], useFactory: (s: AzureConfigService) => s.getGuardConfig() },
    { provide: MSAL_INTERCEPTOR_CONFIG, deps: [AzureConfigService], useFactory: (s: AzureConfigService) => s.getInterceptorConfig() },
    AzureService,
    AzureStore,
    MsalGuard,
    MsalBroadcastService,
    MsalService,
    provideEnvironmentInitializer(() => {
      const store = inject(AzureStore)
      const loginMode = (inject(NGU_AZURE_CONFIG) as NguAzureConfig).loginMode ?? 'none'
      if (loginMode === 'check-sso') {
        store.checkOnly(of(undefined))
      } else if (loginMode === 'login-required') {
        store.loginRequired(of(undefined))
      }
    })
  ])
}
