import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  inputBinding,
  signal,
} from '@angular/core'
import { ToastContainerComponent } from './toast-container/toast-container.component'
import { ToastModel, ToastPosition } from './toast.model'

@Injectable({ providedIn: 'root' })
export class NguToastService {
  private readonly injector = inject(EnvironmentInjector)
  private readonly appRef = inject(ApplicationRef)

  private host: HTMLElement | null = null
  private stackHost: HTMLElement | null = null
  private toastRef: ComponentRef<ToastContainerComponent> | null = null
  private timer: ReturnType<typeof setTimeout> | null = null

  show (config: ToastModel): void {
    this._destroy()

    this.stackHost = document.createElement('ngu-toast-stack')
    this.stackHost.classList.add('ngu-toast-stack', `ngu-toast-stack-${config.position}`)
    document.body.appendChild(this.stackHost)

    this.host = document.createElement('ngu-toast-host')
    this.stackHost.appendChild(this.host)

    this.toastRef = createComponent(ToastContainerComponent, {
      environmentInjector: this.injector,
      hostElement: this.host,
      bindings: [inputBinding('toastConfig', signal(config))],
    })
    this.appRef.attachView(this.toastRef.hostView)
    this.toastRef.instance.show()

    this.toastRef.instance.whenClosed.subscribe(() => this._destroy())

    if (config.duration != null) {
      this.timer = setTimeout(() => this.hide(), config.duration)
    }
  }

  hide (): void {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.toastRef?.instance.hide()
  }

  private _destroy (): void {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    if (this.toastRef) {
      this.appRef.detachView(this.toastRef.hostView)
      this.toastRef.destroy()
      this.toastRef = null
    }
    if (this.stackHost) {
      this.stackHost.remove()
      this.stackHost = null
    }
    this.host = null
  }
}



