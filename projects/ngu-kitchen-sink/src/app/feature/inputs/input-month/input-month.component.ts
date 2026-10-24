import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMonthComponent } from 'angular-develop-universe/inputs';

@Component({
  selector: 'ngu-kitchensink-input-month',
  standalone: true,
  imports: [ReactiveFormsModule, InputMonthComponent],
  templateUrl: './input-month.component.html',
  styleUrl: './input-month.component.scss',
})
export class InputMonthDemoComponent {
  test: FormGroup = new FormGroup<{ month: AbstractControl<string | null> }>({
    month: new FormControl('', Validators.required),
  });
}
