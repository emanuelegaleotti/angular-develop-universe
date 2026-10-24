import {
  ApplicationRef, ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  inputBinding,
  signal, Type,
} from '@angular/core'
import {OffcanvasContainerComponent} from './offcanvas-container/offcanvas-container.component'
import {OffcanvasModel} from './offcanvas.model'

@Injectable({providedIn: 'root'})
export class NguOffcanvasService {
  private readonly injector = inject(EnvironmentInjector)
  private readonly appRef = inject(ApplicationRef)
  offcanvasRef: ComponentRef<OffcanvasContainerComponent> | null = null
  host: HTMLElement | null = null

  createOffcanvas(component: Type<any>, offcanvasConfig?: OffcanvasModel): OffcanvasContainerComponent {
    this.host = document.createElement('offcanvas-host')
    this.offcanvasRef = createComponent(
      OffcanvasContainerComponent, {
        environmentInjector: this.injector,
        hostElement: this.host,
        bindings: [
          inputBinding('offcanvasConfig', signal(offcanvasConfig)),
        ],
      })
    this.appRef.attachView(this.offcanvasRef.hostView)
    document.body.appendChild(this.host)
    this.offcanvasRef.instance.injectCustomComponent(component)
    return this.offcanvasRef.instance
  }

  show(): void {
    if (this.offcanvasRef) {
      this.offcanvasRef.instance.whenOpen.emit()
      this.offcanvasRef.instance.show()
      this.offcanvasRef.instance.whenOpened.emit()
    }
  }

  hide(closeData?: any): void {
    this.offcanvasRef?.instance.hide(closeData)
    if (this.host) {
      document.body.removeChild(this.host)
    }
    if (this.offcanvasRef) {
      this.appRef.detachView(this.offcanvasRef?.hostView)
    }
  }
}
