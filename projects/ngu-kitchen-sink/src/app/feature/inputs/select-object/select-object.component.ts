import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SelectObjectComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-select-object',
  templateUrl: './select-object.component.html',
  styleUrl: './select-object.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SelectObjectComponent, ControlStateComponent]
})
export class SelectObjectDemoComponent {
  readonly options: { [key: string]: string | number }[] = [
    { id: 1, color: 'white' },
    { id: 2, color: 'red' },
    { id: 3, color: 'black' },
    { id: 4, color: 'blue' }
  ]

  readonly form = new FormGroup({
    selectObject: new FormControl<number | null>(null, [Validators.required])
  })
}
