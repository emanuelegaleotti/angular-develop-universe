import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputDatetimeLocalComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-datetime-local',
  templateUrl: './input-datetime-local.component.html',
  styleUrl: './input-datetime-local.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputDatetimeLocalComponent, ControlStateComponent]
})
export class InputDatetimeLocalDemoComponent {
  readonly form = new FormGroup({
    datetime: new FormControl('', [Validators.required])
  })
}
