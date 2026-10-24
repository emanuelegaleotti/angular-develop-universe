import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core'
import { LoaderStore } from '../loader-state/loader.store'

@Directive({
  selector: '[nguLoader]'
})
export class LoaderDirective {
  private readonly loaderStore = inject(LoaderStore)
  private readonly templateRef = inject(TemplateRef<LoaderDirective>)
  private readonly viewContainerRef = inject(ViewContainerRef)

  constructor () {
    effect(() => {
      if (this.loaderStore.isLoading()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainerRef.clear()
      }
    })
  }
}
