import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputPasswordComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-password',
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputPasswordComponent, ControlStateComponent]
})
export class InputPasswordDemoComponent {
  readonly form = new FormGroup({
    password: new FormControl('', [Validators.required])
  })
}
