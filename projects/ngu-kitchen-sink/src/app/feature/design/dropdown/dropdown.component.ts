import { Component } from '@angular/core'
import { DropdownComponent } from 'angular-develop-universe/components'

@Component({
  selector: 'ngu-kitchensink-dropdown',
  imports: [DropdownComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class KSDropdownComponent {
  lastAction = ''

  select(action: string): void {
    this.lastAction = action
  }
}
