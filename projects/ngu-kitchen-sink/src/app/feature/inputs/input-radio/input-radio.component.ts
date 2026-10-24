import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputRadioComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',

  imports: [
    ReactiveFormsModule,
    InputRadioComponent
  ]
})
export class InputRadioDemoComponent {
  test: FormGroup = new FormGroup<{ radio: AbstractControl<string | null> }>({
    radio: new FormControl('value-0', [Validators.required]),
  })
  options: {[key:string]: string | number}[] = [
    {id: 1, color: 'white'},
    {id: 2, color: 'red'},
    {id: 3, color: 'black'},
    {id: 4, color: 'blue'}
  ]
}
