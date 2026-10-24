import { Component, inject } from '@angular/core'
import { NguToastService, ToastModel } from 'angular-develop-universe/dialogs'

@Component({
  selector: 'ngu-kitchensink-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastDemoComponent {
  private readonly toastService = inject(NguToastService)

  private readonly closeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
    </svg>
  `

  private readonly infoIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
      <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
    </svg>
  `

  private readonly successIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
      <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
    </svg>
  `

  private readonly warningIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
      <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/>
    </svg>
  `

  showTopRight (): void {
    this.toastService.show(new ToastModel(
      'top-right',
      `toast-${Date.now()}`,
      this.closeIcon,
      undefined,
      'Notifica in arrivo',
      'Questo è un messaggio informativo temporizzato.',
      this.infoIcon,
      new Date(),
      4000
    ))
  }

  showTopLeft (): void {
    this.toastService.show(new ToastModel(
      'top-left',
      `toast-${Date.now()}`,
      this.closeIcon,
      undefined,
      'Operazione riuscita',
      'Il file è stato salvato correttamente.',
      this.successIcon,
      new Date(),
      4000
    ))
  }

  showBottomRight (): void {
    this.toastService.show(new ToastModel(
      'bottom-right',
      `toast-${Date.now()}`,
      this.closeIcon,
      undefined,
      'Attenzione',
      'La sessione scadrà tra 5 minuti.',
      this.warningIcon,
      new Date(),
      5000
    ))
  }

  showBottomLeft (): void {
    this.toastService.show(new ToastModel(
      'bottom-left',
      `toast-${Date.now()}`,
      this.closeIcon,
      undefined,
      'Messaggio persistente',
      'Questo toast non sparisce automaticamente. Usa il pulsante × per chiuderlo.',
      this.infoIcon,
      new Date(),
      null
    ))
  }

  showTopCenter (): void {
    this.toastService.show(new ToastModel(
      'top-center',
      `toast-${Date.now()}`,
      this.closeIcon,
      undefined,
      'Solo messaggio',
      'Toast senza icon centrato in alto.',
      undefined,
      undefined,
      3000
    ))
  }

  showBottomCenter (): void {
    this.toastService.show(new ToastModel(
      'bottom-center',
      `toast-${Date.now()}`,
      this.closeIcon,
      undefined,
      undefined,
      'Toast senza titolo né data, centrato in basso.',
      undefined,
      undefined,
      3000
    ))
  }

  hideAll (): void {
    this.toastService.hide()
  }
}

