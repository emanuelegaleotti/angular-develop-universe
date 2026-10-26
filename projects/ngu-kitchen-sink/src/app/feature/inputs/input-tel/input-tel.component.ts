import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTelComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-tel',
  templateUrl: './input-tel.component.html',
  styleUrl: './input-tel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputTelComponent, ControlStateComponent]
})
export class InputTelDemoComponent {
  readonly form = new FormGroup({
    tel: new FormControl('', [Validators.required])
  })
}
