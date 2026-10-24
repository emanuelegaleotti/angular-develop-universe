import { Component, input, InputSignal, OnInit } from '@angular/core'
import { NguBottomSheetService } from 'angular-develop-universe/dialogs'

@Component({
  imports: [],
  templateUrl: './bottom-sheet-content.component.html',
  styleUrls: ['./bottom-sheet-content.component.scss']
})
export class BottomSheetContentComponent implements OnInit {
  dialogData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined)

  constructor (
    private readonly bottomSheetService: NguBottomSheetService
  ) {}

  ngOnInit (): void {
    console.log('Bottom Sheet data:', this.dialogData())
  }

  onClose (): void {
    this.bottomSheetService.hide()
  }

  onSelectItem (item: string): void {
    console.log('Item selezionato:', item)
    this.bottomSheetService.hide(item)
  }
}

