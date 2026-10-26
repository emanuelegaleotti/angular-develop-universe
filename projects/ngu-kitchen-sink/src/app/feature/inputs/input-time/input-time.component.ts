import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTimeComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-time',
  templateUrl: './input-time.component.html',
  styleUrl: './input-time.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputTimeComponent, ControlStateComponent]
})
export class InputTimeDemoComponent {
  readonly form = new FormGroup({
    time: new FormControl('', [Validators.required])
  })
}
