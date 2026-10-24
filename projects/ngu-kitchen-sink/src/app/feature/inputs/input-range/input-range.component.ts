import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputRangeComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-range',
  templateUrl: './input-range.component.html',
  styleUrl: './input-range.component.scss',

  imports: [
    ReactiveFormsModule,
    InputRangeComponent
  ]
})
export class InputRangeDemoComponent {
  test: FormGroup = new FormGroup<{ range: AbstractControl<number | null> }>({
    range: new FormControl(0, [Validators.required]),
  })
}
