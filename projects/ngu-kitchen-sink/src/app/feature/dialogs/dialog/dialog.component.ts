import { Component,  } from '@angular/core'
import { NguDialogService } from 'angular-develop-universe/dialogs'
import { DialogContentComponent } from '../dialog-content/dialog-content.component'

@Component({
  selector: 'ngu-kitchensink-dialogs',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor (
    public readonly dialogService: NguDialogService
  ) {}

  openModal (): void {
    const d = this.dialogService.createDialog(
      DialogContentComponent,
      { id: 'test-dialogs',
        className: 'test-dialogs-class',
        dialogData: { test: 'data to dialogs' }
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

  closeModal (): void {
    this.dialogService.hide()
  }
}
