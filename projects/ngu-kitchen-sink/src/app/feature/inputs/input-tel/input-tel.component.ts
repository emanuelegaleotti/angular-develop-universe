import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTelComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-tel',
  templateUrl: './input-tel.component.html',
  styleUrl: './input-tel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    ReactiveFormsModule,
    InputTelComponent
  ]
})
export class InputTelDemoComponent {
  test: FormGroup = new FormGroup<{ tel: AbstractControl<string | null> }>({
    tel: new FormControl('', [Validators.required]),
  })
}
