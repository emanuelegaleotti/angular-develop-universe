import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputEmailComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-email',
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    ReactiveFormsModule,
    InputEmailComponent
  ]
})
export class InputEmailDemoComponent {
  test: FormGroup = new FormGroup<{ email: AbstractControl<string | null> }>({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
}
