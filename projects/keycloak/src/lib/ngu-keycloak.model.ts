import { InjectionToken } from '@angular/core'
import { ProvideKeycloakOptions } from 'keycloak-angular'

export type NguKeycloakConfig = ProvideKeycloakOptions

export const NGU_KEYCLOAK_CONFIG = new InjectionToken<NguKeycloakConfig>('NguKeycloakConfig')
