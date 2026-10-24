import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core'
import { KeycloakStore } from '../state/keycloak.store'

@Directive({
  selector: '[nguKeycloakIsAuthenticated]',
})
export class IsAuthenticatedDirective {
  private readonly store = inject(KeycloakStore)
  private readonly templateRef = inject(TemplateRef<IsAuthenticatedDirective>)
  private readonly viewContainerRef = inject(ViewContainerRef)

  constructor() {
    effect(() => {
      if (this.store.isAuthenticated()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainerRef.clear()
      }
    })
  }
}
