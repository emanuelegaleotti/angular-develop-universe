import { Directive, effect, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { AzureStore } from '../state/azure.store'

@Directive({
  selector: '[nguAzureCheckRoles]',
})
export class CheckRolesDirective {
  @Input() nguAzureCheckRoles: { roles: string[], condition: 'AND' | 'OR' } = { roles: [], condition: 'AND' }

  private readonly store = inject(AzureStore)
  private readonly templateRef = inject(TemplateRef<CheckRolesDirective>)
  private readonly viewContainerRef = inject(ViewContainerRef)

  constructor () {
    effect(() => {
      const hasRoles = this.store.checkRoles()(
        this.nguAzureCheckRoles.roles,
        this.nguAzureCheckRoles.condition
      )
      if (hasRoles) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainerRef.clear()
      }
    })
  }
}
