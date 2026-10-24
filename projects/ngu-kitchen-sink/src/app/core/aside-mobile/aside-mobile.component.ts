import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CoreModule } from '../core.module'

@Component({
  selector: 'ngu-kitchensink-aside-mobile',
  imports: [
    CoreModule
  ],
  templateUrl: './aside-mobile.component.html',
  styleUrl: './aside-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideMobileComponent {
  constructor (

  ) {}

  close(): void {

  }
}
