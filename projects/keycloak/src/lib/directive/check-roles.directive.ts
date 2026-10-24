import { Directive, effect, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { KeycloakStore } from '../state/keycloak.store'

@Directive({
  selector: '[nguKeycloakCheckRoles]',
})
export class CheckRolesDirective {
  @Input() nguKeycloakCheckRoles: { roles: string[], condition: 'AND' | 'OR' } = { roles: [], condition: 'AND' }

  private readonly store = inject(KeycloakStore)
  private readonly templateRef = inject(TemplateRef<CheckRolesDirective>)
  private readonly viewContainerRef = inject(ViewContainerRef)

  constructor() {
    effect(() => {
      const hasRoles = this.store.checkRoles()(
        this.nguKeycloakCheckRoles.roles,
        this.nguKeycloakCheckRoles.condition
      )
      if (hasRoles) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainerRef.clear()
      }
    })
  }
}
