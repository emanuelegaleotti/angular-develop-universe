import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputMonthComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-month',
  templateUrl: './input-month.component.html',
  styleUrl: './input-month.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputMonthComponent, ControlStateComponent]
})
export class InputMonthDemoComponent {
  readonly form = new FormGroup({
    month: new FormControl('', [Validators.required])
  })
}
