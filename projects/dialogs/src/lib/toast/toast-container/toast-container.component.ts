import {
  Component, computed,
  ElementRef, EventEmitter,
  input, InputSignal, Signal,
  viewChild, ViewEncapsulation
} from '@angular/core'
import { ToastModel } from '../toast.model'
import { NgClass, DatePipe } from '@angular/common'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'ngu-toast-container',
  imports: [NgClass, DatePipe],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ToastContainerComponent {
  toastConfig: InputSignal<ToastModel | undefined> = input<ToastModel | undefined>(undefined)
  toast: Signal<ElementRef<HTMLDialogElement> | undefined> = viewChild('toast')

  whenOpen: EventEmitter<void> = new EventEmitter()
  whenOpened: EventEmitter<void> = new EventEmitter()
  whenClose: EventEmitter<void> = new EventEmitter()
  whenClosed: EventEmitter<void> = new EventEmitter()

  closeIcon: Signal<SafeHtml> = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.toastConfig()?.toastCloseIcon ?? '')
  )

  toastIcon: Signal<SafeHtml> = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.toastConfig()?.toastIcon ?? '')
  )

  constructor (private sanitizer: DomSanitizer) {}

  show (): void {
    this.whenOpen.emit()
    this.toast()?.nativeElement?.show()
    this.whenOpened.emit()
  }

  hide (): void {
    this.whenClose.emit()
    this.toast()?.nativeElement?.close()
    this.whenClosed.emit()
  }
}

