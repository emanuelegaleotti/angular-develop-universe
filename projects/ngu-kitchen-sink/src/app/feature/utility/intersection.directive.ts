import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core'

@Directive({
  selector: '[iotIntersection]',
  standalone: true
})
export class IntersectionDirective implements OnDestroy, AfterViewInit {
  @Input() rootMargin: string = '0px'
  @Input() threshold?: number
  @Input() root?: Element | Document

  @Output() whenItemIn = new EventEmitter()
  @Output() whenItemOut = new EventEmitter()
  observer?: IntersectionObserver

  constructor (
    private el: ElementRef
  ) { }

  ngAfterViewInit () {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.whenItemIn.emit()
        } else if (!entry.intersectionRatio) {
          this.whenItemOut.emit()
        }
      })
    }, {
      rootMargin: this.rootMargin,
      threshold: this.threshold,
      root: this.root
    })

    this.observer.observe(this.el.nativeElement)
  }

  ngOnDestroy () {
    this.observer?.unobserve(this.el.nativeElement)
    this.observer?.disconnect()
  }
}
