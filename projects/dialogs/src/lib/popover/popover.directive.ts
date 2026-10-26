import { DOCUMENT } from '@angular/common'
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

const POPOVER_STYLE_ID = 'ngu-popover-styles'

// The popover node is created imperatively, so its styles can't be view-encapsulated: they are
// injected once and driven only by custom properties (with fallbacks) set by the consumer.
const POPOVER_STYLES = `
.ngu-popover {
  inset: auto;
  margin: var(--ngu-popover-offset, 0.25rem);
  padding: var(--ngu-popover-padding, 0.5rem);
  border: var(--ngu-popover-border, 1px solid) var(--ngu-popover-border-color, currentColor);
  border-radius: var(--ngu-popover-border-radius, 0);
  background: var(--ngu-popover-background, canvas);
  color: var(--ngu-popover-color, inherit);
  box-shadow: var(--ngu-popover-shadow, none);
  position-area: block-end span-inline-end;
  position-try-fallbacks: flip-block, flip-block flip-inline;
}
.ngu-popover[data-position='top'] {
  position-area: block-start span-inline-end;
}
.ngu-popover[data-position='right'] {
  position-area: inline-end span-block-end;
  position-try-fallbacks: flip-inline, flip-block flip-inline;
}
.ngu-popover[data-position='left'] {
  position-area: inline-start span-block-end;
  position-try-fallbacks: flip-inline, flip-block flip-inline;
}
`

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
  private readonly document = inject(DOCUMENT)
  private readonly viewContainerRef = inject(ViewContainerRef)

  private readonly popover: HTMLElement = this.renderer.createElement('div')

  constructor() {
    inject(DestroyRef).onDestroy(() => this.popover.remove())
    effect(() => this.renderer.setAttribute(this.popover, 'data-position', this.nguPopoverPosition()))
  }

  ngOnInit(): void {
    this.ensureStyles()
    this.renderer.addClass(this.popover, 'ngu-popover')
    this.renderer.setAttribute(this.popover, 'id', this.nguPopoverId())
    this.renderer.setAttribute(this.popover, 'popover', 'auto')
    this.renderer.setAttribute(this.host, 'popovertarget', this.nguPopoverId())

    const view = this.viewContainerRef.createEmbeddedView(this.nguPopover())
    view.rootNodes.forEach(node => this.renderer.appendChild(this.popover, node))
    this.renderer.insertBefore(this.host.parentNode, this.popover, this.host.nextSibling)
  }

  private ensureStyles(): void {
    if (this.document.getElementById(POPOVER_STYLE_ID)) return
    const style = this.renderer.createElement('style') as HTMLStyleElement
    this.renderer.setAttribute(style, 'id', POPOVER_STYLE_ID)
    style.textContent = POPOVER_STYLES
    this.renderer.appendChild(this.document.head, style)
  }
}
