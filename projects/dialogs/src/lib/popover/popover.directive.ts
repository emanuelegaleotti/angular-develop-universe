import {
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core'

export type NguPopoverPosition = 'bottom' | 'top' | 'left' | 'right'

@Directive({
  selector: '[nguPopover]',
  standalone: true
})
export class NguPopoverDirective implements OnInit {
  nguPopover: InputSignal<TemplateRef<unknown>> = input.required<TemplateRef<unknown>>()
  nguPopoverId: InputSignal<string> = input.required<string>()
  nguPopoverPosition: InputSignal<NguPopoverPosition> = input<NguPopoverPosition>('bottom')

  private readonly host: HTMLElement = inject(ElementRef).nativeElement
  private readonly renderer = inject(Renderer2)
  private readonly viewContainerRef = inject(ViewContainerRef)

  private readonly popover: HTMLElement = this.renderer.createElement('div')

  constructor() {
    inject(DestroyRef).onDestroy(() => this.popover.remove())
    effect(() => this.renderer.setAttribute(this.popover, 'data-position', this.nguPopoverPosition()))
  }

  ngOnInit(): void {
    this.renderer.addClass(this.popover, 'ngu-popover')
    this.renderer.setAttribute(this.popover, 'id', this.nguPopoverId())
    this.renderer.setAttribute(this.popover, 'popover', 'auto')
    this.renderer.setAttribute(this.host, 'popovertarget', this.nguPopoverId())

    const view = this.viewContainerRef.createEmbeddedView(this.nguPopover())
    view.rootNodes.forEach(node => this.renderer.appendChild(this.popover, node))
    this.renderer.insertBefore(this.host.parentNode, this.popover, this.host.nextSibling)
  }
}
