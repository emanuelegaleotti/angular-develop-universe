import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputDatalistObjectComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-datalist-object',
  templateUrl: './input-datalist-object.component.html',
  imports: [
    ReactiveFormsModule,
    InputDatalistObjectComponent
  ],
  styleUrl: './input-datalist-object.component.scss'
})
export class InputDatalistObjectDemoComponent {
  test: FormGroup = new FormGroup<{ datalistObject: AbstractControl<number | null> }>({
    datalistObject: new FormControl(null, [Validators.required]),
  })

  datalist: { [key: string]: string | number }[] = [
    { id: 1, browser: 'Edge' },
    { id: 2, browser: 'Firefox' },
    { id: 3, browser: 'Chrome' },
    { id: 4, browser: 'Opera' },
    { id: 5, browser: 'Safari' }
  ]
}
