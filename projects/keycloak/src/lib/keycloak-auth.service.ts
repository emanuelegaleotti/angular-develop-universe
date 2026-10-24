import { inject, Injectable } from '@angular/core'
import Keycloak, { KeycloakProfile } from 'keycloak-js'
import { from, Observable } from 'rxjs'

@Injectable()
export class KeycloakAuthService {
  private readonly keycloak = inject(Keycloak)

  /** Esegue il redirect al login Keycloak */
  login(): Observable<void> {
    return from(this.keycloak.login())
  }

  /** Esegue il logout Keycloak e pulisce la sessione */
  logout(redirectUri?: string): Observable<void> {
    return from(this.keycloak.logout({ redirectUri }))
  }

  /** Verifica se l'utente è autenticato */
  checkLogin(): boolean {
    return this.keycloak.authenticated
  }

  /** Restituisce il profilo dell'utente autenticato */
  getUser(): KeycloakProfile | null {
    return this.keycloak.profile ?? null
  }

  /** Restituisce i ruoli realm + client dell'utente */
  getRoles(): string[] {
    const realmRoles = this.keycloak.realmAccess?.roles ?? []
    const clientId = this.keycloak.clientId ?? ''
    const clientRoles = this.keycloak.resourceAccess?.[clientId]?.roles ?? []
    return [...realmRoles, ...clientRoles]
  }
}

