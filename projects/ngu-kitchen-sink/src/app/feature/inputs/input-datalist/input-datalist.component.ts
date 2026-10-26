import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputDatalistComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-datalist',
  templateUrl: './input-datalist.component.html',
  styleUrl: './input-datalist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputDatalistComponent, ControlStateComponent]
})
export class InputDatalistDemoComponent {
  readonly options: string[] = ['Edge', 'Firefox', 'Chrome', 'Opera', 'Safari']

  readonly form = new FormGroup({
    datalist: new FormControl('', [Validators.required])
  })
}
