import { ApplicationConfig, importProvidersFrom, isDevMode, LOCALE_ID } from '@angular/core'
import { provideRouter } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { AppReducer } from './app-state/app-reducers/app.reducers'
import { LocaleService } from 'angular-develop-universe/utility'
import { TranslocoHttpLoader } from './transloco-loader'
import { provideServiceWorker } from '@angular/service-worker'
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage'
import { provideAssetsDialogs } from 'angular-develop-universe/dialogs'
import { provideTransloco } from '@jsverse/transloco'
import { PlotlyModule } from 'angular-plotly.js'
import { provideHighcharts } from 'highcharts-angular'
import { highchartsTheme } from './feature/charts/highcharts-theme'
import * as PlotlyJS from 'plotly.js-dist-min'
import { registerLocaleData } from '@angular/common'
import localeIt from '@angular/common/locales/it'
// import { provideAssetsKeycloak } from 'angular-develop-universe/keycloak'

registerLocaleData(localeIt)

// PlotlyModule.plotlyjs = PlotlyJS

export const appConfig: ApplicationConfig = {
  providers: [
    provideHighcharts({ options: highchartsTheme }),
    importProvidersFrom(PlotlyModule.forRoot(PlotlyJS)),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),

    // NgRx Store
    provideStore(AppReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([]),

    // Transloco
    provideTransloco({
      config: {
        availableLangs: ['en', 'it'],
        defaultLang: 'it',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),

    // Keycloak Authentication
    // provideAssetsKeycloak({
    //   config: {
    //     url: 'http://localhost:8080',
    //     realm: 'myrealm',
    //     clientId: 'myclient',
    //   },
    //   initOptions: {
    //     onLoad: 'login-required',
    //   }
    // }),

    // Azure Authentication
    // provideAssetsAzure({
    //   loginMode: 'login-required',
    //   graphUrl: '',
    //   loginFailedRoute: '',
    //   guardScopes: [],
    //   auth: {
    //     clientId: '2bcdc6d7-0395-4904-838a-a3f2ff7f4494',
    //     authority: 'https://login.microsoftonline.com/a42e5409-0ade-4beb-8099-84afd4e0f1ec',
    //     redirectUri: 'http://localhost:4200/',
    //     postLogoutRedirectUri: 'http://localhost:4200/',
    //   },
    //   cache: {
    //     cacheLocation: BrowserCacheLocation.LocalStorage,
    //     storeAuthStateInCookie: false
    //   },
    //   system: {
    //     loggerOptions: {
    //       loggerCallback: () => {},
    //       piiLoggingEnabled: isDevMode()
    //     }
    //   },
    //   protectedResourceApi: new Map([])
    // }),

    // Service Worker
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),

    // Other providers
    { provide: LOCALE_ID, deps: [LocaleService], useFactory: (s: LocaleService) => s.getLocale('it') },
    TranslocoHttpLoader,
    provideNgxWebstorage(
      withLocalStorage(),
      withSessionStorage()
    ),
    provideAssetsDialogs({
      excludeLoader: 'urls',
      excludeLoaderUrls: [{ method: 'GET', url: 'planets' }]
    }),
  ]
}
