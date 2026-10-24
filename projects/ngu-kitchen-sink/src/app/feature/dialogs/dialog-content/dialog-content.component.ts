import {
  Component, input, InputSignal, OnInit,
} from '@angular/core'
import { NguDialogService } from 'angular-develop-universe/dialogs'

@Component({
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
  dialogData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined)

  constructor (
    private readonly dialogService: NguDialogService,
  ) {}

  onClose (): void {
    this.dialogService.hide()
  }

  ngOnInit() {
    console.log(this.dialogData())
  }
}
