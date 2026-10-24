import { Component } from '@angular/core'
import { NguPopoverDirective } from 'angular-develop-universe/dialogs'

@Component({
  selector: 'ngu-kitchensink-popover',
  imports: [NguPopoverDirective],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss'
})
export class PopoverDemoComponent {}
