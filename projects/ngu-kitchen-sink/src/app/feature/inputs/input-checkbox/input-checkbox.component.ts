import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputCheckboxComponent } from 'angular-develop-universe/inputs'


@Component({
  selector: 'ngu-kitchensink-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  imports: [
    ReactiveFormsModule,
    InputCheckboxComponent
  ],
  styleUrl: './input-checkbox.component.scss'
})
export class InputCheckboxDemoComponent {
  test: FormGroup = new FormGroup<{ checkbox: AbstractControl<boolean | null> }>({
    checkbox: new FormControl(false, [Validators.required]),
  })
}
