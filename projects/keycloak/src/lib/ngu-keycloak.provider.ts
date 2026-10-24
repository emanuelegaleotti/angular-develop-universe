import { EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core'
import { provideKeycloak as provideKeycloakAngular } from 'keycloak-angular'
import { KeycloakStore } from './state/keycloak.store'
import { KeycloakAuthService } from './keycloak-auth.service'
import { NGU_KEYCLOAK_CONFIG, NguKeycloakConfig } from './ngu-keycloak.model'

export function provideAssetsKeycloak(config: NguKeycloakConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NGU_KEYCLOAK_CONFIG, useValue: config },
    KeycloakAuthService,
    KeycloakStore,
    provideKeycloakAngular(config),
    provideEnvironmentInitializer(() => inject(KeycloakStore))
  ])
}
