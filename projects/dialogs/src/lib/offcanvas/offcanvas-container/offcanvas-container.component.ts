import {
  Component, computed, ContentChild, effect,
  ElementRef, EventEmitter, inject,
  input, inputBinding,
  InputSignal, signal,
  Signal, TemplateRef, reflectComponentType,
   Type,
  ViewChild,
  viewChild,
  ViewContainerRef, WritableSignal
} from '@angular/core'
import { OffcanvasModel } from '../offcanvas.model'
import {NgClass} from '@angular/common'
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'ngu-kitchensink-offcanvas-container',
  imports: [
    NgClass
  ],
  templateUrl: './offcanvas-container.component.html',
  styleUrl: './offcanvas-container.component.scss'
})
export class OffcanvasContainerComponent {
  offcanvasConfig: InputSignal<OffcanvasModel | undefined> = input<OffcanvasModel | undefined>(undefined)
  offcanvas: Signal<ElementRef<HTMLDialogElement> | undefined> = viewChild('offcanvas')
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef
  constructor(private sanitizer: DomSanitizer) {}

  closeIcon = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.offcanvasConfig()?.offcanvasCloseIcon ?? ''))

  private vcr = inject(ViewContainerRef)
  whenOpen: EventEmitter<void> = new EventEmitter()
  whenOpened: EventEmitter<void> = new EventEmitter()
  whenClose: EventEmitter<void> = new EventEmitter()
  whenClosed: EventEmitter<void> = new EventEmitter()

  show (): void {
    this.whenOpen.emit()
    this.offcanvas()?.nativeElement?.showModal()
    this.whenOpened.emit()
  }

  hide (closeData?: any): void {
    this.whenClose.emit(closeData)
    this.offcanvas()?.nativeElement?.close()
    this.whenClosed.emit()
  }

  injectCustomComponent (component: Type<any>): void {
    this.container.createComponent(
      component,
      {
        bindings: reflectComponentType(component)?.inputs.some(i => i.propName === 'offcanvasData') ? [
          inputBinding('offcanvasData', computed(() => {
            return this.offcanvasConfig()?.offcanvasData
          })),
        ] : [],
      })
  }
}
