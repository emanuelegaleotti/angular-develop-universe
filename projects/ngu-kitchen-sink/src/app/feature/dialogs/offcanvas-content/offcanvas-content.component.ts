import {
  Component, input, InputSignal,
} from '@angular/core'
import { NguOffcanvasService } from 'angular-develop-universe/dialogs'


@Component({
  selector: 'app-offcanvas-content',
  templateUrl: './offcanvas-content.component.html',
  styleUrls: ['./offcanvas-content.component.scss']
})
export class OffcanvasContentComponent {
  offcanvasData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined)

  constructor (
    private readonly offcanvasService: NguOffcanvasService,
  ) {}

  onClose (): void {
    this.offcanvasService.hide()
  }

  ngOnInit() {
    console.log(this.offcanvasData())
  }
}
