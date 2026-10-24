import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputColorComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-color',
  templateUrl: './input-color.component.html',
  imports: [
    ReactiveFormsModule,
    InputColorComponent
  ],
  styleUrl: './input-color.component.scss'
})
export class InputColorDemoComponent {
  test: FormGroup = new FormGroup<{ color: AbstractControl<string | null> }>({
    color: new FormControl('', [Validators.required]),
  })
}
