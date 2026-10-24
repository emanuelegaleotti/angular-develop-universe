import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Store } from '@ngrx/store'
import { CognitoSelectors } from '../state/selectors'


@Directive({
    selector: '[nguCognitoCheckRoles]',

})
export class CheckRolesDirective implements OnInit {
  @Input() cognitoCheckRoles: { roles: string[], condition: 'AND' | 'OR' } = { roles: [], condition: 'AND' }

  constructor (
    private readonly store: Store,
    private readonly templateRef: TemplateRef<CheckRolesDirective>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit (): void {
    this.store
      .select(CognitoSelectors.selectCheckRoles(this.cognitoCheckRoles.roles, this.cognitoCheckRoles.condition))
      .subscribe(r => {
        if (r) {
          this.viewContainerRef.createEmbeddedView(this.templateRef)
        } else {
          this.viewContainerRef.clear()
        }
      })
  }
}
