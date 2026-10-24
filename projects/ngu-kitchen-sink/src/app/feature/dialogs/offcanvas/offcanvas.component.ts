import {Component, EventEmitter, inject, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core'
import { OffcanvasContentComponent } from '../offcanvas-content/offcanvas-content.component'
import { NguOffcanvasService } from 'angular-develop-universe/dialogs'

@Component({
  selector: 'ngu-kitchensink-offcanvas',
  imports: [],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.scss'
})
export class OffcanvasComponent {
  constructor (
    private readonly offcanvasService: NguOffcanvasService,
  ) {}

  openOffcanvasLeft (): void {
    const o = this.offcanvasService.createOffcanvas(
      OffcanvasContentComponent,
      {
        position: 'left',
        offcanvasCloseIcon: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        `,
        id: 'test-offcanvas',
        className: 'test-offcanvas-class',
        offcanvasData: { test: 'data to offcanvas' },
        offcanvasTitle: 'Offcanvas example'
      }
    )
    o.whenOpen.subscribe(() => {
        console.log('open')
      }
    )
    o.whenOpened.subscribe(() => {
        console.log('opened')
      }
    )
    o.whenClose.subscribe(() => {
        console.log('close')
      }
    )
    o.whenClosed.subscribe(() => {
        console.log('closed')
      }
    )
    o.show()
  }

  openOffcanvasRight (): void {
    const d = this.offcanvasService.createOffcanvas(
      OffcanvasContentComponent,
      {
        position: 'right',
        offcanvasCloseIcon: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        `,
        id: 'test-offcanvas',
        className: 'test-offcanvas-class',
        offcanvasData: { test: 'data to offcanvas' },
        offcanvasTitle: 'Offcanvas example'
      }
    )
    d.whenOpen.subscribe(() => {
        console.log('open')
      }
    )
    d.whenOpened.subscribe(() => {
        console.log('opened')
      }
    )
    d.whenClose.subscribe(() => {
        console.log('close')
      }
    )
    d.whenClosed.subscribe(() => {
        console.log('closed')
      }
    )
    d.show()
  }
}
