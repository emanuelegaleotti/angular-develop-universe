import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputDatalistObjectComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-datalist-object',
  templateUrl: './input-datalist-object.component.html',
  styleUrl: './input-datalist-object.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputDatalistObjectComponent, ControlStateComponent]
})
export class InputDatalistObjectDemoComponent {
  readonly options: { [key: string]: string | number }[] = [
    { id: 1, browser: 'Edge' },
    { id: 2, browser: 'Firefox' },
    { id: 3, browser: 'Chrome' },
    { id: 4, browser: 'Opera' },
    { id: 5, browser: 'Safari' }
  ]

  readonly form = new FormGroup({
    datalistObject: new FormControl<number | null>(null, [Validators.required])
  })
}
