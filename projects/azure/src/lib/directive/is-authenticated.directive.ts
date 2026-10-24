import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core'
import { AzureStore } from '../state/azure.store'

@Directive({
  selector: '[nguAzureIsAuthenticated]',
})
export class IsAuthenticatedDirective {
  private readonly store = inject(AzureStore)
  private readonly templateRef = inject(TemplateRef<IsAuthenticatedDirective>)
  private readonly viewContainerRef = inject(ViewContainerRef)

  constructor () {
    effect(() => {
      if (this.store.isAuthenticated()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainerRef.clear()
      }
    })
  }
}
