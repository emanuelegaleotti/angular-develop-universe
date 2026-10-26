import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputRadioComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputRadioComponent, ControlStateComponent]
})
export class InputRadioDemoComponent {
  readonly options: string[] = ['white', 'red', 'black', 'blue']

  readonly form = new FormGroup({
    radio: new FormControl<string | null>('white', [Validators.required])
  })
}
