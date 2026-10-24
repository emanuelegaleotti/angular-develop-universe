import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { KeycloakStore } from '../state/keycloak.store'

export function CheckRolesGuard(roles: string[], condition: 'AND' | 'OR'): CanActivateFn {
  return (): boolean => {
    const store = inject(KeycloakStore)
    const router = inject(Router)
    const hasRoles = store.checkRoles()(roles, condition)
    if (!hasRoles) {
      router.navigate(['403'])
    }
    return hasRoles
  }
}
