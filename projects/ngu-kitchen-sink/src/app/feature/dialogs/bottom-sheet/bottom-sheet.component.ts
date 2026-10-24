import { Component } from '@angular/core'
import { NguBottomSheetService } from 'angular-develop-universe/dialogs'
import { BottomSheetContentComponent } from '../bottom-sheet-content/bottom-sheet-content.component'

@Component({
  selector: 'ngu-kitchensink-bottom-sheet',
  imports: [],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetDemoComponent {
  constructor (
    public readonly bottomSheetService: NguBottomSheetService
  ) {}

  private readonly closeIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`

  openBottomSheet (): void {
    const bs = this.bottomSheetService.createBottomSheet(
      BottomSheetContentComponent,
      {
        id: 'test-bottom-sheet',
        closeIcon: this.closeIconSvg,
        bottomSheetTitle: 'Seleziona un\'opzione',
        dialogData: {
          items: ['Condividi', 'Salva', 'Modifica', 'Elimina']
        }
      }
    )
    bs.whenOpen.subscribe(() => console.log('bottom sheet: open'))
    bs.whenClosed.subscribe(() => console.log('bottom sheet: closed'))
    bs.show()
  }

  openCustomBottomSheet (): void {
    const bs = this.bottomSheetService.createBottomSheet(
      BottomSheetContentComponent,
      {
        id: 'custom-bottom-sheet',
        className: 'custom-dark-sheet',
        closeIcon: this.closeIconSvg,
        bottomSheetTitle: 'Impostazioni rapide',
        dialogData: {
          items: ['Modalità scura', 'Notifiche', 'Privacy', 'Accessibilità', 'Lingua']
        }
      }
    )
    bs.whenClosed.subscribe(() => console.log('custom bottom sheet: closed'))
    bs.show()
  }
}
