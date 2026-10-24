import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputPasswordComponent } from 'angular-develop-universe/inputs'


@Component({
  selector: 'ngu-kitchensink-input-password',
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    InputPasswordComponent
  ]
})
export class InputPasswordDemoComponent {
  test: FormGroup = new FormGroup<{ password: AbstractControl<string | null> }>({
    password: new FormControl('', [Validators.required]),
  })
}
