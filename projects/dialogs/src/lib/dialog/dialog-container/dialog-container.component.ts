import {
  Component, computed,
  ElementRef, EventEmitter, inject,
  input, inputBinding,
  InputSignal,
  signal,
  Signal, Type, ViewChild,
  viewChild, ViewContainerRef
} from '@angular/core'
import { DialogModel } from '../dialog.model'
import { NgClass } from '@angular/common'

@Component({
  selector: 'ngu-dialogs-container',
  imports: [
    NgClass,
    NgClass
  ],
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.scss'
})
export class DialogContainerComponent {
  dialogConfig: InputSignal<DialogModel | undefined> = input<DialogModel | undefined>(undefined)
  dialog: Signal<ElementRef<HTMLDialogElement> | undefined> = viewChild('dialog')
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef
  private vcr = inject(ViewContainerRef)
  whenOpen: EventEmitter<void> = new EventEmitter()
  whenOpened: EventEmitter<void> = new EventEmitter()
  whenClose: EventEmitter<void> = new EventEmitter()
  whenClosed: EventEmitter<void> = new EventEmitter()

  show (): void {
    this.whenOpen.emit()
    this.dialog()?.nativeElement?.showModal()
    this.whenOpened.emit()
  }

  hide (closeData?: any): void {
    this.whenClose.emit(closeData)
    this.dialog()?.nativeElement?.close()
    this.whenClosed.emit()
  }

  injectCustomComponent (component: Type<any>): void {
    this.container.createComponent(
      component,
      {
        bindings: [
          inputBinding('dialogData', computed(() => {
            return this.dialogConfig()?.dialogData
          })),
        ],
      })
  }
}
