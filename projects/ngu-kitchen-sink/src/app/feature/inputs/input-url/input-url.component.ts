import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputUrlComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-url',
  templateUrl: './input-url.component.html',
  styleUrl: './input-url.component.scss',

  imports: [
    ReactiveFormsModule,
    InputUrlComponent
  ]
})
export class InputUrlDemoComponent {
  test: FormGroup = new FormGroup<{ url: AbstractControl<string | null> }>({
    url: new FormControl('', [Validators.required, Validators.pattern('http://.*')]),
  })
}
