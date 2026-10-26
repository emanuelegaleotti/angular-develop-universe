import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SelectComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SelectComponent, ControlStateComponent]
})
export class SelectDemoComponent {
  readonly options: string[] = ['blue', 'black', 'red', 'white']

  readonly form = new FormGroup({
    select: new FormControl('', [Validators.required])
  })
}
