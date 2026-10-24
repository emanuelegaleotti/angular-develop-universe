import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTimeComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-time',
  templateUrl: './input-time.component.html',
  styleUrl: './input-time.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    InputTimeComponent,
    ReactiveFormsModule
  ]
})
export class InputTimeDemoComponent {
  test: FormGroup = new FormGroup<{ time: AbstractControl<string | null> }>({
    time: new FormControl('', [Validators.required]),
  })
}
