import {
  ApplicationRef, ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  inputBinding,
  signal, Type,
} from '@angular/core'
import { BottomSheetContainerComponent } from './bottom-sheet-container/bottom-sheet-container.component'
import { BottomSheetModel } from './bottom-sheet.model'

@Injectable({ providedIn: 'root' })
export class NguBottomSheetService {
  private readonly injector = inject(EnvironmentInjector)
  private readonly appRef = inject(ApplicationRef)
  bottomSheetRef: ComponentRef<BottomSheetContainerComponent> | null = null
  host: HTMLElement | null = null

  createBottomSheet (component: Type<any>, config?: BottomSheetModel): BottomSheetContainerComponent {
    this.host = document.createElement('bottom-sheet-host')
    this.bottomSheetRef = createComponent(BottomSheetContainerComponent, {
      environmentInjector: this.injector,
      hostElement: this.host,
      bindings: [
        inputBinding('bottomSheetConfig', signal(config)),
      ],
    })
    this.appRef.attachView(this.bottomSheetRef.hostView)
    document.body.appendChild(this.host)
    this.bottomSheetRef.instance.injectCustomComponent(component)
    return this.bottomSheetRef.instance
  }

  show (): void {
    if (this.bottomSheetRef) {
      this.bottomSheetRef.instance.whenOpen.emit()
      this.bottomSheetRef.instance.show()
      this.bottomSheetRef.instance.whenOpened.emit()
    }
  }

  hide (closeData?: any): void {
    this.bottomSheetRef?.instance.hide(closeData)
    if (this.host) {
      document.body.removeChild(this.host)
    }
    if (this.bottomSheetRef) {
      this.appRef.detachView(this.bottomSheetRef.hostView)
    }
  }
}
