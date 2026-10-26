import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputCheckboxComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputCheckboxComponent, ControlStateComponent]
})
export class InputCheckboxDemoComponent {
  readonly form = new FormGroup({
    checkbox: new FormControl<boolean | null>(false, [Validators.requiredTrue])
  })
}
