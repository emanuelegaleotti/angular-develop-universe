import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputEmailComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-email',
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputEmailComponent, ControlStateComponent]
})
export class InputEmailDemoComponent {
  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
}
