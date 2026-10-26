import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputColorComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-color',
  templateUrl: './input-color.component.html',
  styleUrl: './input-color.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputColorComponent, ControlStateComponent]
})
export class InputColorDemoComponent {
  readonly form = new FormGroup({
    color: new FormControl('', [Validators.required])
  })
}
