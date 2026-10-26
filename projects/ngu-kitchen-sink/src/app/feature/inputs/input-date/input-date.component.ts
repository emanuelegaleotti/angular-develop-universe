import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputDateComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-date',
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputDateComponent, ControlStateComponent]
})
export class InputDateDemoComponent {
  readonly form = new FormGroup({
    date: new FormControl('', [Validators.required])
  })
}
