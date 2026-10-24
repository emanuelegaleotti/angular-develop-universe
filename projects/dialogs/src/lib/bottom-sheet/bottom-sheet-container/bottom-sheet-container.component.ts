import {
  Component, computed,
  ElementRef, EventEmitter,
  input, inputBinding,
  InputSignal,
  Signal, Type, ViewChild,
  viewChild, ViewContainerRef
} from '@angular/core'
import { BottomSheetModel } from '../bottom-sheet.model'
import { NgClass } from '@angular/common'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'ngu-bottom-sheet-container',
  imports: [NgClass],
  templateUrl: './bottom-sheet-container.component.html',
  styleUrl: './bottom-sheet-container.component.scss'
})
export class BottomSheetContainerComponent {
  bottomSheetConfig: InputSignal<BottomSheetModel | undefined> = input<BottomSheetModel | undefined>(undefined)
  bottomSheet: Signal<ElementRef<HTMLDialogElement> | undefined> = viewChild('bottomSheet')
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef
  whenOpen: EventEmitter<void> = new EventEmitter()
  whenOpened: EventEmitter<void> = new EventEmitter()
  whenClose: EventEmitter<void> = new EventEmitter()
  whenClosed: EventEmitter<void> = new EventEmitter()

  closeIcon: Signal<SafeHtml> = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.bottomSheetConfig()?.closeIcon ?? '')
  )

  constructor (private sanitizer: DomSanitizer) {}

  show (): void {
    this.whenOpen.emit()
    this.bottomSheet()?.nativeElement?.showModal()
    this.whenOpened.emit()
  }

  hide (closeData?: any): void {
    this.whenClose.emit(closeData)
    this.bottomSheet()?.nativeElement?.close()
    this.whenClosed.emit()
  }

  injectCustomComponent (component: Type<any>): void {
    this.container.createComponent(component, {
      bindings: [
        inputBinding('dialogData', computed(() => this.bottomSheetConfig()?.dialogData)),
      ],
    })
  }
}
