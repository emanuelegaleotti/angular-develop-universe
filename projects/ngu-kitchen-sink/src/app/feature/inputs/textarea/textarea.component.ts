import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TextareaComponent } from 'angular-develop-universe/inputs'


@Component({
  selector: 'ngu-kitchensink-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  imports: [
    ReactiveFormsModule,
    TextareaComponent
  ],
})
export class TextareaDemoComponent {
  test: FormGroup = new FormGroup<{ textarea: AbstractControl<string | null> }>({
    textarea: new FormControl('', [Validators.required]),
  })
}
