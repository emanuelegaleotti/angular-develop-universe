import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputDatalistComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-datalist',
  templateUrl: './input-datalist.component.html',
  styleUrl: './input-datalist.component.scss',
  imports: [
    ReactiveFormsModule,
    InputDatalistComponent
  ]
})
export class InputDatalistDemoComponent {
  test: FormGroup = new FormGroup<{ datalist: AbstractControl<string | null> }>({
    datalist: new FormControl('', [Validators.required]),
  })

  datalist:string[] = [
    'Edge', 'Firefox', 'Chrome', 'Opera', 'Safari'
  ]
}
