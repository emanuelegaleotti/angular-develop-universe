import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Store} from "@ngrx/store";
import { CognitoSelectors } from '../state/selectors'


@Directive({
    selector: '[nguCognitoIsAuthenticated]',

})
export class IsAuthenticatedDirective implements OnInit {

  constructor(
    private readonly store: Store,
    private readonly templateRef: TemplateRef<IsAuthenticatedDirective>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this.store
      .select(CognitoSelectors.selectIsAuthenticated)
      .subscribe(is => {
        if (is) {
          this.viewContainerRef.createEmbeddedView(this.templateRef)
        } else {
          this.viewContainerRef.clear()
        }
      })
  }

}
