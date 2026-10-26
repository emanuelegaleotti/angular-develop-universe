import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputNumberComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-number',
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputNumberComponent, ControlStateComponent]
})
export class InputNumberDemoComponent {
  readonly form = new FormGroup({
    number: new FormControl<number | null>(0, [Validators.required, Validators.min(0), Validators.max(15)])
  })
}
