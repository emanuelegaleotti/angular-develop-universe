import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core'
import { KeycloakStore } from '../state/keycloak.store'

@Directive({
  selector: '[nguKeycloakIsNotAuthenticated]',
})
export class IsNotAuthenticatedDirective {
  private readonly store = inject(KeycloakStore)
  private readonly templateRef = inject(TemplateRef<IsNotAuthenticatedDirective>)
  private readonly viewContainerRef = inject(ViewContainerRef)

  constructor() {
    effect(() => {
      if (this.store.isAuthenticated()) {
        this.viewContainerRef.clear()
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      }
    })
  }
}
