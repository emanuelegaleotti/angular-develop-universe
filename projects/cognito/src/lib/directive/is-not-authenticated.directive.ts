import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Store} from "@ngrx/store";
import { CognitoSelectors } from '../state/selectors'



@Directive({
    selector: '[nguCognitoIsNotAuthenticated]',

})
export class IsNotAuthenticatedDirective implements OnInit {

  constructor(
    private readonly store: Store,
    private readonly templateRef: TemplateRef<IsNotAuthenticatedDirective>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this.store
      .select(CognitoSelectors.selectIsAuthenticated)
      .subscribe(is => {
        if (is) {
          this.viewContainerRef.clear()
        } else {
          this.viewContainerRef.createEmbeddedView(this.templateRef)
        }
      })
  }

}
