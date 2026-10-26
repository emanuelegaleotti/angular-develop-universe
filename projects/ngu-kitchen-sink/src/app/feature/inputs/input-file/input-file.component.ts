import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputFileComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-file',
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputFileComponent, ControlStateComponent]
})
export class InputFileDemoComponent {
  readonly single = new FormGroup({
    file: new FormControl<unknown>(null, [Validators.required])
  })

  readonly multiple = new FormGroup({
    file: new FormControl<unknown>(null, [Validators.required])
  })
}
