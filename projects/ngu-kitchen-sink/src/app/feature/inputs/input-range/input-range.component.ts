import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputRangeComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-range',
  templateUrl: './input-range.component.html',
  styleUrl: './input-range.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputRangeComponent, ControlStateComponent]
})
export class InputRangeDemoComponent {
  readonly form = new FormGroup({
    range: new FormControl<number | null>(0, [Validators.required])
  })
}
