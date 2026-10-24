import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputNumberComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-number',
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    ReactiveFormsModule,
    InputNumberComponent
  ]
})
export class InputNumberDemoComponent {
  test: FormGroup = new FormGroup<{ number: AbstractControl<number | null> }>({
    number: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(15)]),
  })
}
