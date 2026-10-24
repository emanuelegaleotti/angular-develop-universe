import {
  ApplicationRef, ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  inputBinding,
   signal, Type,
} from '@angular/core'
import { DialogContainerComponent } from './dialog-container/dialog-container.component'
import { DialogModel } from './dialog.model'

@Injectable({ providedIn: 'root' })
export class NguDialogService {
  private readonly injector = inject(EnvironmentInjector)
  private readonly appRef = inject(ApplicationRef)
  dialogRef: ComponentRef<DialogContainerComponent> | null = null
  host: HTMLElement | null = null

  createDialog (component: Type<any>, dialogConfig?: DialogModel): DialogContainerComponent {
    this.host = document.createElement('dialogs-host')
    this.dialogRef = createComponent(DialogContainerComponent, {
      environmentInjector: this.injector,
      hostElement: this.host,
      bindings: [
        inputBinding('dialogConfig', signal(dialogConfig)),
      ],
    })
    this.appRef.attachView(this.dialogRef.hostView)
    document.body.appendChild(this.host)
    this.dialogRef.instance.injectCustomComponent(component)
    return this.dialogRef.instance
  }

  show (): void {
    if (this.dialogRef) {
      this.dialogRef.instance.whenOpen.emit()
      this.dialogRef.instance.show()
      this.dialogRef.instance.whenOpened.emit()
    }
  }

  hide (closeData?: any): void {
    this.dialogRef?.instance.hide(closeData)
    if (this.host) {
      document.body.removeChild(this.host)
    }
    if (this.dialogRef) {
      this.appRef.detachView(this.dialogRef?.hostView)
    }
  }
}
