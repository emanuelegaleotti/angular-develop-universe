import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputHiddenComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-hidden',
  templateUrl: './input-hidden.component.html',
  styleUrl: './input-hidden.component.scss',
  imports: [
    ReactiveFormsModule,
    InputHiddenComponent
  ]
})
export class InputHiddenDemoComponent {
  test: FormGroup = new FormGroup<{ hidden: AbstractControl<string | null> }>({
    hidden: new FormControl('', [Validators.required]),
  })
}
