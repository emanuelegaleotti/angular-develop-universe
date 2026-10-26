import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputWeekComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-week',
  templateUrl: './input-week.component.html',
  styleUrl: './input-week.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputWeekComponent, ControlStateComponent]
})
export class InputWeekDemoComponent {
  readonly form = new FormGroup({
    week: new FormControl('', [Validators.required])
  })
}
