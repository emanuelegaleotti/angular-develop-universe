import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AzureStore } from '../state/azure.store'

export function CheckRolesGuard(roles: string[], condition: 'AND' | 'OR'): CanActivateFn {
  return (): boolean => {
    const store = inject(AzureStore)
    const router = inject(Router)
    const hasRoles = store.checkRoles()(roles, condition)
    if (!hasRoles) {
      router.navigate(['403'])
    }
    return hasRoles
  }
}
